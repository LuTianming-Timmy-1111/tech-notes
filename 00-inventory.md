# 学习内容盘点（第 1 步）

只收项目学习窗口里实际学过、用过的。不收的内容和原因见文末。

## 来源窗口

| 代号 | 窗口 | 主要内容 |
|---|---|---|
| W1 | 技术栈学习1（原名“文档内容概述”，是同一个对话） | SQL 体系、Docker/Compose、爬虫、拆表、Git 入门 |
| W2 | 技术栈学习2 | 豆瓣：SQL 分析 01–06、修错位 bug、`.env`、推 GitHub、分支 |
| W3 | 技术栈学习3 | 豆瓣：导演表、推荐 07、`schema.sql`、README；Steam 立项、买服务器 |
| W4 | 技术栈学习4 | Steam：SQLite、采集脚本、cron、部署、SSH 密钥、备份 |
| W5 | Steam在线人数追踪项目进度回顾 | Steam：关 22 端口、logrotate、任务计划、pandas/matplotlib；豆瓣：check.py、run_all.sh、分析图 |

项目简称：**豆瓣** = douban-project，**Steam** = steam-tracker，**练习** = 练习库 / Flask 小例子 / my-templates

---

## 1. Linux / bash

### 看文件、找内容

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `ls -l` / `-la` / `-lh` | 全程 | W1–W5 | `-a` 看隐藏文件；`-l` 看权限 |
| `cat`、`head`、`tail -n N` | 全程 | W1–W5 | CentOS 7 同时看多个文件时 `tail -3` 报错，要写 `tail -n 3` |
| `grep -n` / `-c` / `-A N` / `-B N` | Steam、豆瓣 | W3–W5 | `grep -c ERROR 日志` 数错误条数 |
| `grep -E "a\|b"`、基本正则里 `\|` | 豆瓣 | W3、W5 | 不加 `-E` 时“或”要写 `\|` |
| `grep -v "^#"`、`grep "^Port"` | Steam | W4、W5 | 去掉注释行 / 只看行首匹配 |
| `history` | 练习 | W1 | 回看装 Docker、MySQL 时敲过的命令 |
| `command -v`、`which`、`type` | Steam、豆瓣 | W1、W4、W5 | `type dev` 看别名展开成什么 |
| `du -sh 目录`、`df -h /` | 豆瓣、Steam | W5 | venv 有 249M，要进 `.dockerignore` |
| `date`、`hostname` | Steam | W4 | 虚拟机时钟曾快一天 |

### 写文件、改文件

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `cat > 文件 << 'EOF' ... EOF` | 全程 | W2–W5 | `'EOF'` 带引号，里面的 `$` 不展开 |
| `echo "..." >> 文件` | Steam、豆瓣 | W4、W5 | `>>` 追加，`>` 会清空原文件 |
| `touch`、`{01..10}` 花括号展开 | Steam | W4 | 造 10 个假备份测清理逻辑 |
| `mkdir -p`、`rm -r`、`mv`、`cp` | 全程 | W1–W5 | 先写临时文件再 `mv`，防止冲掉好文件 |
| `sed 's/旧/新/'`、`sed 's\|旧\|新\|'` | 豆瓣 | W3、W5 | 路径里有 `/` 时换 `\|` 当分隔符；`[` `]` 要转义 |
| `sed -i`、`'30,37d'`、`r 文件`、`i` 行前插入 | 豆瓣 | W5 | `-i` 直接改原文件 |
| vi：`i`、`Esc`、`:wq`、`:set paste`、`:%d`、`/搜索`、`cw`、`r` | 全程 | W1、W5 | 粘贴前先 `:set paste`，否则缩进乱掉；slim 容器里没有 vi |

