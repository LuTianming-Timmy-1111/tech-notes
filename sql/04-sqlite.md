# SQLite

| | MySQL | SQLite |
|---|---|---|
| 形式 | 服务，要主机、端口、用户、密码 | 一个文件就是一个库 |
| Python 驱动 | 要装 pymysql | 自带 `sqlite3` |
| 建库 | `CREATE DATABASE` | 连接时文件不存在就自动新建 |
| 适合 | 多人、多程序同时写 | 数据量小、单个程序写 |

Steam 选 SQLite 的原因：数据量小、只有采集脚本一个写入者、服务器只有 2GB 内存。

---

### 文件即库

- 作用：`sqlite3.connect("data/steam.db")`，文件不存在就新建，不用 `CREATE DATABASE`
- 说法：SQLite 建库；数据库就是一个文件
- 分类：SQLite
- 项目：Steam
- 坑：数据库文件是数据，进 `.gitignore`

### `sqlite_master`

- 作用：SQLite 自己的目录表，记录库里有哪些表
- 说法：看有哪些表；SQLite 的 SHOW TABLES
- 分类：SQLite
- 项目：Steam：`SELECT name FROM sqlite_master WHERE type = 'table'` 确认建表成功

### `INSERT OR IGNORE`

- 作用：插入时违反约束就跳过，不报错
- 说法：重复就跳过；已存在就不插；幂等插入
- 分类：SQLite
- 项目：Steam：`init_db.py` 重复运行不会重复录入游戏；`:35` 补跑时 `:05` 已经写过的跳过，写入 0 条
- 坑：它吞掉的是**所有**约束错误，不只是重复：用子查询查分组 id 时名字写错，返回 NULL 违反 `NOT NULL`，也被悄悄跳过；插完要数一下行数

### 用子查询填外键

- 作用：`VALUES (..., (SELECT id FROM game_group WHERE name = '魂类'))`，按名字查出 id 再插
- 说法：按名字找外键 id；插入时关联另一张表
- 分类：SQLite
- 项目：Steam：录入游戏时按分组名找分组 id
- 坑：名字写错时子查询返回 NULL，配合 `INSERT OR IGNORE` 会静悄悄地不插

### 时间存 UTC + `datetime(列, '+8 hours')`

- 作用：库里统一存 UTC、取整到小时；看的时候再换算成北京时间
- 说法：时区转换；UTC 转北京时间；看本地时间
- 分类：SQLite
- 项目：Steam：`collected_at` 存 UTC，`datetime(collected_at, '+8 hours')` 查看
- 坑：时间存成 `YYYY-MM-DD HH:MM:SS` 文本时，按字符串排序就等于按时间排序；同一批采集的 `collected_at` 只算一次，不要每款游戏各算一次

### Navicat 打开 SQLite 文件

- 作用：Navicat 新建 SQLite 连接，直接指向 `.db` 文件
- 说法：图形界面看 SQLite；打开备份文件
- 分类：SQLite
- 项目：Steam：打开下载到本地的备份；分析 SQL 写进仓库 `analysis/`，Navicat 只当草稿
