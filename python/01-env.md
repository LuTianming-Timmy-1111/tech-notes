# Python 环境和脚本基础

| | 激活 venv | 直接写路径 |
|---|---|---|
| 写法 | `source venv/bin/activate` 后敲 `python` | `venv/bin/python 脚本.py` |
| 原理 | 改了 `PATH`，`python` 先找到 venv 里的 | 明确指定用哪个 |
| 适合 | 人手动用 | cron、脚本 |

| | `os.environ['X']` | `os.environ.get('X', 默认)` |
|---|---|---|
| 没有这个变量时 | 报错 | 用默认值 |
| 适合 | 密码这种必须有的 | 地址这种“一般就是它”的 |

---

## 环境

### `python3 -m venv venv`

- 作用：在项目目录里建一个独立的 Python 环境，装的包只在这里
- 说法：建虚拟环境；隔离依赖；venv
- 分类：Python 环境
- 项目：Steam：开发容器和服务器上各建一个；豆瓣：分析用的 venv 建在开发容器里
- 坑：`venv/` 要进 `.gitignore` 和 `.dockerignore`；Ubuntu 上建 venv 可能要先装系统的 venv 包

### `venv/bin/pip install -r requirements.txt`

- 作用：按依赖清单装包
- 说法：装依赖；按清单安装；pip 安装
- 分类：Python 环境
- 项目：Steam：`requirements.txt` 采集用，`requirements-analysis.txt` 分析用（pandas、matplotlib，只在本地）
- 坑：清单里只写**直接用到**的包和版本，依赖的依赖 pip 会自己带上

### `source venv/bin/activate` vs `venv/bin/python`

- 作用：两种用 venv 的方式，效果一样
- 说法：激活虚拟环境；用 venv 里的 python；cron 里怎么用 venv
- 分类：Python 环境
- 项目：Steam：`run_collect.sh` 里直接写 `venv/bin/python collect.py`
- 坑：没激活就 `python`，用的是系统或镜像自带的那个，报 `ModuleNotFoundError`

### `venv/bin/python -c "代码"`

- 作用：不写文件，直接跑一行 Python
- 说法：跑一行代码；快速测试；看包的版本
- 分类：Python 环境
- 项目：Steam：`venv/bin/python -c "import requests; print(requests.__version__)"`；用一行 sqlite3 查每小时写了几条

### 宿主机 Python 版本太老

- 作用：CentOS 7 自带 Python 3.6，新版 pandas、requests 装不上，换用 `python:3.12-slim` 容器
- 说法：Python 版本不够；装不上新包；f-string 能不能用
- 分类：Python 环境
- 项目：豆瓣的爬虫、拆表、检查用 3.6，bs4 降到 4.11.2；Steam 和豆瓣分析图在 3.12 容器里

---

## 脚本基础

### `if __name__ == "__main__":`

- 作用：直接运行这个文件时才执行下面的代码，被 `import` 时不执行
- 说法：程序入口；主函数；被导入时不运行
- 分类：Python 写脚本
- 项目：Steam、豆瓣：所有脚本都是 `main()` 放在这里，`logging.basicConfig` 也放在这里

### `os.environ['X']` / `os.environ.get('X', 默认)`

- 作用：读环境变量
- 说法：读环境变量；密码不写在代码里；读配置
- 分类：Python 写脚本
- 项目：豆瓣：`os.environ['MYSQL_ROOT_PASSWORD']` 读密码；`os.environ.get("DB_HOST", 默认地址)` 读数据库地址
- 坑：密码从所有源文件里移到 `.env`，代码只读环境变量

### `sys.exit(退出码)`

- 作用：结束程序并返回退出码，0 成功，非 0 失败
- 说法：返回退出码；让 shell 知道失败了
- 分类：Python 写脚本
- 项目：豆瓣：`check.py` 全部通过退出 0，有一项不过退出 1，`run_all.sh` 的 `set -e` 才能接住

### `try` / `except 异常类型 as e` / `raise`

- 作用：捕获指定类型的异常；`raise` 原样再抛出去
- 说法：出错不崩；捕获异常；跳过失败的
- 分类：Python 写脚本
- 项目：Steam：一款游戏请求失败，记一条 ERROR 然后 `continue`，不拖垮其他游戏；重试到最后一次仍失败就 `raise`
- 坑：日志里记 `type(e).__name__`（比如 `ConnectTimeout`），比整段错误信息短，一眼能看出是哪类问题

### `for ... else`

- 作用：循环没有被 `break` 打断、正常走完时，才执行 `else`
- 说法：重试几次都失败；循环没找到
- 分类：Python 写脚本
- 项目：豆瓣：爬虫连数据库重试，成功就 `break`，全部失败走 `else` 报错退出（Compose 的 `depends_on` 不保证 MySQL 已就绪）

### `for name, sql in CHECKS`

- 作用：列表里每一项是元组，循环时直接拆成几个变量
- 说法：遍历元组列表；一次取两个值
- 分类：Python 写脚本
- 项目：豆瓣：`check.py` 的检查清单是 `(名字, SQL)` 的列表，加检查只往列表里加一项

### `datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)`

- 作用：取当前 UTC 时间，并取整到小时
- 说法：当前 UTC 时间；取整到整点；时间截断
- 分类：Python 写脚本
- 项目：Steam：`collected_at`，同一小时重跑也是同一个值，配合联合主键防重复
- 坑：一批采集只取一次时间，不要每款游戏各取一次

### `f"{datetime.now():%Y%m%d}"`

- 作用：在 f-string 里按格式输出日期，和 `strftime` 写法一样
- 说法：文件名带日期；格式化日期
- 分类：Python 写脚本
- 项目：Steam：备份文件名 `steam-20261018.db`

---

## logging

### `logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")`

- 作用：设置日志级别和格式，每行自动带时间和级别
- 说法：打日志；日志带时间；代替 print
- 分类：Python 写脚本
- 项目：Steam：`collect.py`、`backup.py`
- 坑：cron 后台跑没人看屏幕，`print` 没时间、没级别，换成 logging 再配合 `>> 日志 2>&1`

### `logging.info` / `warning` / `error`

- 作用：按级别记日志
- 说法：记录信息；记警告；记错误
- 分类：Python 写脚本
- 项目：Steam：重试记 WARNING，最终失败记 ERROR，`grep -c ERROR` 就能数出问题

---

## pathlib

### `Path(__file__).resolve().parent`

- 作用：脚本自己所在的目录，以它为基准拼路径
- 说法：脚本所在目录；不受当前目录影响；cron 找不到文件
- 分类：Python 写脚本
- 项目：Steam：`BASE_DIR`；分析脚本在 `analysis/` 里，要 `.parent.parent` 回到项目根目录
- 坑：`Path("data/steam.db")` 这种相对路径相对的是“在哪运行”，cron 的当前目录不一样就找不到

### `BASE_DIR / "data" / "steam.db"`

- 作用：用 `/` 拼路径
- 说法：拼路径；路径拼接
- 分类：Python 写脚本
- 项目：Steam、豆瓣

### `mkdir(exist_ok=True)` / `glob` / `unlink` / `stat().st_size` / `read_text`

- 作用：建目录（已存在不报错）、按通配符找文件、删除文件、看大小、读出文本
- 说法：建文件夹；找出所有备份；删文件；文件多大；读文件内容
- 分类：Python 写脚本
- 项目：Steam：`sorted(BACKUP_DIR.glob("steam-*.db"))` 排序后 `[:-7]` 是要删的旧备份，`[-1]` 是最新的一份
- 坑：文件名里日期是 `YYYYMMDD`，按字符串排序就等于按时间排序