### 脚本

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `#!/bin/bash`、`chmod +x`、`./脚本` | Steam、豆瓣 | W3–W5 | 不加执行权限，cron 调用报 Permission denied；Git 会记成 `100755` |
| `cd "$(dirname "$0")"` | Steam、豆瓣 | W4、W5 | 交互终端里直接粘贴时 `$0` 是 bash，不是脚本 |
| `$(命令)` 命令替换 | Steam | W4 | |
| `>`、`>>`、`2>&1` | 全程 | W2–W5 | stdout(1) 和 stderr(2) 两条通道，`>` 只管 1 |
| 管道 `\|` | 全程 | W1–W5 | 每段只干一件事 |
| `set -e`、`set -o pipefail` | 豆瓣 | W3、W5 | 出错即停；管道中间失败也算失败 |
| `set -a; source .env; set +a` | 豆瓣 | W2、W5 | 读入 `.env` 并自动导出给子进程 |
| `$?`、`echo $?` | 豆瓣 | W5 | 0 成功，非 0 失败 |
| `alias` + `~/.bashrc` + `source ~/.bashrc` | Steam、豆瓣 | W4、W5 | `dev` 别名；后来改成挂载当前目录 |
| 行尾 `\` 续行 | 全程 | W1、W3 | |

### 定时任务、服务、日志

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `crontab -e` / `crontab -l` | Steam | W4 | |
| cron 格式 `5,35 * * * *`、`20 4 * * *` | Steam | W4 | cron 三坑：没激活 venv、当前目录不对、输出没地方去 |
| `systemctl daemon-reload` / `restart docker` | 练习 | W1 | 改 Docker 代理、镜像源后要重启 |
| `systemctl restart ssh.socket` | Steam | W3、W5 | Ubuntu 24.04 改 SSH 端口要重启 socket |
| `systemctl list-timers logrotate.timer` | Steam | W5 | |
| `journalctl` 查 CRON 调用记录 | Steam | W4 | 日志是脚本说“我跑了”，journalctl 是系统说“我调用了” |
| logrotate 配置：`monthly`、`rotate 12`、`compress`、`missingok`、`notifempty` | Steam | W5 | 路径要写绝对路径 |
| `logrotate -d`、`/var/lib/logrotate/status` | Steam | W5 | `-d` 只演习不执行，也不写记录 |
| `apt upgrade` + `reboot` | Steam | W4 | 重启后验证 cron 自启 |

### 远程、网络

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `ssh -p 端口 用户@主机`、`ssh ... hostname` | Steam | W3–W5 | 末尾带命令 = 登录、执行、退出 |
| `ssh-keygen -t ed25519 -C "注释"` | Steam | W4 | `.pub` 是公钥，没 `.pub` 的是私钥 |
| sshd_config：`Port`、`PasswordAuthentication no`、`PermitRootLogin prohibit-password` | Steam | W3–W5 | 🔴 新方式验证通过前，旧连接不要关 |
| `ssh -o PubkeyAuthentication=no` | Steam | W4 | 模拟只有密码的人来登录 |
| `scp -P` / `-p` / `-q` / `-o BatchMode=yes` | Steam | W4、W5 | 端口是大写 `-P`；`-p` 保留时间；BatchMode 要密码时直接失败 |
| `ss -tlnp \| grep ssh` | Steam | W3、W5 | 看在监听哪些端口 |
| `curl -x 代理 -I`、`curl -sS -m 10` | 练习、Steam | W1、W3 | |
| Connection refused vs timed out | Steam | W5 | refused = 到了没人听；timed out = 被防火墙挡了 |
| 云防火墙 vs sshd 两层 | Steam | W5 | 关端口：先改 sshd、验证新端口能连，再删防火墙规则 |

---

## 2. Git

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `git config --global user.name/email` | 练习 | W1 | `--global` 对整台机器生效 |
| `init`、`status`、`add`、`commit -m` | 全程 | W1–W5 | add 之后、commit 之前再看一眼 status |
| `log --oneline`（`\| head -15`） | 全程 | W1–W5 | |
| `diff`，读 `@@ -51,8 +51,9 @@`、`-`/`+` 行 | Steam、豆瓣 | W2、W5 | 改一行 = 删旧行 + 加新行 |
| `remote add` / `remote set-url`、`push -u origin master`、`push` | 全程 | W1、W2 | 改 GitHub 用户名后要 `set-url`；用 token 推送 |
| `clone`、`pull` | Steam | W4、W5 | 服务器只 pull，不改代码 |
| `checkout -b 分支`、`checkout master`、`merge`、`branch -d` | 豆瓣 | W2、W3、W5 | master 没动过时合并是 Fast-forward |
| `.gitignore` | 全程 | W2–W5 | 代码进 Git，数据、日志、venv、`.env`、输出图、字体不进 |
| 文件模式 `100644` / `100755` | Steam、豆瓣 | W3、W4 | Git 会记住执行权限 |
| 在容器里敲 git | Steam | W4 | `command not found`，要先 `exit` |

---

## 3. Docker

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| 镜像 / 容器 / 仓库，`hello-world` | 练习 | W1 | |
| `docker pull`、`ps`、`stop`、`rm` | 练习、豆瓣 | W1、W2 | |
| `docker run -d --name -p 宿主:容器 -e -v 宿主:容器` | 练习 | W1 | 宿主机端口被占时映射到别的端口 |
| `docker run -it --rm -v -w -e` | Steam、豆瓣 | W4、W5 | 开发容器 `python:3.12-slim` + venv |
| `docker exec -it 容器 bash` | 练习 | W1 | 容器里是 Oracle Linux，不是 Debian |
| `docker exec ... sh -c '...'`、`docker exec -i ... < 文件` | 豆瓣 | W3 | 单引号让变量在容器里展开 |
| `docker logs ... 2>&1 \| grep` | 豆瓣 | W2 | |
| `docker info \| grep -i proxy`、daemon.json 镜像源、systemd 代理配置 | 练习 | W1 | 改完 `daemon-reload` + `restart docker` |
| Dockerfile：`FROM`、`WORKDIR`、`COPY`、`RUN`、`CMD` 等 | 练习、豆瓣 | W1 | RUN 是构建时，CMD 是启动时；先 COPY requirements 再 COPY 代码，利用缓存 |
| 镜像分层 | 练习 | W1 | |
| Compose：`build: .`、`ports`、`environment`、`volumes`（命名卷）、`command:` | 豆瓣 | W1、W2 | `iamge` 拼错、CMD 写错文件名 |
| `depends_on` | 豆瓣 | W1、W2 | 只保证先启动，不保证 MySQL 就绪 → 代码里加重试 |
| `restart: unless-stopped` | 豆瓣 | W2 | 只给 db 加，spider 不加（否则反复重爬） |
| 服务名通信：容器里连 `db`，宿主机连 `localhost:映射端口` | 豆瓣 | W1、W2 | |
| `${变量}` + 同目录 `.env` | 豆瓣 | W2 | Compose 自动读 `.env` |
| `docker-compose config` / `up -d` / `up -d db` / `ps` / `build` / `run --rm 服务` | 豆瓣 | W1、W2、W5 | `up` 和 `run` 的退出码行为不同 |
| `.dockerignore`（构建上下文） | 豆瓣 | W2、W5 | 决定哪些文件不发给 Docker |
| 容器访问宿主机的数据库（docker0 网关地址） | 豆瓣 | W5 | 容器里的 `localhost` 是容器自己 |
| slim 镜像没有 vi、git | Steam、豆瓣 | W4、W5 | 宿主机上改，挂载目录容器里立刻可见 |

---

## 4. SQL（MySQL / SQLite）

### 基础与查询

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| DDL、增删改、逻辑执行顺序 | 练习 | W1 | |
| WHERE 各种条件、ORDER BY / LIMIT / DISTINCT、`BETWEEN` | 练习、豆瓣 | W1、W5 | `BETWEEN` 两端都包含 |
| NULL 三条规则 | 练习、豆瓣 | W1、W5 | 和 NULL 比较结果是 NULL，WHERE 当成不满足；空串和 NULL 不一样 |
| 聚合、GROUP BY / HAVING | 练习、豆瓣 | W1、W2、W5 | WHERE 在分组前，HAVING 在分组后 |
| INNER / LEFT JOIN，`LEFT JOIN + IS NULL` 找“没有的” | 练习、豆瓣、Steam | W1–W5 | 多对多 JOIN 后行数会变多（701 ≠ 250） |
| 子查询：标量 / IN / EXISTS | 练习 | W1 | |
| 窗口函数：`OVER`、`PARTITION BY`、`ROW_NUMBER`/`RANK`/`DENSE_RANK` | 练习、豆瓣 | W1、W2 | 每组前 N：子查询算名次，外层再筛（WHERE 里不能直接用窗口结果） |
| CTE（单个、多个串联） | 练习、豆瓣 | W1、W2 | 06 推荐用 CTE 做 IDF 加权 |
| `UNION ALL` | 豆瓣 | W5 | 造几行假数据验证检查条件；`UNION` 去重 |
| `REGEXP '^[0-9]{4}$'` | 豆瓣 | W2、W5 | 不加 `^` `$` 只要求“包含” |
| 函数：`CONCAT`、`CHAR_LENGTH`/`LENGTH`、`SUBSTRING`、`REPLACE`、`TRIM`、日期函数、`CASE WHEN`、`HEX()` | 练习、豆瓣 | W1、W2、W5 | `LENGTH` 数字节，汉字 3 字节；`HEX()` 认出“一”和破折号 |
| `ROUND` 别放在排序前 | 豆瓣 | W3 | |
| 索引：`CREATE/SHOW/DROP INDEX`、`EXPLAIN` 看 type/key/rows/key_len | 练习 | W1 | |
| 事务：`START TRANSACTION`、`COMMIT`、`ROLLBACK`、自动提交 | 练习 | W1 | 隔离级别只讲过概念，不收 |

### 约束与结构

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| PK / FK / NOT NULL / UNIQUE / DEFAULT / CHECK | 练习、豆瓣 | W1、W3 | 导演表 `CHECK (name_cn IS NOT NULL OR name_en IS NOT NULL)` |
| 联合主键（中间表、Steam 的 game_id + 小时） | 豆瓣、Steam | W1、W3 | |
| 1NF、多对多、中间表 | 豆瓣 | W1 | |
| 外键删除顺序：先删子表 | 豆瓣 | W5 | |
| `DELETE` vs `TRUNCATE` | 豆瓣 | W5 | DELETE 不重置自增编号 |
| 断言式检查：查出行就是有问题，计数用 `HAVING` | 豆瓣 | W5 | 约束管“对不对”，管不了“有没有” |
| `mysqldump --no-data --skip-add-drop-table --skip-dump-date --ignore-table` | 豆瓣 | W3 | 导出带 AUTO_INCREMENT=，用 sed 去掉 |
| `FOREIGN_KEY_CHECKS=0`、`/*!40014 ... */` | 豆瓣 | W3 | |

### SQLite 专有

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| 文件即库，不用 `CREATE DATABASE` | Steam | W4 | |
| `sqlite_master` | Steam | W4 | 相当于 `SHOW TABLES` |
| `INSERT OR IGNORE` | Steam | W4 | 吞掉所有约束错误（包括 NOT NULL），插完要数一下 |
| `datetime(collected_at, '+8 hours')` | Steam | W4 | 时间存 UTC，看时转北京时间 |
| Navicat 用 SQLite 连接打开备份文件 | Steam | W4 | |

---

## 5. Python

### 通用

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `python3 -m venv venv`、`venv/bin/pip install -r requirements.txt` | Steam、豆瓣 | W4、W5 | requirements 只写直接依赖 |
| `venv/bin/python` 不激活 vs `source venv/bin/activate` | Steam | W4 | 激活就是改 PATH；给 cron 用写路径 |
| `os.environ['X']` vs `os.environ.get('X', 默认)` | 豆瓣 | W2、W5 | 前者没有就报错，适合密码 |
| `if __name__ == "__main__":`、`sys.exit(码)` | Steam、豆瓣 | W4、W5 | |
| `for ... else` 重试 | 豆瓣 | W2 | |
| f-string 日期格式 `f"{datetime.now():%Y%m%d}"` | Steam | W4 | |

### 爬虫

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `requests.get` + User-Agent、`time.sleep` 限速、翻页 | 豆瓣 | W1 | |
| requests 调 Steam 接口、解析 JSON、失败重试 | Steam | W4 | 接口有约 10 分钟缓存 |
| BeautifulSoup：`find`、`find_all`、`class_=` | 豆瓣 | W1 | Python 3.6 要用 bs4 4.11.2 |
| `repr()` 看脏文本、`\xa0`、按 `/` 切分 | 豆瓣 | W1 | |
| 负下标 `parts[-2]`、`parts[-1]` | 豆瓣 | W2 | 多个年份导致按位置取错位 |
| `str.replace('...', '')` 而不是 `rstrip('.')` | 豆瓣 | W2 | rstrip 会误删名字末尾真正的句点 |
| pip `--trusted-host` | 豆瓣 | W1 | |

### 数据库与文件

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| pymysql：connect（`charset='utf8mb4'`）→ cursor → execute → commit → fetchall → close | 豆瓣 | W1、W2、W5 | MySQL 8 认证要装 cryptography |
| get-or-create 迁移 | 豆瓣 | W1 | |
| sqlite3：`connect`、`execute`、`executescript`、`backup` | Steam | W4 | 不能直接 cp 正在写的库，用 `backup` |
| logging：`basicConfig(level, format)`、`info`、`error` | Steam | W4 | |
| pathlib：`Path(__file__).resolve().parent`、`/` 拼路径、`mkdir(exist_ok=True)`、`glob`、`unlink`、`stat().st_size`、`read_text` | Steam、豆瓣 | W4、W5 | 相对路径在 cron 下会找不到 |
| SQLAlchemy：`create_engine("mysql+pymysql://...?charset=utf8mb4")` | 豆瓣 | W5 | 直接传 pymysql 连接给 pandas 会有 UserWarning |

### pandas

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `pd.read_sql(sql, 连接)`、`head`、`dtypes` | Steam、豆瓣 | W5 | decimal 读进来自动转 float |
| `to_datetime(utc=True)`、`.dt.tz_convert("Asia/Shanghai")` | Steam | W5 | |
| `groupby().transform("mean")` 按各自均值归一化 | Steam | W5 | |
| `pivot` / `pivot_table`、`reindex` | Steam | W5 | sharex 截断横轴，用 reindex 补齐 |
| 只保留完整的天（每游戏每天 24 行）再算日均 | Steam | W5 | 首尾两天不完整 |
| `drop_duplicates`、`sort_values`、`unique`、`nunique` | Steam、豆瓣 | W5 | |
| `astype(int)`、`// 10 * 10` 取年代、`value_counts().sort_index()` | 豆瓣 | W5 | 能直接 astype 靠的是 check.py 保证年份格式 |

