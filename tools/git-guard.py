#!/usr/bin/env python3
"""提交前检查：同一个脚本，按被调用时的名字决定做什么。

  .git/hooks/pre-commit  -> 检查暂存区：IP、密码/token、私钥、大文件、venv/、.db、.env
  .git/hooks/commit-msg  -> 检查提交信息：不能为空、不能太短、不能只写 update 这类词

确实需要时：
  - 某一行是故意的：在这一行加上 git-guard: allow（只放行这一行）
  - 这次全部跳过：git commit --no-verify
兼容 Python 3.6、git 1.8。
"""
import os
import re
import subprocess
import sys

MAX_MB = 5
ALLOW_MARK = "git-guard: allow"

IP_RE = re.compile(r"(?<![\d.])((?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d))(?![\d.])")
IP_OK = re.compile(r"^(127\.|0\.0\.0\.0$|255\.255\.255\.)")
KEY_RE = re.compile(r"-----BEGIN ([A-Z]+ )*PRIVATE KEY-----")
GH_TOKEN_RE = re.compile(r"\b(gh[pousr]_[A-Za-z0-9]{30,}|github_pat_\w{20,})")
SECRET_RE = re.compile(
    r"""(?i)([\w.-]*(?:password|passwd|secret|token|api_?key)\w*)\s*["']?\s*[:=]\s*(["']?)([^\s"'`,;)]*)""")
SAFE_PREFIX = ("$", "os.environ", "os.getenv", "getenv", "<", "{", "%", "...", "…", "*", "secrets.")
PLACEHOLDER = re.compile(r"(?i)your|example|change_?me|xxx|placeholder|密码")

VAGUE = {"update", "updates", "updated", "fix", "fixed", "fixes", "wip", "test", "tmp", "temp", "commit",
         "change", "changes", "modify", "misc", "edit", "save", "修改", "更新", "提交", "改动", "改了",
         "测试", "修复", "调整", "完善", "优化", "保存"}

RED, YEL, DIM, END = ("\033[31m", "\033[33m", "\033[2m", "\033[0m") if sys.stderr.isatty() else ("",) * 4


def git(*args):
    p = subprocess.run(("git", "-c", "core.quotepath=off") + args,
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return p.returncode, p.stdout.decode("utf-8", "replace")


def mask(text, keep=2):
    return text[:keep] + "*" * min(len(text) - keep, 6) if len(text) > keep else "***"


def check_line(path, line):
    """返回 [(原因, 打码后的片段)]"""
    hits = []
    for m in IP_RE.finditer(line):
        ip = m.group(1)
        if not IP_OK.match(ip):
            a, b = ip.split(".")[:2]
            hits.append(("IP 地址", "{}.{}.*.*".format(a, b)))
    if KEY_RE.search(line):
        hits.append(("私钥开头", "-----BEGIN ... PRIVATE KEY-----"))
    for m in GH_TOKEN_RE.finditer(line):
        hits.append(("GitHub token", mask(m.group(1), 6)))
    code_file = path.endswith((".py", ".js", ".html"))
    for m in ([] if hits and hits[-1][0] == "GitHub token" else SECRET_RE.finditer(line)):
        name, quote, value = m.groups()
        if not value or value.startswith(SAFE_PREFIX) or PLACEHOLDER.search(value):
            continue
        if code_file and not quote:   # 代码里没加引号的值是变量，不是明文
            continue
        hits.append(("疑似明文密码/token", "{}={}".format(name, mask(value))))
    return hits


def pre_commit():
    problems = []
    against = "HEAD" if git("rev-parse", "--verify", "HEAD")[0] == 0 else "4b825dc642cb6eb9a060e54bf8d69288fbee4904"

    _, names = git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z", against)
    for path in [n for n in names.split("\0") if n]:
        base = path.rsplit("/", 1)[-1]
        if re.search(r"(^|/)\.?venv/", path):
            problems.append((path, None, "虚拟环境目录", "venv/ 应该在 .gitignore 里，不进 Git"))
        elif re.search(r"\.(db|sqlite3?)$", path):
            problems.append((path, None, "数据库文件", "数据不进 Git，加进 .gitignore"))
        elif base == ".env":
            problems.append((path, None, ".env 文件", "里面是真实密码，只提交 .env.example"))
        code, size = git("cat-file", "-s", ":" + path)
        if code == 0 and int(size.strip() or 0) > MAX_MB * 1024 * 1024:
            problems.append((path, None, "大文件", "{:.1f} MB，超过 {} MB".format(int(size) / 1048576, MAX_MB)))

    _, diff = git("diff", "--cached", "-U0", "--no-color", "--diff-filter=ACMR", against)
    path, lineno = None, 0
    for line in diff.split("\n"):
        if line.startswith("+++ "):
            path = line[6:] if line.startswith("+++ b/") else None
        elif line.startswith("@@"):
            m = re.search(r"\+(\d+)", line)
            lineno = int(m.group(1)) if m else 0
        elif line.startswith("+") and path:
            text = line[1:]
            if ALLOW_MARK not in text:
                for reason, shown in check_line(path, text):
                    problems.append((path, lineno, reason, shown))
            lineno += 1

    if not problems:
        return 0
    err = sys.stderr
    err.write("\n{}提交被拦下了：{} 处问题{}\n\n".format(RED, len(problems), END))
    for path, lineno, reason, detail in problems:
        where = path if lineno is None else "{}:{}".format(path, lineno)
        err.write("  {}[{}]{} {}\n      {}{}{}\n".format(YEL, reason, END, where, DIM, detail, END))
    err.write("\n确实没问题的话：\n"
              "  只放行某一行：在那一行加上注释 {}\n"
              "  这次全部跳过：git commit --no-verify\n\n".format(ALLOW_MARK))
    return 1


def commit_msg(msg_file):
    with open(msg_file, encoding="utf-8", errors="replace") as f:
        lines = [l for l in f.read().split("\n") if not l.startswith("#")]
    msg = "\n".join(lines).strip()
    first = msg.split("\n")[0].strip()
    core = re.sub(r"[\s\W_]+", "", first.lower())
    reason = None
    if not msg:
        reason = "提交信息是空的"
    elif len(core) <= 2:
        reason = "提交信息只有“{}”，太短了".format(first)
    elif core in VAGUE:
        reason = "“{}”说不清这次改了什么".format(first)
    if not reason:
        return 0
    sys.stderr.write("\n{}{}{}\n写清楚这次做了什么，比如：“collect.py 加请求失败重试”“README 补运行步骤”。\n"
                     "确实需要跳过：git commit --no-verify\n\n".format(RED, reason, END))
    return 1


if __name__ == "__main__":
    hook = os.path.basename(sys.argv[0])
    if hook == "commit-msg":
        sys.exit(commit_msg(sys.argv[1]))
    sys.exit(pre_commit())
