# tech-notes

个人技术笔记：只收我在项目里**实际学过、用过**的命令和语法，配一个可搜索的速查网页。

## 规矩

- 只收用过的；只讲过、没动手的不收。盘点清单见 [00-inventory.md](00-inventory.md)
- 公开仓库：不写 IP、端口、密码、代理地址、密钥路径
- 简洁平实，需要对比时用表格

## 速查网页

`docs/index.html`：按“我要干什么”分类浏览，或者直接搜。搜索同时匹配命令、作用和说法，支持命令名拼错（`tial` 能找到 `tail`）和中文描述（“看最后几行”）。

push 到 main 后，GitHub Actions（`.github/workflows/pages.yml`）会自动运行 `tools/build.py` 生成 `docs/data.js` 并发布，不用手动 build。`data.js` 是生成出来的，不进 Git。

想在本地预览或检查笔记格式，也可以自己跑：

```bash
python3 tools/build.py
```

脚本会检查每条有没有作用、说法、分类，分类是否在下面的列表里；有问题会列出来并以退出码 1 结束，这时 Actions 也会失败，网页保持上一版。

## 目录

| 文件 | 内容 |
|---|---|
| `linux/01-view.md` | 看文件、找内容、磁盘空间、查系统信息 |
| `linux/02-edit.md` | 写文件、改文件（sed、vi） |
| `linux/03-script.md` | 脚本：重定向、管道、set -e、$?、alias |
| `linux/04-cron-log.md` | 定时任务、systemctl、journalctl、logrotate |
| `linux/05-remote.md` | ssh、scp、sshd 配置、ss、curl |
| `git/01-daily.md` | status、add、commit、log、diff、.gitignore |
| `git/02-branch-remote.md` | 分支、合并、远程、clone/pull |
| `docker/01-container.md` | run、exec、logs 等容器操作 |
| `docker/02-dockerfile.md` | Dockerfile、.dockerignore |
| `docker/03-compose.md` | Compose 字段和命令 |
| `sql/01-query.md` | 查询、JOIN、分组、NULL |
| `sql/02-advanced.md` | 子查询、窗口函数、CTE、UNION ALL、REGEXP、函数 |
| `sql/03-schema.md` | 约束、事务、索引、mysqldump、数据检查 |
| `sql/04-sqlite.md` | SQLite 专有 |
| `python/01-env.md` | venv、环境变量、异常、datetime、logging、pathlib |
| `python/02-scraping.md` | requests、BeautifulSoup、文本清洗 |
| `python/03-db.md` | pymysql、sqlite3、SQLAlchemy |
| `python/04-pandas.md` | pandas |
| `python/05-matplotlib.md` | matplotlib |
| `windows/01-powershell.md` | PowerShell、scp、任务计划程序 |
| `tools/build.py` | 从笔记生成 `docs/data.js` |
| `docs/` | 速查网页 |
| `.github/workflows/pages.yml` | 自动生成并发布速查网页 |

## 条目格式

```markdown
### `tail -n N 文件`

- 作用：看文件最后 N 行
- 说法：看最后几行；最新的日志；文件末尾
- 分类：看文件
- 项目：Steam：`tail -15 logs/collect.log` 看最近几次采集
- 坑：CentOS 7 同时看多个文件时，`tail -3` 报错，要写 `tail -n 3`
```

| 字段 | 说明 |
|---|---|
| 标题 | 命令或语法，放在反引号里 |
| 作用 | 一句话 |
| 说法 | 2–4 个平时会怎么描述这个需求，用 `；` 分隔，供速查搜索 |
| 分类 | 速查网页里“我要干什么”的分组，每条只填一个；新增分类要同时改 README 和 `tools/build.py` |
| 项目 | 在哪个项目里怎么用过 |
| 坑 | 踩过的坑，没有就不写这一行 |

## 分类

看文件、磁盘空间、查系统信息、改文件内容、写脚本、定时任务、服务和日志、查进程和端口、测网络连通、远程登录和传文件、Git 日常、Git 分支和远程、容器操作、构建镜像、Compose 编排、SQL 查询、SQL 改数据、建表和约束、SQLite、Python 环境、Python 写脚本、爬网页、Python 连数据库、pandas 处理表格、画图、Windows 命令、任务计划

## 项目

| 简称 | 项目 |
|---|---|
| 豆瓣 | [douban-project](https://github.com/LuTianming-Timmy-1111/douban-project)：豆瓣 Top250 爬虫、MySQL 规范化、推荐和分析 |
| Steam | [steam-tracker](https://github.com/LuTianming-Timmy-1111/steam-tracker)：Steam 在线人数每小时采集，SQLite，云服务器 cron |
| 练习 | SQL 练习库、Flask 小例子、my-templates 模板库 |