### matplotlib

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| `plt.subplots(2, 2, sharex=True)`、`axes.flat` | Steam | W5 | |
| `axis("off")`、`tick_params(labelbottom=True, which="both")` | Steam | W5 | 隐藏空子图后，上方子图要自己显示刻度 |
| 中文字体：`font_manager.addfont` + `rcParams["font.family"]` | Steam、豆瓣 | W5 | 字体文件不进 Git |
| y=1 参考线的折线图 | Steam | W5 | 04 平行趋势图 |
| `plot(kind="bar")`、`ax.bar_label(ax.containers[0])`、`set_xticklabels(..., rotation=0)` | 豆瓣 | W5 | |
| `savefig` 到 `analysis/output/` | Steam、豆瓣 | W5 | 输出图不进 Git |

---

## 6. Windows

| 内容 | 项目 | 窗口 | 坑 / 备注 |
|---|---|---|---|
| PowerShell 里的 `ssh`、`scp` | Steam | W4、W5 | 32 位 PowerShell (x86) 找不到 scp |
| `$LASTEXITCODE` | Steam | W5 | 0 成功；1 scp 自身失败；255 连接/登录失败 |
| `Get-Date -Format`、`Add-Content`、`type`、`dir`、`notepad` | Steam | W5 | `Add-Content` ≈ `>>`，`type` ≈ `cat` |
| `powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File 脚本` | Steam | W5 | 只对这次放行，不改系统设置 |
| 任务计划程序 `taskschd.msc`：创建任务（不是基本任务）、只在用户登录时运行、每天触发、错过后补跑、超时停止 | Steam | W5 | 以用户身份运行才能找到私钥 |
| `netsh advfirewall set allprofiles state off/on` | 练习 | W1 | 虚拟机连不上宿主机代理时排查用 |
| `curl.exe -x` 在 Windows 本机测代理 | 练习 | W1 | |

---

## 已确认：不收的内容

| 内容 | 原因 |
|---|---|
| 事务隔离级别、并发问题 | 只讲过概念，实验没做（`START/COMMIT/ROLLBACK` 已收） |
| 视图、`INTERSECT`/`EXCEPT`、`LAG`/`LEAD`、累计 `SUM() OVER` | 只看过概览 |
| 复合索引、最左前缀 | 讲过，实验没做 |
| GitHub Deploy Key、`ssh -T` | 没找到做完的记录 |
| `ssh -D` 隧道 | 后来改走 Clash，没用上 |
| `firewall-cmd` | 只在“Docker 基础学习”窗口出现，不在项目学习窗口里 |
| `core.autocrlf`、`copytruncate`、`zgrep` | 只提过一句 |
| `tail -f` | 没找到用过的记录 |
| 双重差分 | 概念，不是命令/语法 |

## 待补

| 内容 | 什么时候补 |
|---|---|
| 豆瓣分析图 ②：`groupby().agg(...)` 等 | 写完之后 |
