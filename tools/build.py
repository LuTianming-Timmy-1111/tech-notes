"""从笔记 Markdown 生成速查网页的数据文件 docs/data.js。

用法（在仓库根目录）：python3 tools/build.py
兼容 Python 3.6。
"""
import json
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
NOTE_DIRS = ["linux", "git", "docker", "sql", "python", "windows"]
OUT_PATH = BASE_DIR / "docs" / "data.js"

# 和 README 里的分类顺序保持一致，网页按这个顺序分组
CATEGORIES = [
    "看文件", "磁盘空间", "查系统信息", "改文件内容", "写脚本",
    "定时任务", "服务和日志", "查进程和端口", "测网络连通", "远程登录和传文件",
    "Git 日常", "Git 分支和远程", "容器操作", "构建镜像", "Compose 编排",
    "SQL 查询", "SQL 改数据", "建表和约束", "SQLite",
    "Python 环境", "Python 写脚本", "爬网页", "Python 连数据库",
    "pandas 处理表格", "画图", "Windows 命令", "任务计划",
]

FIELDS = {"作用": "desc", "说法": "says", "分类": "cat", "项目": "proj", "坑": "pit"}
FIELD_RE = re.compile(r"^- (作用|说法|分类|项目|坑)：(.*)$")


def parse_file(path):
    entries = []
    current = None
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("### "):
            current = {"title": line[4:].strip(), "file": path.relative_to(BASE_DIR).as_posix()}
            entries.append(current)
            continue
        if line.startswith("#"):
            current = None
            continue
        m = FIELD_RE.match(line)
        if m and current is not None:
            current[FIELDS[m.group(1)]] = m.group(2).strip()
    for e in entries:
        e["says"] = [s.strip() for s in e.get("says", "").split("；") if s.strip()]
    return entries


def main():
    entries = []
    for d in NOTE_DIRS:
        for path in sorted((BASE_DIR / d).glob("*.md")):
            entries.extend(parse_file(path))

    problems = 0
    for e in entries:
        where = "{} | {}".format(e["file"], e["title"])
        for key, name in (("desc", "作用"), ("cat", "分类")):
            if not e.get(key):
                print("缺少" + name + "：", where)
                problems += 1
        if e.get("cat") and e["cat"] not in CATEGORIES:
            print("未知分类「{}」：{}".format(e["cat"], where))
            problems += 1
        if not e["says"]:
            print("缺少说法：", where)
            problems += 1

    data = "window.NOTES = {};\nwindow.CATEGORIES = {};\n".format(
        json.dumps(entries, ensure_ascii=False, indent=1),
        json.dumps(CATEGORIES, ensure_ascii=False),
    )
    OUT_PATH.write_text(data, encoding="utf-8")

    counts = {}
    for e in entries:
        counts[e.get("cat")] = counts.get(e.get("cat"), 0) + 1
    print("共 {} 条，写入 {}".format(len(entries), OUT_PATH.relative_to(BASE_DIR)))
    for c in CATEGORIES:
        print("  {:<14}{}".format(c, counts.get(c, 0)))
    if problems:
        print("有 {} 处问题，见上方".format(problems))
        sys.exit(1)


if __name__ == "__main__":
    main()
