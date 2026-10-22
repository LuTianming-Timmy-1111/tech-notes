# 看文件、找内容、磁盘空间、查系统信息

| 想看 | 用 |
|---|---|
| 整个文件 | `cat` |
| 开头几行 | `head -n N` |
| 最后几行 | `tail -n N` |
| 含某个词的行 | `grep` |

| | `du -sh 路径` | `df -h` |
|---|---|---|
| 回答的问题 | 这个目录占了多少 | 整个盘还剩多少 |

| | `command -v` / `which` | `type` |
|---|---|---|
| 能看出 | 命令实际是哪个文件 | 还能认出别名、内置命令 |

---

## 看文件

### `ls -l` / `ls -la` / `ls -lh`

- 作用：列出目录内容；`-l` 详细信息（权限、大小、时间），`-a` 含隐藏文件，`-h` 大小显示成 K/M/G
- 说法：看目录里有啥；列文件；看隐藏文件；看权限
- 分类：看文件
- 项目：Steam：`chmod +x` 前后用 `ls -l` 对比权限，`-rw-r--r--` 变成 `-rwxr-xr-x`；clone 后用 `ls -la` 看到 `.git`

### `cat 文件`

- 作用：把整个文件打到屏幕上
- 说法：看文件内容；打开看看；显示全文
- 分类：看文件
- 项目：豆瓣：`cat run_split.sh` 回忆脚本做了什么；Steam：`cat /etc/logrotate.d/apt` 参考现成配置

### `head -n N 文件`

- 作用：看开头 N 行；接在管道后面就是只取前 N 行
- 说法：看前几行；看开头；只要前几条
- 分类：看文件
- 项目：豆瓣：`head -20 schema.sql` 看导出文件开头；`git log --oneline | head -15`

### `tail -n N 文件`

- 作用：看最后 N 行；同时看多个文件时，每段前面标出文件名
- 说法：看最后几行；最新的日志；文件末尾
- 分类：看文件
- 项目：Steam：`tail -15 logs/collect.log` 看最近几次采集；豆瓣：`tail -n 3 .gitignore .dockerignore`
- 坑：CentOS 7 上同时看多个文件时，`tail -3 a b` 报“无效选项”，要写标准形式 `tail -n 3 a b`

### `grep -n 关键词 文件`

- 作用：找出含关键词的行，`-n` 带上行号；可以同时搜多个文件
- 说法：搜文件里有没有某个词；在第几行；查找字符串；过滤输出
- 分类：看文件
- 项目：豆瓣：`grep -n -E "DROP|TRUNCATE|DELETE" spider.py split_tables.py` 确认两个脚本重跑前都会清表；Steam：`ss -tlnp | grep ssh` 过滤命令输出

### `grep -c 关键词 文件`

- 作用：只数匹配了几行，不显示内容
- 说法：数一数有几个；统计出现次数；有没有报错
- 分类：看文件
- 项目：Steam：`grep -c ERROR logs/collect.log`，正常应该是 0；豆瓣：`grep -c "CREATE TABLE" schema.sql` 数表

### `grep -A N` / `grep -B N`

- 作用：把匹配行之后（After）或之前（Before）的 N 行也打出来
- 说法：看上下文；连带后面几行；前后几行
- 分类：看文件
- 项目：豆瓣：`grep -n -B 2 -A 8 "pymysql.connect" split_tables.py` 看完整的连接参数；`grep -n -A 10 "后续计划" README.md`

### `grep -E "a|b"`

- 作用：扩展正则，`|` 表示“或”，一次搜多种
- 说法：同时搜几个词；或者；多个关键词
- 分类：看文件
- 项目：豆瓣：`grep -n -E "CREATE TABLE|PRIMARY KEY|FOREIGN KEY|UNIQUE|CHECK|NOT NULL" schema.sql` 一次列出所有约束
- 坑：不加 `-E` 时，“或”要写成 `\|`，比如 `grep -n "DROP TABLE\|AUTO_INCREMENT=" schema.sql`

### `grep "^xxx"` / `grep -v "^#"`

- 作用：`^` 表示行首；`-v` 反选，留下**不**匹配的行
- 说法：只看开头是某词的行；去掉注释；排除某些行；反向过滤
- 分类：看文件
- 项目：Steam：`grep -n "^Port" /etc/ssh/sshd_config` 只看生效的 Port；`crontab -l | grep -v "^#"` 去掉注释只看任务
- 坑：配置文件里 `#Port 22` 是注释，不加 `^` 会一起搜出来，误以为还在生效

---

## 磁盘空间

### `du -sh 路径`

- 作用：看某个目录或文件一共占多大；`-s` 只给总数，`-h` 显示成 K/M/G
- 说法：文件夹多大；占了多少空间；目录大小
- 分类：磁盘空间
- 项目：豆瓣：`du -sh venv` 是 249M，所以要加进 `.dockerignore`，不然每次构建镜像都要打包发给 Docker

### `df -h`

- 作用：看各分区的总大小、已用、剩余
- 说法：硬盘还剩多少；磁盘满了没；空间够不够
- 分类：磁盘空间
- 项目：Steam：`df -h /` 看服务器根目录大小，估算日志和数据库一年也用不了多少

---

## 查系统信息

### `history`

- 作用：列出敲过的命令
- 说法：之前敲过什么；命令历史；翻记录
- 分类：查系统信息
- 项目：练习：回看当初跟视频装 Docker、MySQL 时敲过的命令，逐条弄懂

### `command -v 命令` / `which 命令`

- 作用：看敲这个命令时，实际运行的是哪个文件
- 说法：命令在哪；用的哪个 python；有没有装
- 分类：查系统信息
- 项目：Steam：容器里没激活 venv 时，`command -v python` 是镜像自带的 `/usr/local/bin/python`，导入 requests 报错
- 坑：没激活 venv 时 `python` 不是 venv 里的那个；给 cron 用就直接写 `venv/bin/python`

### `type 名字`

- 作用：看一个名字是别名、内置命令还是普通文件；是别名就显示展开内容
- 说法：这个别名是什么；查别名；dev 展开是啥
- 分类：查系统信息
- 项目：豆瓣：`type dev` 发现别名里挂载目录写死成了 Steam 项目，于是改成挂载当前目录

### `date`

- 作用：显示当前时间和时区
- 说法：现在几点；看时区；看系统时间
- 分类：查系统信息
- 项目：Steam：部署时看服务器时区，决定日志时间怎么读
- 坑：虚拟机时钟曾快一天，备份文件名的日期跟着错了；后来用 VMware Tools 时间同步修好

### `hostname`

- 作用：显示机器名
- 说法：机器叫什么；我在哪台机器上
- 分类：查系统信息
- 项目：Steam：`ssh ... hostname` 测密钥登录，登录、执行、马上退出
