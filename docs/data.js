window.NOTES = [
 {
  "title": "`ls -l` / `ls -la` / `ls -lh`",
  "file": "linux/01-view.md",
  "desc": "列出目录内容；`-l` 详细信息（权限、大小、时间），`-a` 含隐藏文件，`-h` 大小显示成 K/M/G",
  "says": [
   "看目录里有啥",
   "列文件",
   "看隐藏文件",
   "看权限"
  ],
  "cat": "看文件",
  "proj": "Steam：`chmod +x` 前后用 `ls -l` 对比权限，`-rw-r--r--` 变成 `-rwxr-xr-x`；clone 后用 `ls -la` 看到 `.git`"
 },
 {
  "title": "`cat 文件`",
  "file": "linux/01-view.md",
  "desc": "把整个文件打到屏幕上",
  "says": [
   "看文件内容",
   "打开看看",
   "显示全文"
  ],
  "cat": "看文件",
  "proj": "豆瓣：`cat run_split.sh` 回忆脚本做了什么；Steam：`cat /etc/logrotate.d/apt` 参考现成配置"
 },
 {
  "title": "`head -n N 文件`",
  "file": "linux/01-view.md",
  "desc": "看开头 N 行；接在管道后面就是只取前 N 行",
  "says": [
   "看前几行",
   "看开头",
   "只要前几条"
  ],
  "cat": "看文件",
  "proj": "豆瓣：`head -20 schema.sql` 看导出文件开头；`git log --oneline | head -15`"
 },
 {
  "title": "`tail -n N 文件`",
  "file": "linux/01-view.md",
  "desc": "看最后 N 行；同时看多个文件时，每段前面标出文件名",
  "says": [
   "看最后几行",
   "最新的日志",
   "文件末尾"
  ],
  "cat": "看文件",
  "proj": "Steam：`tail -15 logs/collect.log` 看最近几次采集；豆瓣：`tail -n 3 .gitignore .dockerignore`",
  "pit": "CentOS 7 上同时看多个文件时，`tail -3 a b` 报“无效选项”，要写标准形式 `tail -n 3 a b`"
 },
 {
  "title": "`grep -n 关键词 文件`",
  "file": "linux/01-view.md",
  "desc": "找出含关键词的行，`-n` 带上行号；可以同时搜多个文件",
  "says": [
   "搜文件里有没有某个词",
   "在第几行",
   "查找字符串",
   "过滤输出"
  ],
  "cat": "看文件",
  "proj": "豆瓣：`grep -n -E \"DROP|TRUNCATE|DELETE\" spider.py split_tables.py` 确认两个脚本重跑前都会清表；Steam：`ss -tlnp | grep ssh` 过滤命令输出"
 },
 {
  "title": "`grep -c 关键词 文件`",
  "file": "linux/01-view.md",
  "desc": "只数匹配了几行，不显示内容",
  "says": [
   "数一数有几个",
   "统计出现次数",
   "有没有报错"
  ],
  "cat": "看文件",
  "proj": "Steam：`grep -c ERROR logs/collect.log`，正常应该是 0；豆瓣：`grep -c \"CREATE TABLE\" schema.sql` 数表"
 },
 {
  "title": "`grep -A N` / `grep -B N`",
  "file": "linux/01-view.md",
  "desc": "把匹配行之后（After）或之前（Before）的 N 行也打出来",
  "says": [
   "看上下文",
   "连带后面几行",
   "前后几行"
  ],
  "cat": "看文件",
  "proj": "豆瓣：`grep -n -B 2 -A 8 \"pymysql.connect\" split_tables.py` 看完整的连接参数；`grep -n -A 10 \"后续计划\" README.md`"
 },
 {
  "title": "`grep -E \"a|b\"`",
  "file": "linux/01-view.md",
  "desc": "扩展正则，`|` 表示“或”，一次搜多种",
  "says": [
   "同时搜几个词",
   "或者",
   "多个关键词"
  ],
  "cat": "看文件",
  "proj": "豆瓣：`grep -n -E \"CREATE TABLE|PRIMARY KEY|FOREIGN KEY|UNIQUE|CHECK|NOT NULL\" schema.sql` 一次列出所有约束",
  "pit": "不加 `-E` 时，“或”要写成 `\\|`，比如 `grep -n \"DROP TABLE\\|AUTO_INCREMENT=\" schema.sql`"
 },
 {
  "title": "`grep \"^xxx\"` / `grep -v \"^#\"`",
  "file": "linux/01-view.md",
  "desc": "`^` 表示行首；`-v` 反选，留下**不**匹配的行",
  "says": [
   "只看开头是某词的行",
   "去掉注释",
   "排除某些行",
   "反向过滤"
  ],
  "cat": "看文件",
  "proj": "Steam：`grep -n \"^Port\" /etc/ssh/sshd_config` 只看生效的 Port；`crontab -l | grep -v \"^#\"` 去掉注释只看任务",
  "pit": "配置文件里 `#Port 22` 是注释，不加 `^` 会一起搜出来，误以为还在生效"
 },
 {
  "title": "`du -sh 路径`",
  "file": "linux/01-view.md",
  "desc": "看某个目录或文件一共占多大；`-s` 只给总数，`-h` 显示成 K/M/G",
  "says": [
   "文件夹多大",
   "占了多少空间",
   "目录大小"
  ],
  "cat": "磁盘空间",
  "proj": "豆瓣：`du -sh venv` 是 249M，所以要加进 `.dockerignore`，不然每次构建镜像都要打包发给 Docker"
 },
 {
  "title": "`df -h`",
  "file": "linux/01-view.md",
  "desc": "看各分区的总大小、已用、剩余",
  "says": [
   "硬盘还剩多少",
   "磁盘满了没",
   "空间够不够"
  ],
  "cat": "磁盘空间",
  "proj": "Steam：`df -h /` 看服务器根目录大小，估算日志和数据库一年也用不了多少"
 },
 {
  "title": "`history`",
  "file": "linux/01-view.md",
  "desc": "列出敲过的命令",
  "says": [
   "之前敲过什么",
   "命令历史",
   "翻记录"
  ],
  "cat": "查系统信息",
  "proj": "练习：回看当初跟视频装 Docker、MySQL 时敲过的命令，逐条弄懂"
 },
 {
  "title": "`command -v 命令` / `which 命令`",
  "file": "linux/01-view.md",
  "desc": "看敲这个命令时，实际运行的是哪个文件",
  "says": [
   "命令在哪",
   "用的哪个 python",
   "有没有装"
  ],
  "cat": "查系统信息",
  "proj": "Steam：容器里没激活 venv 时，`command -v python` 是镜像自带的 `/usr/local/bin/python`，导入 requests 报错",
  "pit": "没激活 venv 时 `python` 不是 venv 里的那个；给 cron 用就直接写 `venv/bin/python`"
 },
 {
  "title": "`type 名字`",
  "file": "linux/01-view.md",
  "desc": "看一个名字是别名、内置命令还是普通文件；是别名就显示展开内容",
  "says": [
   "这个别名是什么",
   "查别名",
   "dev 展开是啥"
  ],
  "cat": "查系统信息",
  "proj": "豆瓣：`type dev` 发现别名里挂载目录写死成了 Steam 项目，于是改成挂载当前目录"
 },
 {
  "title": "`date`",
  "file": "linux/01-view.md",
  "desc": "显示当前时间和时区",
  "says": [
   "现在几点",
   "看时区",
   "看系统时间"
  ],
  "cat": "查系统信息",
  "proj": "Steam：部署时看服务器时区，决定日志时间怎么读",
  "pit": "虚拟机时钟曾快一天，备份文件名的日期跟着错了；后来用 VMware Tools 时间同步修好"
 },
 {
  "title": "`hostname`",
  "file": "linux/01-view.md",
  "desc": "显示机器名",
  "says": [
   "机器叫什么",
   "我在哪台机器上"
  ],
  "cat": "查系统信息",
  "proj": "Steam：`ssh ... hostname` 测密钥登录，登录、执行、马上退出"
 },
 {
  "title": "`cat > 文件 << 'EOF'` … `EOF`",
  "file": "linux/02-edit.md",
  "desc": "把两个 `EOF` 之间的多行内容写成文件（heredoc）；`'EOF'` 带引号时，里面的 `$` 不会被展开",
  "says": [
   "新建文件写内容",
   "整段写进文件",
   "粘贴一段代码存成文件"
  ],
  "cat": "改文件内容",
  "proj": "Steam、豆瓣：`run_collect.sh`、`backup.py`、`check.py`、logrotate 配置都是这样写的",
  "pit": "本该写进文件的脚本内容，直接粘到终端就会被当场执行；粘贴前先看一眼自己在哪、贴的是什么"
 },
 {
  "title": "`echo \"内容\" >> 文件`",
  "file": "linux/02-edit.md",
  "desc": "往文件末尾追加一行",
  "says": [
   "加一行",
   "追加到文件末尾",
   "往配置里补一句"
  ],
  "cat": "改文件内容",
  "proj": "豆瓣：`echo \"venv/\" >> .gitignore`；Steam：把 `alias dev=...` 追加进 `~/.bashrc`",
  "pit": "写成 `>` 会把原文件清空，`.bashrc` 原来的内容就没了"
 },
 {
  "title": "`touch 文件` / `{01..10}`",
  "file": "linux/02-edit.md",
  "desc": "`touch` 建空文件；`{01..10}` 是 bash 花括号展开，自动变成 01 到 10",
  "says": [
   "建个空文件",
   "批量建文件",
   "造测试文件"
  ],
  "cat": "改文件内容",
  "proj": "Steam：`touch backups/steam-202610{01..10}.db` 造 10 个假备份，测“只留 7 份”的清理逻辑"
 },
 {
  "title": "`mkdir -p 路径`",
  "file": "linux/02-edit.md",
  "desc": "建目录，中间缺的上级目录一起建；已存在也不报错",
  "says": [
   "新建文件夹",
   "建多层目录",
   "目录不存在就建"
  ],
  "cat": "改文件内容",
  "proj": "练习：`mkdir -p /etc/systemd/system/docker.service.d` 放 Docker 代理配置；Steam：`run_collect.sh` 里 `mkdir -p logs`"
 },
 {
  "title": "`rm -r 目录`",
  "file": "linux/02-edit.md",
  "desc": "删除目录及里面的所有东西",
  "says": [
   "删文件夹",
   "整个目录删掉",
   "清掉测试数据"
  ],
  "cat": "改文件内容",
  "proj": "Steam：测完清理逻辑后 `rm -r backups`，反正 `backup.py` 会自己重建"
 },
 {
  "title": "`mv 临时文件 正式文件`",
  "file": "linux/02-edit.md",
  "desc": "移动或改名；先写临时文件、确认成功再 `mv` 覆盖正式文件",
  "says": [
   "改名",
   "移动文件",
   "替换文件"
  ],
  "cat": "改文件内容",
  "proj": "豆瓣：`dump_schema.sh` 先导出到临时文件，成功了才 `mv` 成 `schema.sql`，防止导出失败把好文件冲掉"
 },
 {
  "title": "`sed 's/旧/新/' 文件`",
  "file": "linux/02-edit.md",
  "desc": "把每行第一处“旧”替换成“新”，结果输出到屏幕，原文件不变；常配合 `>` 存成新文件",
  "says": [
   "替换文字",
   "批量改",
   "复制一份改个名字"
  ],
  "cat": "改文件内容",
  "proj": "豆瓣：`sed 's/split_tables.py/check.py/' run_split.sh > run_check.sh` 照着旧脚本生成新脚本；`mysqldump ... | sed 's/ AUTO_INCREMENT=[0-9]*//' > schema.sql` 去掉自增计数",
  "pit": "`[0-9]*` 是“任意个数字”；替换内容前面带空格，是为了连同前面的空格一起删掉"
 },
 {
  "title": "`sed 's|旧|新|'`",
  "file": "linux/02-edit.md",
  "desc": "分隔符不一定是 `/`，换成 `|` 也行",
  "says": [
   "替换路径",
   "路径里有斜杠"
  ],
  "cat": "改文件内容",
  "proj": "Steam：替换文件路径",
  "pit": "要替换的内容里有 `/` 时，用 `/` 当分隔符会乱，换 `|`；正则里的 `[` `]` 要写成 `\\[` `\\]`"
 },
 {
  "title": "`sed -i ...`",
  "file": "linux/02-edit.md",
  "desc": "直接修改原文件，不输出到屏幕",
  "says": [
   "直接改文件",
   "就地替换",
   "不打开文件改内容"
  ],
  "cat": "改文件内容",
  "proj": "Steam、豆瓣：改配置和脚本里的某一处"
 },
 {
  "title": "`sed -i '30,37d'` / `r 文件` / `i 内容`",
  "file": "linux/02-edit.md",
  "desc": "`30,37d` 删除第 30–37 行；`行号r 文件` 在该行后面插入另一个文件的内容；`行号i 内容` 在该行前面插入一行",
  "says": [
   "删掉几行",
   "按行号删除",
   "插入一段",
   "在某行前加一行"
  ],
  "cat": "改文件内容",
  "proj": "豆瓣：更新 README 时整段替换某一节"
 },
 {
  "title": "`vi 文件`：`i`、`Esc`、`:wq`",
  "file": "linux/02-edit.md",
  "desc": "`i` 进入插入模式，`Esc` 回到普通模式，`:wq` 保存退出",
  "says": [
   "编辑文件",
   "打开文件改",
   "保存退出"
  ],
  "cat": "改文件内容",
  "proj": "全程：改 `daemon.json`、Docker 代理配置、`crontab -e`、写分析脚本",
  "pit": "`python:3.12-slim` 容器里没有 vi；在宿主机上改，挂载的目录容器里立刻能看到"
 },
 {
  "title": "`:set paste`",
  "file": "linux/02-edit.md",
  "desc": "粘贴模式，粘贴时不自动缩进",
  "says": [
   "粘贴代码缩进乱了",
   "粘贴模式"
  ],
  "cat": "改文件内容",
  "proj": "豆瓣：在 vi 里粘贴 Python 脚本前先开",
  "pit": "不开的话，粘进去的 Python 代码缩进层层叠加，直接跑不起来"
 },
 {
  "title": "`:%d`",
  "file": "linux/02-edit.md",
  "desc": "删除全部行，清空文件",
  "says": [
   "清空文件",
   "全删重写"
  ],
  "cat": "改文件内容",
  "proj": "豆瓣：整个重写 `01_decades.py` 前先清空"
 },
 {
  "title": "`G`、`o`",
  "file": "linux/02-edit.md",
  "desc": "`G` 跳到最后一行；`o` 在当前行下面新开一行并进入插入模式",
  "says": [
   "跳到末尾",
   "在最后加一行"
  ],
  "cat": "改文件内容",
  "proj": "Steam：`crontab -e` 里在最后加一条定时任务"
 },
 {
  "title": "`/搜索`、`cw`、`r`",
  "file": "linux/02-edit.md",
  "desc": "`/词` 向下搜索；`cw` 改掉光标处的一个词；`r` 替换光标处的一个字符",
  "says": [
   "在文件里搜",
   "改一个词",
   "改一个字"
  ],
  "cat": "改文件内容",
  "proj": "练习：改 Docker 配置里的单个值"
 },
 {
  "title": "`#!/bin/bash` + `chmod +x 脚本`",
  "file": "linux/03-script.md",
  "desc": "第一行声明用 bash 运行；`chmod +x` 加执行权限，之后可以 `./脚本` 直接运行",
  "says": [
   "写个 shell 脚本",
   "给脚本执行权限",
   "脚本跑不起来"
  ],
  "cat": "写脚本",
  "proj": "Steam：`run_collect.sh`、`run_backup.sh`；豆瓣：`run_split.sh`、`run_all.sh`",
  "pit": "不加执行权限，cron 调用时报 `Permission denied`；Git 会把权限记成 `100755`，别人 clone 下来不用再 chmod"
 },
 {
  "title": "`cd \"$(dirname \"$0\")\"`",
  "file": "linux/03-script.md",
  "desc": "先进到脚本所在的目录，不管从哪里调用都能找到同目录的文件",
  "says": [
   "切到脚本所在目录",
   "从别的目录运行找不到文件",
   "cron 里路径不对"
  ],
  "cat": "写脚本",
  "proj": "Steam、豆瓣：所有 `run_*.sh` 的第二行",
  "pit": "`$0` 在脚本里是脚本路径，在交互终端里是 `bash`；把脚本内容直接粘到终端运行，结果会不一样"
 },
 {
  "title": "`$(命令)`",
  "file": "linux/03-script.md",
  "desc": "命令替换，把命令的输出当成一段文字嵌进来",
  "says": [
   "用命令的结果",
   "把输出塞进命令里"
  ],
  "cat": "写脚本",
  "proj": "Steam：`dirname \"$0\"` 的结果交给 `cd`"
 },
 {
  "title": "`>` / `>>`",
  "file": "linux/03-script.md",
  "desc": "把输出写进文件；`>` 覆盖，`>>` 追加",
  "says": [
   "输出存到文件",
   "保存结果",
   "追加日志"
  ],
  "cat": "写脚本",
  "proj": "Steam：`venv/bin/python collect.py >> logs/collect.log 2>&1`；豆瓣：`... > schema.sql`",
  "pit": "日志要用 `>>`，用 `>` 每次运行都会冲掉之前的记录"
 },
 {
  "title": "`2>&1`",
  "file": "linux/03-script.md",
  "desc": "程序输出有两条通道：标准输出（1，正常结果）和标准错误（2，警告和报错）；`2>&1` 把报错也并进来",
  "says": [
   "报错也写进日志",
   "错误输出重定向",
   "警告没进文件"
  ],
  "cat": "写脚本",
  "proj": "Steam：cron 跑的脚本报错也要进日志；豆瓣：`docker logs 容器 2>&1 | grep` 才能搜到报错",
  "pit": "只写 `>` 时，mysqldump 的密码警告留在屏幕上，没进 `schema.sql`，因为警告走的是 2 号通道"
 },
 {
  "title": "管道 `|`",
  "file": "linux/03-script.md",
  "desc": "前一条命令的输出直接交给后一条处理",
  "says": [
   "把结果交给下一个命令",
   "串起来处理",
   "过滤输出"
  ],
  "cat": "写脚本",
  "proj": "豆瓣：`docker exec ... mysqldump ... | sed ... > schema.sql`，导出 → 清理 → 写文件；`git log --oneline | head -15`"
 },
 {
  "title": "`set -e`",
  "file": "linux/03-script.md",
  "desc": "脚本里任何一条命令返回非 0，立刻停下，并把这个退出码带出去",
  "says": [
   "出错就停",
   "一步失败后面不跑",
   "脚本出错即停"
  ],
  "cat": "写脚本",
  "proj": "豆瓣：`run_all.sh` 串起 启动数据库 → 爬取 → 拆表 → 检查，任一步失败就停在那一步，看不到最后的“全部完成”"
 },
 {
  "title": "`set -o pipefail`",
  "file": "linux/03-script.md",
  "desc": "管道里任何一段失败，整条管道都算失败",
  "says": [
   "管道中间出错",
   "管道失败也要停"
  ],
  "cat": "写脚本",
  "proj": "豆瓣：`dump_schema.sh` 里 mysqldump 接 sed，mysqldump 失败时不能让 sed 的成功掩盖过去"
 },
 {
  "title": "`set -a; source .env; set +a`",
  "file": "linux/03-script.md",
  "desc": "读入 `.env` 里的变量，`set -a` 让它们自动导出给后面启动的程序",
  "says": [
   "读环境变量文件",
   "加载 .env",
   "让 Python 读到密码"
  ],
  "cat": "写脚本",
  "proj": "豆瓣：`run_split.sh`、`run_check.sh` 开头；进容器跑分析脚本前也要先执行",
  "pit": "每次新进容器都要重新执行一遍，不然 `os.environ['MYSQL_ROOT_PASSWORD']` 报错"
 },
 {
  "title": "`$?` / `echo $?`",
  "file": "linux/03-script.md",
  "desc": "上一条命令的退出码，0 是成功，非 0 是失败",
  "says": [
   "上一条成功没有",
   "看退出码",
   "返回值"
  ],
  "cat": "写脚本",
  "proj": "豆瓣：`./run_all.sh; echo $?` 全部通过是 0，`check.py` 有一项不过就是 1"
 },
 {
  "title": "`alias 名字='命令'` + `~/.bashrc`",
  "file": "linux/03-script.md",
  "desc": "给长命令起个短名字；写进 `~/.bashrc` 每次登录自动生效，`source ~/.bashrc` 让它马上生效",
  "says": [
   "起别名",
   "简化长命令",
   "快捷命令"
  ],
  "cat": "写脚本",
  "proj": "Steam：`dev` 别名代替那条很长的 `docker run`，一敲就进开发容器",
  "pit": "别名里的挂载目录一开始写死成了 Steam 项目，在豆瓣目录敲 `dev` 进的还是 Steam；后来改成挂载当前目录"
 },
 {
  "title": "行尾 `\\` 续行",
  "file": "linux/03-script.md",
  "desc": "命令太长时换行接着写，`\\` 后面不能有空格",
  "says": [
   "命令太长换行",
   "多行写一条命令"
  ],
  "cat": "写脚本",
  "proj": "练习：`docker run` 一行一个参数，方便看懂"
 },
 {
  "title": "`crontab -e` / `crontab -l`",
  "file": "linux/04-cron-log.md",
  "desc": "`-e` 编辑当前用户的定时任务，`-l` 列出来",
  "says": [
   "加定时任务",
   "每小时自动跑",
   "看有哪些定时任务"
  ],
  "cat": "定时任务",
  "proj": "Steam：`5,35 * * * * .../run_collect.sh` 采集，`20 4 * * * .../run_backup.sh` 备份",
  "pit": "第一次 `crontab -e` 会让选编辑器，选 vim；看任务时用 `crontab -l | grep -v \"^#\"` 去掉注释"
 },
 {
  "title": "cron 时间字段 `分 时 日 月 星期`",
  "file": "linux/04-cron-log.md",
  "desc": "五个字段决定什么时候跑，`*` 是“每个”，逗号列出多个值",
  "says": [
   "每小时跑一次",
   "每天几点跑",
   "定时规则怎么写"
  ],
  "cat": "定时任务",
  "proj": "Steam：`:35` 那次是补跑，`:05` 成功的话 `:35` 写入 0 条；备份放在凌晨，避开采集时间",
  "pit": "按**服务器时区**看钟；脚本路径写绝对路径"
 },
 {
  "title": "`systemctl daemon-reload` + `systemctl restart 服务`",
  "file": "linux/04-cron-log.md",
  "desc": "改了服务的配置文件后，先让 systemd 重新读配置，再重启服务生效",
  "says": [
   "重启服务",
   "改完配置不生效",
   "让配置生效"
  ],
  "cat": "服务和日志",
  "proj": "练习：改 Docker 镜像源、Docker 代理后 `systemctl restart docker`"
 },
 {
  "title": "`systemctl restart ssh.socket`",
  "file": "linux/04-cron-log.md",
  "desc": "Ubuntu 24.04 的 SSH 由 socket 监听端口，改端口后要重启它",
  "says": [
   "SSH 改端口不生效",
   "重启 SSH"
  ],
  "cat": "服务和日志",
  "proj": "Steam：服务器加 SSH 端口、后来关掉 22 端口",
  "pit": "只重启 ssh 服务不够，要 `daemon-reload` 再重启 `ssh.socket`"
 },
 {
  "title": "`systemctl list-timers 定时器`",
  "file": "linux/04-cron-log.md",
  "desc": "看 systemd 定时器下次、上次什么时候运行",
  "says": [
   "logrotate 什么时候跑",
   "看系统定时任务"
  ],
  "cat": "服务和日志",
  "proj": "Steam：`systemctl list-timers logrotate.timer`，每天 0 点运行"
 },
 {
  "title": "`apt upgrade` + `reboot`",
  "file": "linux/04-cron-log.md",
  "desc": "更新系统软件包，重启",
  "says": [
   "系统更新",
   "装补丁",
   "重启服务器"
  ],
  "cat": "服务和日志",
  "proj": "Steam：登录提示有一堆更新和 “restart required”，更新重启后顺便验证 cron 开机自启"
 },
 {
  "title": "`journalctl -u 服务 --since \"时间\" --no-pager`",
  "file": "linux/04-cron-log.md",
  "desc": "看 systemd 记录的某个服务的日志；`-u` 指定服务，`--no-pager` 直接打印不翻页",
  "says": [
   "cron 到底跑没跑",
   "看系统日志",
   "查服务记录"
  ],
  "cat": "服务和日志",
  "proj": "Steam：`journalctl -u cron --since \"20:00\" --no-pager` 看到 cron 准时调用了 `run_collect.sh`",
  "pit": "脚本日志是脚本自己说“我跑了”，journalctl 是系统说“我调用了”，两边对上才算确认"
 },
 {
  "title": "logrotate 配置 `/etc/logrotate.d/项目名`",
  "file": "linux/04-cron-log.md",
  "desc": "让系统定期轮转日志：改名、压缩、删最旧的",
  "says": [
   "日志太大",
   "日志按月切分",
   "自动清理旧日志"
  ],
  "cat": "服务和日志",
  "proj": "Steam：`logs/*.log` 配了 `monthly`、`rotate 12`、`compress`、`missingok`、`notifempty`",
  "pit": "路径要写绝对路径；参考 `/etc/logrotate.d/apt` 这类现成配置最稳"
 },
 {
  "title": "`logrotate -d 配置文件`",
  "file": "linux/04-cron-log.md",
  "desc": "演习模式，说一遍要做什么，但不真正执行，也不写记录",
  "says": [
   "测试 logrotate 配置",
   "预演",
   "配置写对没有"
  ],
  "cat": "服务和日志",
  "proj": "Steam：写完配置先演习，看到 `log does not need rotating`"
 },
 {
  "title": "`/var/lib/logrotate/status`",
  "file": "linux/04-cron-log.md",
  "desc": "logrotate 记录每个文件上次什么时候轮转过",
  "says": [
   "logrotate 跑过没有",
   "上次轮转时间"
  ],
  "cat": "服务和日志",
  "proj": "Steam：`grep steam /var/lib/logrotate/status` 确认两个日志都有了记录"
 },
 {
  "title": "`ssh -p 端口 用户@主机`",
  "file": "linux/05-remote.md",
  "desc": "登录远程机器；`-p` 指定端口（小写）",
  "says": [
   "登录服务器",
   "远程连接",
   "连上去"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：Windows PowerShell 登录云服务器",
  "pit": "校园网封了 22 端口，所以 SSH 另开了一个端口"
 },
 {
  "title": "`ssh 用户@主机 命令`",
  "file": "linux/05-remote.md",
  "desc": "登录、执行这条命令、马上退出",
  "says": [
   "远程执行一条命令",
   "不进去直接跑"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：`ssh ... hostname` 测密钥能不能登录"
 },
 {
  "title": "`ssh-keygen -t ed25519 -C \"注释\"`",
  "file": "linux/05-remote.md",
  "desc": "生成一对密钥；`.pub` 是公钥，可以给别人；没有 `.pub` 的是私钥，不外传",
  "says": [
   "生成密钥",
   "免密登录",
   "SSH key"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：服务器改成只允许密钥登录",
  "pit": "私钥是唯一的钥匙，电脑重装就没了，要离线备份；不要放网盘、聊天软件"
 },
 {
  "title": "sshd_config：`PasswordAuthentication no`、`PermitRootLogin prohibit-password`",
  "file": "linux/05-remote.md",
  "desc": "关掉密码登录，root 只能用密钥",
  "says": [
   "禁止密码登录",
   "只用密钥",
   "服务器加固"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：截图里不小心露过密码，之后改成只用密钥",
  "pit": "🔴 新方式验证能登录之前，已经连着的那个会话不要关，它是退路；最后的退路是云控制台的 VNC"
 },
 {
  "title": "sshd_config：`Port`",
  "file": "linux/05-remote.md",
  "desc": "SSH 监听哪些端口，可以写多行",
  "says": [
   "改 SSH 端口",
   "关掉 22 端口",
   "多开一个端口"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：先加新端口、确认能连，再删掉 22；改完要重启 `ssh.socket`",
  "pit": "顺序是“先开新门，再关旧门”；关端口时先改 sshd、验证，再删云防火墙规则"
 },
 {
  "title": "`ssh -o PubkeyAuthentication=no ...`",
  "file": "linux/05-remote.md",
  "desc": "故意不用密钥登录，模拟只知道密码的人",
  "says": [
   "测试密码登录关了没有"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：直接返回 `Permission denied (publickey)`，连输密码的机会都没有，说明关成功了"
 },
 {
  "title": "`scp -P 端口 源 目标`",
  "file": "linux/05-remote.md",
  "desc": "在本机和远程之间复制文件，远程路径写成 `用户@主机:路径`",
  "says": [
   "下载服务器上的文件",
   "上传到服务器",
   "传文件到虚拟机"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：把服务器上的数据库备份下载到 D 盘，再传到虚拟机",
  "pit": "scp 的端口是**大写** `-P`，ssh 是小写 `-p`"
 },
 {
  "title": "`scp -p -q -o BatchMode=yes`",
  "file": "linux/05-remote.md",
  "desc": "`-p` 保留原文件时间；`-q` 不显示进度条；`BatchMode=yes` 需要输密码时直接失败，不卡住",
  "says": [
   "后台自动下载",
   "保留修改时间",
   "不要卡在输密码"
  ],
  "cat": "远程登录和传文件",
  "proj": "Steam：Windows 任务计划每天自动下载备份",
  "pit": "不加 `-p`，本地文件时间是下载时间，看不出备份是哪天做的"
 },
 {
  "title": "`ss -tlnp`",
  "file": "linux/05-remote.md",
  "desc": "列出正在监听的 TCP 端口和对应的进程",
  "says": [
   "看端口",
   "哪个程序占了端口",
   "SSH 在听哪个端口"
  ],
  "cat": "查进程和端口",
  "proj": "Steam：`ss -tlnp | grep ssh` 验证 sshd 只在新端口上监听"
 },
 {
  "title": "`curl -x 代理 网址 -I`",
  "file": "linux/05-remote.md",
  "desc": "通过指定代理访问网址，`-I` 只看响应头",
  "says": [
   "测代理通不通",
   "走代理访问",
   "能不能上外网"
  ],
  "cat": "测网络连通",
  "proj": "练习：虚拟机测宿主机上的代理，通了才去配 Docker 代理",
  "pit": "超时的原因是 Windows 防火墙挡住了虚拟机的连接，还要确认代理软件的“局域网连接”开着"
 },
 {
  "title": "`curl -sS -m 10 网址`",
  "file": "linux/05-remote.md",
  "desc": "`-s` 不显示进度，`-S` 但出错时仍显示错误，`-m 10` 最多等 10 秒",
  "says": [
   "测接口",
   "请求一下看返回",
   "测网站通不通"
  ],
  "cat": "测网络连通",
  "proj": "Steam：在服务器上直接请求 Steam 接口，确认能访问"
 },
 {
  "title": "`git config --global user.name \"名字\"` / `user.email \"邮箱\"`",
  "file": "git/01-daily.md",
  "desc": "设置提交时署名；`--global` 对这台机器的所有仓库生效",
  "says": [
   "配置用户名邮箱",
   "第一次用 Git",
   "提交署名"
  ],
  "cat": "Git 日常",
  "proj": "练习：在 my-templates 时配过一次，之后豆瓣、Steam 都不用再配"
 },
 {
  "title": "`git init`",
  "file": "git/01-daily.md",
  "desc": "把当前目录变成 Git 仓库，生成 `.git`",
  "says": [
   "新建仓库",
   "开始用 Git 管理",
   "初始化"
  ],
  "cat": "Git 日常",
  "proj": "练习：my-templates；豆瓣：项目做了一段时间后才 init"
 },
 {
  "title": "`git status`",
  "file": "git/01-daily.md",
  "desc": "看哪些文件改了、哪些已暂存、哪些没被跟踪",
  "says": [
   "看改了哪些文件",
   "当前状态",
   "有没有没提交的"
  ],
  "cat": "Git 日常",
  "proj": "全程；加完 `.gitignore` 后用它确认 `venv/`、`logs/` 不见了",
  "pit": "add 之后、commit 之前再看一次，确认没有 `.env` 这类不该提交的文件；推上 GitHub 后就很难撤回"
 },
 {
  "title": "`git add 文件`",
  "file": "git/01-daily.md",
  "desc": "把改动放进暂存区",
  "says": [
   "加入暂存",
   "准备提交",
   "把文件交给 Git"
  ],
  "cat": "Git 日常",
  "proj": "全程；逐个写文件名，比 `git add .` 更不容易把不该提交的东西带进去"
 },
 {
  "title": "`git commit -m \"说明\"`",
  "file": "git/01-daily.md",
  "desc": "把暂存区存成一个版本，附上说明",
  "says": [
   "提交",
   "存个版本",
   "保存进度"
  ],
  "cat": "Git 日常",
  "proj": "全程；说明写清楚“这一版做了什么”",
  "pit": "第一个提交最好是能跑的版本；先 build、跑通再提交"
 },
 {
  "title": "`git log --oneline`",
  "file": "git/01-daily.md",
  "desc": "一行一个提交，看历史",
  "says": [
   "看提交历史",
   "提交了几次",
   "最近改了什么"
  ],
  "cat": "Git 日常",
  "proj": "全程；`git log --oneline | head -15` 只看最近 15 个"
 },
 {
  "title": "`git diff`",
  "file": "git/01-daily.md",
  "desc": "看工作区相对上一次提交改了什么；`-` 是删掉的行，`+` 是加上的行",
  "says": [
   "改了哪些地方",
   "对比修改",
   "看改动内容"
  ],
  "cat": "Git 日常",
  "proj": "豆瓣：确认 Dockerfile 到底改没改；Steam：提交前检查有没有误改",
  "pit": "Git 逐行比较文字，改一行会显示成删一行加一行；`@@ -51,8 +51,9 @@` 是旧文件从 51 行起 8 行，变成新文件从 51 行起 9 行"
 },
 {
  "title": "`.gitignore`",
  "file": "git/01-daily.md",
  "desc": "列出不进 Git 的文件和目录",
  "says": [
   "哪些文件不提交",
   "忽略文件",
   "不要上传"
  ],
  "cat": "Git 日常",
  "proj": "Steam：`venv/`、`data/`、`logs/`、`backups/`；豆瓣：`.env`、测试脚本、`venv/`、`analysis/output/`、`fonts/`",
  "pit": "原则是代码进 Git，数据、日志、密码、环境不进；建 GitHub 仓库时可以选 Python 模板，但数据库文件不在模板里，要自己加"
 },
 {
  "title": "文件模式 `100644` / `100755`",
  "file": "git/01-daily.md",
  "desc": "commit 输出里的 `create mode`，`100755` 表示可执行，`100644` 表示不可执行",
  "says": [
   "Git 记不记权限",
   "脚本拉下来能不能直接跑"
  ],
  "cat": "Git 日常",
  "proj": "Steam、豆瓣：`chmod +x` 过的脚本是 `100755`，clone 下来自带执行权限"
 },
 {
  "title": "在容器里敲 `git`",
  "file": "git/01-daily.md",
  "desc": "开发容器 `python:3.12-slim` 里没有装 git",
  "says": [
   "git command not found",
   "容器里提交不了"
  ],
  "cat": "Git 日常",
  "proj": "Steam：报 `command not found`，`exit` 回宿主机再提交",
  "pit": "先看提示符判断自己在宿主机还是容器里"
 },
 {
  "title": "`git checkout -b 分支名`",
  "file": "git/02-branch-remote.md",
  "desc": "新建分支并切过去",
  "says": [
   "开新分支",
   "新功能单独开发",
   "不影响主线"
  ],
  "cat": "Git 分支和远程",
  "proj": "豆瓣：`recommend`、`director`、`schema`、`readme`、`quality`、`charts` 都是这样开的"
 },
 {
  "title": "`git checkout master`",
  "file": "git/02-branch-remote.md",
  "desc": "切回主分支",
  "says": [
   "切换分支",
   "回到主线"
  ],
  "cat": "Git 分支和远程",
  "proj": "豆瓣：每个功能做完先切回 master 再合并"
 },
 {
  "title": "`git merge 分支名`",
  "file": "git/02-branch-remote.md",
  "desc": "把指定分支的提交合并进当前分支",
  "says": [
   "合并分支",
   "把功能并回主线"
  ],
  "cat": "Git 分支和远程",
  "proj": "豆瓣：`quality` 合并回 master 时是 Fast-forward",
  "pit": "开分支后 master 上没有新提交时，合并只是把指针往前挪（Fast-forward），不会生成新的合并提交"
 },
 {
  "title": "`git branch -d 分支名`",
  "file": "git/02-branch-remote.md",
  "desc": "删除已经合并的分支",
  "says": [
   "删分支",
   "清理用完的分支"
  ],
  "cat": "Git 分支和远程",
  "proj": "豆瓣：合并、推送后删掉"
 },
 {
  "title": "`git remote add origin 地址` / `git remote set-url origin 新地址`",
  "file": "git/02-branch-remote.md",
  "desc": "添加远程仓库地址；地址变了用 `set-url` 改",
  "says": [
   "关联 GitHub",
   "添加远程仓库",
   "改远程地址"
  ],
  "cat": "Git 分支和远程",
  "proj": "练习：GitHub 改了用户名后，旧仓库要 `set-url` 换成新地址"
 },
 {
  "title": "`git push -u origin master` / `git push`",
  "file": "git/02-branch-remote.md",
  "desc": "把本地提交推到 GitHub；第一次加 `-u` 记住对应关系，之后直接 `git push`",
  "says": [
   "推送到 GitHub",
   "上传代码",
   "同步到远程"
  ],
  "cat": "Git 分支和远程",
  "proj": "全程；https 推送时用户名照填，密码填 token",
  "pit": "虚拟机推 GitHub 要给 Git 配代理；curl 不读 Git 的代理配置，两者分开"
 },
 {
  "title": "`git clone 地址`",
  "file": "git/02-branch-remote.md",
  "desc": "把远程仓库完整下载到本地",
  "says": [
   "下载仓库",
   "拉一份代码",
   "部署到服务器"
  ],
  "cat": "Git 分支和远程",
  "proj": "Steam：服务器 clone 公开仓库，不用认证；tech-notes：clone 到虚拟机",
  "pit": "在 GitHub 建仓库时勾上 Add README，clone 下来就有一次提交和分支，不是空仓库"
 },
 {
  "title": "`git pull`",
  "file": "git/02-branch-remote.md",
  "desc": "把远程的新提交拉下来",
  "says": [
   "更新代码",
   "同步最新版本",
   "服务器拉代码"
  ],
  "cat": "Git 分支和远程",
  "proj": "Steam：虚拟机 push 后，服务器 `git pull`；`data/`、`logs/`、`venv/` 被忽略，不受影响"
 },
 {
  "title": "`docker pull 镜像:标签`",
  "file": "docker/01-container.md",
  "desc": "从仓库下载镜像",
  "says": [
   "下载镜像",
   "拉镜像",
   "获取 MySQL 镜像"
  ],
  "cat": "容器操作",
  "proj": "练习：`docker pull mysql:8.0`",
  "pit": "国内拉镜像慢；反复 Ctrl+C 重拉更慢，已下好的层有缓存，重试会接着下"
 },
 {
  "title": "`docker run -d --name 名字 -p ... -e ... -v ... 镜像`",
  "file": "docker/01-container.md",
  "desc": "用镜像创建并启动一个容器",
  "says": [
   "启动容器",
   "用 Docker 跑一个 MySQL",
   "把镜像跑起来"
  ],
  "cat": "容器操作",
  "proj": "练习：跑 MySQL 容器，`-e MYSQL_ROOT_PASSWORD=...`，`-v 宿主目录:/var/lib/mysql`",
  "pit": "宿主机 3306 已被手装的 MySQL 占用，容器要映射到别的宿主端口；删掉容器再重建，数据还在，说明 `-v` 起作用了"
 },
 {
  "title": "`docker run -it --rm -v 目录:/app -w /app 镜像 bash`",
  "file": "docker/01-container.md",
  "desc": "起一个临时的交互容器，挂载项目目录，退出就删",
  "says": [
   "进开发容器",
   "用新版本 Python",
   "临时容器"
  ],
  "cat": "容器操作",
  "proj": "Steam、豆瓣：虚拟机 Python 是 3.6，用 `python:3.12-slim` 容器 + venv 开发；存成 `dev` 别名",
  "pit": "容器要访问外网时用 `-e HTTPS_PROXY=...` 传代理；slim 镜像里没有 vi、git"
 },
 {
  "title": "`docker ps`",
  "file": "docker/01-container.md",
  "desc": "列出正在运行的容器、端口映射、状态",
  "says": [
   "看有哪些容器在跑",
   "容器状态",
   "容器起来没有"
  ],
  "cat": "容器操作",
  "proj": "练习：确认 `Up` 和端口映射"
 },
 {
  "title": "`docker images`",
  "file": "docker/01-container.md",
  "desc": "列出本地镜像和大小",
  "says": [
   "看有哪些镜像",
   "镜像多大"
  ],
  "cat": "容器操作",
  "proj": "练习：myapp 比基础镜像大 12MB，就是加进去的依赖和代码"
 },
 {
  "title": "`docker stop 名字` / `docker rm 名字`",
  "file": "docker/01-container.md",
  "desc": "停止容器 / 删除容器",
  "says": [
   "停容器",
   "删容器",
   "端口被旧容器占了"
  ],
  "cat": "容器操作",
  "proj": "练习：删掉 MySQL 容器再重建，验证数据卷；豆瓣：旧容器占着端口时先清掉"
 },
 {
  "title": "`docker exec -it 容器 bash`",
  "file": "docker/01-container.md",
  "desc": "进入正在运行的容器开一个终端",
  "says": [
   "进容器",
   "在容器里执行命令",
   "看容器里面"
  ],
  "cat": "容器操作",
  "proj": "练习：进 MySQL 容器看看，发现系统是 Oracle Linux，不是想象的 Debian"
 },
 {
  "title": "`docker exec 容器 sh -c '命令'`",
  "file": "docker/01-container.md",
  "desc": "在容器里执行一条命令；单引号让 `$变量` 在容器里展开",
  "says": [
   "在容器里跑一条命令",
   "用容器里的环境变量"
  ],
  "cat": "容器操作",
  "proj": "豆瓣：`docker exec 容器 sh -c 'mysqldump -uroot -p\"$MYSQL_ROOT_PASSWORD\" ...'`，密码用容器自己的环境变量",
  "pit": "用双引号的话，`$MYSQL_ROOT_PASSWORD` 会在宿主机展开，宿主机上没有这个变量"
 },
 {
  "title": "`docker exec -i 容器 命令 < 文件`",
  "file": "docker/01-container.md",
  "desc": "把宿主机的文件喂给容器里的命令",
  "says": [
   "导入 SQL 文件",
   "把文件传给容器里的程序"
  ],
  "cat": "容器操作",
  "proj": "豆瓣：建测试库后把 `schema.sql` 导进去，验证建表语句能用"
 },
 {
  "title": "`docker logs 容器 2>&1 | grep 关键词`",
  "file": "docker/01-container.md",
  "desc": "看容器输出的日志；`2>&1` 把报错也并进来才能 grep 到",
  "says": [
   "看容器日志",
   "容器为什么挂了",
   "查报错"
  ],
  "cat": "容器操作",
  "proj": "豆瓣：在容器日志里搜报错"
 },
 {
  "title": "`/etc/docker/daemon.json` 的 `registry-mirrors`",
  "file": "docker/01-container.md",
  "desc": "配置镜像加速源",
  "says": [
   "拉镜像太慢",
   "换镜像源",
   "加速器"
  ],
  "cat": "容器操作",
  "proj": "练习：配了几个公共加速源；改完 `systemctl daemon-reload` + `systemctl restart docker`",
  "pit": "公共源速度看时段，慢不一定是配错了"
 },
 {
  "title": "Docker 走代理：`docker.service.d/http-proxy.conf`",
  "file": "docker/01-container.md",
  "desc": "在 systemd 配置里给 Docker 设 `HTTP_PROXY`、`HTTPS_PROXY`、`NO_PROXY`",
  "says": [
   "Docker 走代理",
   "拉镜像走宿主机代理"
  ],
  "cat": "容器操作",
  "proj": "练习：先用 curl 测通宿主机代理，再配给 Docker",
  "pit": "配完用 `docker info | grep -i proxy` 确认生效"
 },
 {
  "title": "容器连宿主机上的服务",
  "file": "docker/01-container.md",
  "desc": "容器里的 `localhost` 是容器自己；要连宿主机，用 docker0 网桥的网关地址",
  "says": [
   "容器连不上宿主机数据库",
   "容器访问宿主机"
  ],
  "cat": "容器操作",
  "proj": "豆瓣：在开发容器里跑分析脚本，连宿主机映射出来的 MySQL；地址放在环境变量 `DB_HOST` 里，代码里给默认值"
 },
 {
  "title": "Dockerfile 基本写法",
  "file": "docker/02-dockerfile.md",
  "desc": "写镜像的“菜谱”：`FROM` → `WORKDIR` → `COPY requirements.txt .` → `RUN pip install -r requirements.txt` → `COPY 代码 .` → `CMD [\"python\", \"xxx.py\"]`",
  "says": [
   "打包自己的程序",
   "写 Dockerfile",
   "做镜像"
  ],
  "cat": "构建镜像",
  "proj": "练习：Flask 小服务打包成 `myapp:1.0`；豆瓣：爬虫镜像",
  "pit": "`CMD` 里的文件名照抄模板没改（还是 `app.py`），容器一启动就找不到文件"
 },
 {
  "title": "`RUN` vs `CMD`",
  "file": "docker/02-dockerfile.md",
  "desc": "`RUN` 在构建镜像时执行，结果存进镜像；`CMD` 在容器启动时执行",
  "says": [
   "RUN 和 CMD 区别",
   "装依赖用哪个",
   "启动命令写哪"
  ],
  "cat": "构建镜像",
  "proj": "练习：`RUN pip install`、`CMD [\"python\", \"app.py\"]`"
 },
 {
  "title": "先 COPY 依赖文件，再 COPY 代码",
  "file": "docker/02-dockerfile.md",
  "desc": "利用构建缓存：只改代码时，装依赖那一层直接复用",
  "says": [
   "构建太慢",
   "每次都重装依赖",
   "缓存"
  ],
  "cat": "构建镜像",
  "proj": "练习、豆瓣",
  "pit": "把不常变的（依赖）放前面，常变的（代码）放后面"
 },
 {
  "title": "镜像分层",
  "file": "docker/02-dockerfile.md",
  "desc": "每条指令生成一层，镜像是一摞只读层；相同的底层可以共享",
  "says": [
   "镜像为什么这么大",
   "分层",
   "层缓存"
  ],
  "cat": "构建镜像",
  "proj": "练习：myapp 只比 `python:3.9-slim` 大 12MB"
 },
 {
  "title": "`docker build -t 名字:标签 .`",
  "file": "docker/02-dockerfile.md",
  "desc": "按当前目录的 Dockerfile 构建镜像",
  "says": [
   "构建镜像",
   "打包镜像",
   "build"
  ],
  "cat": "构建镜像",
  "proj": "练习：`docker build -t myapp:1.0 .`",
  "pit": "最后的 `.` 是构建上下文（当前目录），漏了会报错"
 },
 {
  "title": "`.dockerignore`",
  "file": "docker/02-dockerfile.md",
  "desc": "构建时 Docker 会先把整个目录（构建上下文）打包发给引擎，`.dockerignore` 决定哪些不发",
  "says": [
   "构建时排除文件",
   "不要把 .env 打进镜像",
   "构建上下文太大"
  ],
  "cat": "构建镜像",
  "proj": "豆瓣：`.env`、测试脚本、`venv/`（249M）",
  "pit": "Dockerfile 是逐个 COPY 文件时，`.env` 本来就进不了镜像；`.dockerignore` 防的是以后改成 `COPY . .`，以及缩小构建上下文"
 },
 {
  "title": "`image:` / `build: .`",
  "file": "docker/03-compose.md",
  "desc": "`image` 用现成镜像；`build: .` 用当前目录的 Dockerfile 现场构建",
  "says": [
   "用现成镜像还是自己构建",
   "Compose 里 build"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：`db` 用 `mysql:8.0`，`spider` 用 `build: .`",
  "pit": "`image` 拼成 `iamge`，报 `Additional property ... is not allowed`；YAML 缩进只能用空格"
 },
 {
  "title": "`environment:` + `${变量}` + `.env`",
  "file": "docker/03-compose.md",
  "desc": "给容器传环境变量；`${变量}` 从同目录的 `.env` 里取值",
  "says": [
   "传密码给容器",
   "密码不写在配置里",
   "环境变量"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：数据库密码从所有源文件里移到 `.env`，Compose 和 Python 都从环境变量读",
  "pit": "`.env` 进 `.gitignore`，另外提交一份不含真实密码的 `.env.example`"
 },
 {
  "title": "`volumes:`（命名卷）",
  "file": "docker/03-compose.md",
  "desc": "把数据存在 Docker 管理的卷里，容器删了数据还在",
  "says": [
   "数据持久化",
   "数据库数据存哪",
   "容器删了数据别丢"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：MySQL 的数据目录",
  "pit": "顶层也要声明这个卷，漏了会报错"
 },
 {
  "title": "`ports:`",
  "file": "docker/03-compose.md",
  "desc": "端口映射，写法和 `-p` 一样",
  "says": [
   "映射端口",
   "从外面访问容器"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：只给 `db` 映射，Navicat 和宿主机脚本要连；`spider` 不需要对外，就不写",
  "pit": "宿主端口被别的容器或程序占着就起不来"
 },
 {
  "title": "`depends_on:`",
  "file": "docker/03-compose.md",
  "desc": "控制启动顺序，先起被依赖的服务",
  "says": [
   "先启动数据库",
   "启动顺序"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：`spider` 依赖 `db`",
  "pit": "只保证先**启动**，不保证 MySQL 已经**就绪**；爬虫里用 `for ... else` 加连接重试"
 },
 {
  "title": "`restart: unless-stopped`",
  "file": "docker/03-compose.md",
  "desc": "除非手动停止，否则容器退出或机器重启后自动拉起",
  "says": [
   "开机自启",
   "虚拟机重启后数据库没了",
   "自动重启"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：只给 `db` 加",
  "pit": "不要给 `spider` 加，爬完正常退出也会被拉起来，反复重爬"
 },
 {
  "title": "`command:`",
  "file": "docker/03-compose.md",
  "desc": "覆盖镜像默认的启动命令，常用来加启动参数",
  "says": [
   "改启动参数",
   "MySQL 认证方式"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：给 MySQL 设置认证方式，让 Python 3.6 的 pymysql 能连上"
 },
 {
  "title": "服务名通信",
  "file": "docker/03-compose.md",
  "desc": "Compose 给这组容器建一个网络，容器之间用服务名当地址",
  "says": [
   "容器之间怎么连",
   "连数据库填什么地址",
   "不用写 IP"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：爬虫容器里连 `db`；宿主机上的 `split_tables.py` 连 `localhost` 加映射端口",
  "pit": "两种地址别混，容器里的 `localhost` 是容器自己"
 },
 {
  "title": "`docker-compose config`",
  "file": "docker/03-compose.md",
  "desc": "检查 YAML 语法，打印展开后的完整配置",
  "says": [
   "检查 compose 文件",
   "配置写对没有",
   "看变量替换结果"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣",
  "pit": "Docker 20.10 不带 compose 插件，Compose v2 是单独装的二进制，命令是带横线的 `docker-compose`"
 },
 {
  "title": "`docker-compose up -d` / `up -d 服务`",
  "file": "docker/03-compose.md",
  "desc": "后台启动全部服务，或只启动某一个",
  "says": [
   "一键启动",
   "只起数据库",
   "后台运行"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：`run_all.sh` 第一步 `docker-compose up -d db`"
 },
 {
  "title": "`docker-compose run --rm 服务 [命令]`",
  "file": "docker/03-compose.md",
  "desc": "临时跑一次某个服务，跑完删掉容器；后面可以换成别的命令",
  "says": [
   "跑一次爬虫",
   "临时运行",
   "看镜像里有哪些文件"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：`run_all.sh` 里 `docker-compose run --rm spider`；`docker-compose run --rm spider ls -la` 确认 `.env` 没进镜像",
  "pit": "`run` 把容器的退出码原样返回，`set -e` 能接住；`up` 不会，脚本里要用 `run`"
 },
 {
  "title": "`docker-compose build 服务`",
  "file": "docker/03-compose.md",
  "desc": "重新构建某个服务的镜像",
  "says": [
   "改了代码重新打包",
   "重新 build"
  ],
  "cat": "Compose 编排",
  "proj": "豆瓣：改了 `spider.py` 后先 build 再提交"
 },
 {
  "title": "`docker-compose ps` / `logs` / `down`",
  "file": "docker/03-compose.md",
  "desc": "看状态 / 看日志 / 停止并删除容器和网络",
  "says": [
   "看服务状态",
   "一键停止",
   "全部关掉"
  ],
  "cat": "Compose 编排",
  "proj": "练习、豆瓣",
  "pit": "`down` 默认保留数据卷，`down -v` 才连卷一起删"
 },
 {
  "title": "`SELECT 列 FROM 表` / `DISTINCT`",
  "file": "sql/01-query.md",
  "desc": "取指定的列；`DISTINCT` 去重",
  "says": [
   "查几列",
   "去重",
   "有哪些不同的值"
  ],
  "cat": "SQL 查询",
  "proj": "练习：选课库 student / course / sc",
  "pit": "少用 `SELECT *`，只取需要的列"
 },
 {
  "title": "`WHERE` 条件写法",
  "file": "sql/01-query.md",
  "desc": "比较 `= <> > <`、范围 `BETWEEN a AND b`、枚举 `IN (...)`、模糊 `LIKE '张%'`、空值 `IS NULL`、逻辑 `AND OR NOT`",
  "says": [
   "筛选",
   "按条件过滤",
   "在某个范围内",
   "模糊匹配"
  ],
  "cat": "SQL 查询",
  "proj": "练习；豆瓣：`check.py` 里 `rating NOT BETWEEN 0 AND 10`",
  "pit": "`BETWEEN` 两端都包含；`LIKE` 里 `%` 是任意多个字符，`_` 是一个字符"
 },
 {
  "title": "`ORDER BY 列 DESC` / `LIMIT N`",
  "file": "sql/01-query.md",
  "desc": "排序（`ASC` 升序，`DESC` 降序，可多列）；只取前 N 条",
  "says": [
   "排序",
   "从高到低",
   "取前几名",
   "前 10 条"
  ],
  "cat": "SQL 查询",
  "proj": "练习；豆瓣：推荐结果按分数降序取前几部",
  "pit": "没写 `ORDER BY` 时返回顺序不保证"
 },
 {
  "title": "NULL 的三条规则",
  "file": "sql/01-query.md",
  "desc": "① 和 NULL 的比较、运算结果都是 NULL，`WHERE` 把它当不满足；② 判空只能用 `IS NULL` / `IS NOT NULL`；③ 聚合函数忽略 NULL，`COUNT(*)` 除外",
  "says": [
   "空值",
   "查不到 NULL 的行",
   "NULL 判断"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`check.py` 年份检查的第一版遇到 NULL 会漏掉（比较结果是 NULL，被当成不满足），改成 `year IS NULL OR year NOT REGEXP '^[0-9]{4}$'`",
  "pit": "空字符串 `''` 和 NULL 不是一回事，Navicat 里一个显示空白、一个显示 `(Null)`，用眼睛看最容易漏"
 },
 {
  "title": "`COUNT` / `SUM` / `AVG` / `MAX` / `MIN` + `GROUP BY`",
  "file": "sql/01-query.md",
  "desc": "按某列分组，每组算一个汇总值",
  "says": [
   "分组统计",
   "每个类型有几部",
   "平均分",
   "计数"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：各类型、各国家的电影数和平均分；Steam：`GROUP BY collected_at` 数每小时写入了几条",
  "pit": "`SELECT` 里非聚合的列都要出现在 `GROUP BY` 里"
 },
 {
  "title": "`HAVING 条件`",
  "file": "sql/01-query.md",
  "desc": "对分组后的结果再筛",
  "says": [
   "筛选分组结果",
   "数量大于几的组",
   "聚合后过滤"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`SELECT COUNT(*) AS n FROM movie_new HAVING n <> 250`，不等于 250 才返回一行"
 },
 {
  "title": "`JOIN 表 ON 条件`（内连接）",
  "file": "sql/01-query.md",
  "desc": "按关联条件把多张表拼成一张宽表，只保留两边都匹配的行",
  "says": [
   "多表查询",
   "关联两张表",
   "连表"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`movie_new` → `movie_genre` → `genre` 三表 JOIN，查每部电影的类型；Steam：`player_count` JOIN `game` JOIN `game_group`",
  "pit": "多对多 JOIN 之后行数会变多（250 部电影 JOIN 类型后是 701 行），直接算总数、平均会重复计算"
 },
 {
  "title": "`LEFT JOIN` + `IS NULL`",
  "file": "sql/01-query.md",
  "desc": "保留左表全部行；右边为 NULL 的就是“左边有、右边没有”的",
  "says": [
   "找没有的",
   "没选课的学生",
   "没有类型的电影",
   "孤立记录"
  ],
  "cat": "SQL 查询",
  "proj": "练习：没选课的学生；豆瓣：`check.py` 查“没有类型 / 国家 / 导演的电影”"
 },
 {
  "title": "`COUNT(右表列)` vs `COUNT(*)`",
  "file": "sql/01-query.md",
  "desc": "LEFT JOIN 后统计个数，要数右表的列",
  "says": [
   "没有的显示 0",
   "统计个数包括 0"
  ],
  "cat": "SQL 查询",
  "proj": "练习：每个学生选了几门课",
  "pit": "没选课的学生右表是 NULL，`COUNT(*)` 会数成 1，`COUNT(sc.cid)` 才是 0"
 },
 {
  "title": "标量子查询 / `IN` 子查询 / `EXISTS`",
  "file": "sql/02-advanced.md",
  "desc": "标量子查询返回一个值拿来比较；`IN` 判断是否属于一列值；`EXISTS` 判断子查询有没有结果",
  "says": [
   "嵌套查询",
   "高于平均值的",
   "属于某个集合",
   "存不存在"
  ],
  "cat": "SQL 查询",
  "proj": "练习：高于平均分的记录、选了某门课的学生；查“不存在”有三条路：`NOT IN`、`NOT EXISTS`、`LEFT JOIN + IS NULL`"
 },
 {
  "title": "`FROM (子查询) t`",
  "file": "sql/02-advanced.md",
  "desc": "把子查询的结果当成一张临时表，必须起别名",
  "says": [
   "子查询当表用",
   "在结果上再查一次",
   "派生表"
  ],
  "cat": "SQL 查询",
  "proj": "练习、豆瓣：先算名次再筛前 N；用 `UNION ALL` 造的假数据表"
 },
 {
  "title": "`RANK() OVER (PARTITION BY 列 ORDER BY 列 DESC)`",
  "file": "sql/02-advanced.md",
  "desc": "不压缩行数，给每一行算组内名次；`PARTITION BY` 分组，`ORDER BY` 定排序",
  "says": [
   "组内排名",
   "每个类型里排第几",
   "分组排序"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：每个类型内按评分排名",
  "pit": "窗口函数不会减少行数，结果行数和原来一样"
 },
 {
  "title": "每组前 N",
  "file": "sql/02-advanced.md",
  "desc": "子查询里算名次，外层 `WHERE rk <= N`",
  "says": [
   "每组前三",
   "每个类型评分最高的几部",
   "分组 Top N"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`04` 每个类型评分前 3",
  "pit": "不能在同一层直接写 `WHERE rk <= 3`，因为 `WHERE` 在 `SELECT` 之前执行，那时名次还没算出来"
 },
 {
  "title": "`WITH 名字 AS (...) SELECT ...`",
  "file": "sql/02-advanced.md",
  "desc": "先给一段查询起名，后面像表一样用；可以连写多个，用逗号隔开",
  "says": [
   "临时结果命名",
   "分步写查询",
   "代替多层嵌套"
  ],
  "cat": "SQL 查询",
  "proj": "练习；豆瓣：`06` 先用 CTE 算每个类型的出现次数，再按“越少见权重越大”（IDF）给推荐加权",
  "pit": "CTE 只在紧跟着的那一条语句里有效"
 },
 {
  "title": "`UNION ALL`",
  "file": "sql/02-advanced.md",
  "desc": "把几个查询结果上下拼起来；要求列数相同、类型兼容",
  "says": [
   "合并结果",
   "上下拼接",
   "造几行测试数据"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`SELECT '1994' AS year UNION ALL SELECT '19a4' UNION ALL SELECT NULL ...` 造一张假表，验证检查条件能不能抓住坏数据"
 },
 {
  "title": "`REGEXP '^[0-9]{4}$'`",
  "file": "sql/02-advanced.md",
  "desc": "正则匹配；`^` 开头、`$` 结尾、`[0-9]{4}` 正好 4 个数字",
  "says": [
   "正则",
   "格式对不对",
   "纯数字",
   "是不是 4 位年份"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：找出年份带后缀、多个年份导致字段错位的电影；`check.py` 年份检查",
  "pit": "`REGEXP '[0-9]'` 只要求“含数字”，国家名混进类型列这种问题就抓不到；要从源头按严格格式查"
 },
 {
  "title": "字符串函数：`CONCAT`、`SUBSTRING`、`REPLACE`、`TRIM`",
  "file": "sql/02-advanced.md",
  "desc": "拼接、截取、替换、去首尾空白",
  "says": [
   "拼字符串",
   "截取一段",
   "替换文字",
   "去空格"
  ],
  "cat": "SQL 查询",
  "proj": "练习"
 },
 {
  "title": "`CHAR_LENGTH` vs `LENGTH`",
  "file": "sql/02-advanced.md",
  "desc": "`CHAR_LENGTH` 数字符，`LENGTH` 数字节",
  "says": [
   "字符串长度",
   "中文有几个字"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：写年份检查时讲到",
  "pit": "MySQL 里一个汉字占 3 字节，判断中文长度要用 `CHAR_LENGTH`；另外“4 个字符”不等于“4 位数字”，`'19a4'` 长度也是 4，格式检查要用正则"
 },
 {
  "title": "`HEX(列)`",
  "file": "sql/02-advanced.md",
  "desc": "看字符串的十六进制编码",
  "says": [
   "看起来一样的字符",
   "字符编码",
   "奇怪的字符"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：标题显示成 `——`，用 `HEX()` 确认是汉字“一”，就是电影《一一》，不是破折号"
 },
 {
  "title": "日期函数：`YEAR`、`DATE_ADD`、`DATEDIFF`、`DATE_FORMAT`",
  "file": "sql/02-advanced.md",
  "desc": "取年份、加减日期、相差天数、按格式输出",
  "says": [
   "日期计算",
   "按年份筛选",
   "两个日期差几天"
  ],
  "cat": "SQL 查询",
  "proj": "练习",
  "pit": "`WHERE YEAR(日期) = 2024` 会让索引失效，改成 `日期 >= '2024-01-01' AND 日期 < '2025-01-01'`"
 },
 {
  "title": "`CASE WHEN 条件 THEN 值 ELSE 值 END`",
  "file": "sql/02-advanced.md",
  "desc": "按条件给出不同的值",
  "says": [
   "条件判断",
   "分档",
   "如果……就……"
  ],
  "cat": "SQL 查询",
  "proj": "练习"
 },
 {
  "title": "`ROUND(值, 位数)`",
  "file": "sql/02-advanced.md",
  "desc": "四舍五入",
  "says": [
   "保留几位小数",
   "取整"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`07` 推荐分数",
  "pit": "排序要用原始分数，`ROUND` 只用在最后展示，先四舍五入会造成假并列；各项分数量级不同时要先缩放再加权"
 },
 {
  "title": "`CREATE TABLE` + 约束",
  "file": "sql/03-schema.md",
  "desc": "建表时写上列类型和约束，让数据库替你挡住坏数据",
  "says": [
   "建表",
   "加约束",
   "不允许重复",
   "不能为空"
  ],
  "cat": "建表和约束",
  "proj": "练习：student / course / sc；豆瓣：7 张规范化表；Steam：`game_group`、`game`、`player_count`",
  "pit": "约束只管“存在的数据对不对”，管不了“该有的数据有没有”，比如“某部电影一个类型都没有”约束挡不住"
 },
 {
  "title": "联合主键 `PRIMARY KEY (列1, 列2)`",
  "file": "sql/03-schema.md",
  "desc": "两列合起来唯一",
  "says": [
   "多对多中间表的主键",
   "同一组合不能重复"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：`movie_genre (movie_id, genre_id)`；Steam：`player_count (game_id, collected_at)`，同一游戏同一小时只能有一条",
  "pit": "联合主键的中间表没有自增 id"
 },
 {
  "title": "1NF、多对多、中间表",
  "file": "sql/03-schema.md",
  "desc": "一个格子只放一个值；多对多关系拆成两张实体表 + 一张中间表",
  "says": [
   "一个字段存了多个值",
   "拆表",
   "规范化"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：`country`、`genre` 一格多个值，拆成 `movie_new`、`genre`、`country` + 两张中间表，后来加了 `director` + `movie_director`"
 },
 {
  "title": "`FOREIGN KEY` 与删除顺序",
  "file": "sql/03-schema.md",
  "desc": "子表的外键必须指向父表里存在的行",
  "says": [
   "外键",
   "关联约束",
   "删不掉"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：`split_tables.py` 先 `DELETE` 三张中间表，再删 `movie_new`、`genre` 等",
  "pit": "中间表还有记录指着某部电影时，不能先删那部电影；顺序反了会报错"
 },
 {
  "title": "`CHECK (条件)`",
  "file": "sql/03-schema.md",
  "desc": "自定义约束",
  "says": [
   "至少有一个不为空",
   "限制取值"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：导演表 `CHECK (name_cn IS NOT NULL OR name_en IS NOT NULL)`，中英文名至少有一个"
 },
 {
  "title": "`UNIQUE`",
  "file": "sql/03-schema.md",
  "desc": "这一列不允许重复",
  "says": [
   "不能重名",
   "唯一"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：`genre.name`、`country.name`、`director.name_cn` / `name_en`"
 },
 {
  "title": "`INSERT` / `UPDATE` / `DELETE`",
  "file": "sql/03-schema.md",
  "desc": "插入、修改、删除行",
  "says": [
   "插数据",
   "改数据",
   "删数据"
  ],
  "cat": "SQL 改数据",
  "proj": "练习；豆瓣：`split_tables.py` 先清表再插入，所以可以反复重跑",
  "pit": "`UPDATE`、`DELETE` 忘写 `WHERE` 会改动整张表"
 },
 {
  "title": "`DELETE FROM 表` vs `TRUNCATE TABLE 表`",
  "file": "sql/03-schema.md",
  "desc": "都能清空表；`DELETE` 不重置自增计数，`TRUNCATE` 重置",
  "says": [
   "清空表",
   "自增 id 不从 1 开始",
   "id 越来越大"
  ],
  "cat": "SQL 改数据",
  "proj": "豆瓣：每次重跑拆表，`movie_new` 的 id 都往上涨，读出来从 2003 开始",
  "pit": "这不影响使用，id 本来就不该有业务含义"
 },
 {
  "title": "`START TRANSACTION` / `COMMIT` / `ROLLBACK`",
  "file": "sql/03-schema.md",
  "desc": "一组操作要么全成功，要么全撤销；MySQL 默认自动提交",
  "says": [
   "事务",
   "全成或全败",
   "撤销操作",
   "回滚"
  ],
  "cat": "SQL 改数据",
  "proj": "练习：转账例子；ACID 是原子性、一致性、隔离性、持久性"
 },
 {
  "title": "`CREATE INDEX 名 ON 表(列)` / `SHOW INDEX FROM 表` / `DROP INDEX 名 ON 表`",
  "file": "sql/03-schema.md",
  "desc": "给常用来查询的列建索引；查看；删除",
  "says": [
   "加索引",
   "查询太慢",
   "看表有哪些索引"
  ],
  "cat": "建表和约束",
  "proj": "练习：`idx_表名_列名` 命名",
  "pit": "主键自动就是索引；索引不是越多越好，会拖慢增删改"
 },
 {
  "title": "`EXPLAIN SELECT ...`",
  "file": "sql/03-schema.md",
  "desc": "看查询打算怎么执行；看 `type`（`ALL` 是全表扫描）、`key`（用了哪个索引，`NULL` 是没用）、`rows`（预计扫多少行）、`key_len`",
  "says": [
   "查询走没走索引",
   "执行计划",
   "为什么慢"
  ],
  "cat": "SQL 查询",
  "proj": "练习：自己跑出过 `type=ref`",
  "pit": "表只有几行时，优化器可能故意不用索引，这是正常的"
 },
 {
  "title": "索引失效",
  "file": "sql/03-schema.md",
  "desc": "索引列要“干干净净”地出现在条件里",
  "says": [
   "建了索引还是慢",
   "索引没用上"
  ],
  "cat": "SQL 查询",
  "proj": "练习",
  "pit": "对索引列用函数或运算（`YEAR(日期) = 2024`、`score + 10 > 90`）、`LIKE '%三'` 以 % 开头、`!=` / `NOT IN` 等、隐式类型转换（数字列用字符串比）"
 },
 {
  "title": "断言式检查：查出行就是有问题",
  "file": "sql/03-schema.md",
  "desc": "每条检查是一句专门找坏数据的 SQL，0 行 = 通过；计数类检查用 `HAVING` 统一成同样的规则",
  "says": [
   "数据质量检查",
   "校验数据",
   "有没有脏数据"
  ],
  "cat": "SQL 查询",
  "proj": "豆瓣：`check.py` 7 条：总数 250、片名为空、评分越界、年份格式、没类型 / 国家 / 导演",
  "pit": "检查本身也要检查：用 `UNION ALL` 造假数据，或临时改条件故意让它失败，确认它真的能抓到问题"
 },
 {
  "title": "`mysqldump --no-data`",
  "file": "sql/03-schema.md",
  "desc": "只导出表结构，不导数据",
  "says": [
   "导出建表语句",
   "表结构存成文件",
   "备份结构"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：`--no-data --skip-add-drop-table --skip-dump-date --ignore-table=douban.movie` 导出成 `schema.sql`，再用 sed 去掉 `AUTO_INCREMENT=`",
  "pit": "默认带 `DROP TABLE IF EXISTS`，在有数据的库上一跑全没了；`movie` 表由爬虫自己建，不进 `schema.sql`（谁生成数据，谁定义结构）"
 },
 {
  "title": "`FOREIGN_KEY_CHECKS=0` / `/*!40014 ... */`",
  "file": "sql/03-schema.md",
  "desc": "mysqldump 文件开头暂时关掉外键检查，因为按字母顺序建表，子表可能排在父表前面；`/*!版本号 ... */` 是 MySQL 会执行、别的数据库当注释的写法",
  "says": [
   "导入时外键报错",
   "建表顺序"
  ],
  "cat": "建表和约束",
  "proj": "豆瓣：把 `schema.sql` 导进测试库没有报错，原因就在文件开头"
 },
 {
  "title": "文件即库",
  "file": "sql/04-sqlite.md",
  "desc": "`sqlite3.connect(\"data/steam.db\")`，文件不存在就新建，不用 `CREATE DATABASE`",
  "says": [
   "SQLite 建库",
   "数据库就是一个文件"
  ],
  "cat": "SQLite",
  "proj": "Steam",
  "pit": "数据库文件是数据，进 `.gitignore`"
 },
 {
  "title": "`sqlite_master`",
  "file": "sql/04-sqlite.md",
  "desc": "SQLite 自己的目录表，记录库里有哪些表",
  "says": [
   "看有哪些表",
   "SQLite 的 SHOW TABLES"
  ],
  "cat": "SQLite",
  "proj": "Steam：`SELECT name FROM sqlite_master WHERE type = 'table'` 确认建表成功"
 },
 {
  "title": "`INSERT OR IGNORE`",
  "file": "sql/04-sqlite.md",
  "desc": "插入时违反约束就跳过，不报错",
  "says": [
   "重复就跳过",
   "已存在就不插",
   "幂等插入"
  ],
  "cat": "SQLite",
  "proj": "Steam：`init_db.py` 重复运行不会重复录入游戏；`:35` 补跑时 `:05` 已经写过的跳过，写入 0 条",
  "pit": "它吞掉的是**所有**约束错误，不只是重复：用子查询查分组 id 时名字写错，返回 NULL 违反 `NOT NULL`，也被悄悄跳过；插完要数一下行数"
 },
 {
  "title": "用子查询填外键",
  "file": "sql/04-sqlite.md",
  "desc": "`VALUES (..., (SELECT id FROM game_group WHERE name = '魂类'))`，按名字查出 id 再插",
  "says": [
   "按名字找外键 id",
   "插入时关联另一张表"
  ],
  "cat": "SQLite",
  "proj": "Steam：录入游戏时按分组名找分组 id",
  "pit": "名字写错时子查询返回 NULL，配合 `INSERT OR IGNORE` 会静悄悄地不插"
 },
 {
  "title": "时间存 UTC + `datetime(列, '+8 hours')`",
  "file": "sql/04-sqlite.md",
  "desc": "库里统一存 UTC、取整到小时；看的时候再换算成北京时间",
  "says": [
   "时区转换",
   "UTC 转北京时间",
   "看本地时间"
  ],
  "cat": "SQLite",
  "proj": "Steam：`collected_at` 存 UTC，`datetime(collected_at, '+8 hours')` 查看",
  "pit": "时间存成 `YYYY-MM-DD HH:MM:SS` 文本时，按字符串排序就等于按时间排序；同一批采集的 `collected_at` 只算一次，不要每款游戏各算一次"
 },
 {
  "title": "Navicat 打开 SQLite 文件",
  "file": "sql/04-sqlite.md",
  "desc": "Navicat 新建 SQLite 连接，直接指向 `.db` 文件",
  "says": [
   "图形界面看 SQLite",
   "打开备份文件"
  ],
  "cat": "SQLite",
  "proj": "Steam：打开下载到本地的备份；分析 SQL 写进仓库 `analysis/`，Navicat 只当草稿"
 },
 {
  "title": "`python3 -m venv venv`",
  "file": "python/01-env.md",
  "desc": "在项目目录里建一个独立的 Python 环境，装的包只在这里",
  "says": [
   "建虚拟环境",
   "隔离依赖",
   "venv"
  ],
  "cat": "Python 环境",
  "proj": "Steam：开发容器和服务器上各建一个；豆瓣：分析用的 venv 建在开发容器里",
  "pit": "`venv/` 要进 `.gitignore` 和 `.dockerignore`；Ubuntu 上建 venv 可能要先装系统的 venv 包"
 },
 {
  "title": "`venv/bin/pip install -r requirements.txt`",
  "file": "python/01-env.md",
  "desc": "按依赖清单装包",
  "says": [
   "装依赖",
   "按清单安装",
   "pip 安装"
  ],
  "cat": "Python 环境",
  "proj": "Steam：`requirements.txt` 采集用，`requirements-analysis.txt` 分析用（pandas、matplotlib，只在本地）",
  "pit": "清单里只写**直接用到**的包和版本，依赖的依赖 pip 会自己带上"
 },
 {
  "title": "`source venv/bin/activate` vs `venv/bin/python`",
  "file": "python/01-env.md",
  "desc": "两种用 venv 的方式，效果一样",
  "says": [
   "激活虚拟环境",
   "用 venv 里的 python",
   "cron 里怎么用 venv"
  ],
  "cat": "Python 环境",
  "proj": "Steam：`run_collect.sh` 里直接写 `venv/bin/python collect.py`",
  "pit": "没激活就 `python`，用的是系统或镜像自带的那个，报 `ModuleNotFoundError`"
 },
 {
  "title": "`venv/bin/python -c \"代码\"`",
  "file": "python/01-env.md",
  "desc": "不写文件，直接跑一行 Python",
  "says": [
   "跑一行代码",
   "快速测试",
   "看包的版本"
  ],
  "cat": "Python 环境",
  "proj": "Steam：`venv/bin/python -c \"import requests; print(requests.__version__)\"`；用一行 sqlite3 查每小时写了几条"
 },
 {
  "title": "宿主机 Python 版本太老",
  "file": "python/01-env.md",
  "desc": "CentOS 7 自带 Python 3.6，新版 pandas、requests 装不上，换用 `python:3.12-slim` 容器",
  "says": [
   "Python 版本不够",
   "装不上新包",
   "f-string 能不能用"
  ],
  "cat": "Python 环境",
  "proj": "豆瓣的爬虫、拆表、检查用 3.6，bs4 降到 4.11.2；Steam 和豆瓣分析图在 3.12 容器里"
 },
 {
  "title": "`if __name__ == \"__main__\":`",
  "file": "python/01-env.md",
  "desc": "直接运行这个文件时才执行下面的代码，被 `import` 时不执行",
  "says": [
   "程序入口",
   "主函数",
   "被导入时不运行"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam、豆瓣：所有脚本都是 `main()` 放在这里，`logging.basicConfig` 也放在这里"
 },
 {
  "title": "`os.environ['X']` / `os.environ.get('X', 默认)`",
  "file": "python/01-env.md",
  "desc": "读环境变量",
  "says": [
   "读环境变量",
   "密码不写在代码里",
   "读配置"
  ],
  "cat": "Python 写脚本",
  "proj": "豆瓣：`os.environ['MYSQL_ROOT_PASSWORD']` 读密码；`os.environ.get(\"DB_HOST\", 默认地址)` 读数据库地址",
  "pit": "密码从所有源文件里移到 `.env`，代码只读环境变量"
 },
 {
  "title": "`sys.exit(退出码)`",
  "file": "python/01-env.md",
  "desc": "结束程序并返回退出码，0 成功，非 0 失败",
  "says": [
   "返回退出码",
   "让 shell 知道失败了"
  ],
  "cat": "Python 写脚本",
  "proj": "豆瓣：`check.py` 全部通过退出 0，有一项不过退出 1，`run_all.sh` 的 `set -e` 才能接住"
 },
 {
  "title": "`try` / `except 异常类型 as e` / `raise`",
  "file": "python/01-env.md",
  "desc": "捕获指定类型的异常；`raise` 原样再抛出去",
  "says": [
   "出错不崩",
   "捕获异常",
   "跳过失败的"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：一款游戏请求失败，记一条 ERROR 然后 `continue`，不拖垮其他游戏；重试到最后一次仍失败就 `raise`",
  "pit": "日志里记 `type(e).__name__`（比如 `ConnectTimeout`），比整段错误信息短，一眼能看出是哪类问题"
 },
 {
  "title": "`for ... else`",
  "file": "python/01-env.md",
  "desc": "循环没有被 `break` 打断、正常走完时，才执行 `else`",
  "says": [
   "重试几次都失败",
   "循环没找到"
  ],
  "cat": "Python 写脚本",
  "proj": "豆瓣：爬虫连数据库重试，成功就 `break`，全部失败走 `else` 报错退出（Compose 的 `depends_on` 不保证 MySQL 已就绪）"
 },
 {
  "title": "`for name, sql in CHECKS`",
  "file": "python/01-env.md",
  "desc": "列表里每一项是元组，循环时直接拆成几个变量",
  "says": [
   "遍历元组列表",
   "一次取两个值"
  ],
  "cat": "Python 写脚本",
  "proj": "豆瓣：`check.py` 的检查清单是 `(名字, SQL)` 的列表，加检查只往列表里加一项"
 },
 {
  "title": "`datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)`",
  "file": "python/01-env.md",
  "desc": "取当前 UTC 时间，并取整到小时",
  "says": [
   "当前 UTC 时间",
   "取整到整点",
   "时间截断"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：`collected_at`，同一小时重跑也是同一个值，配合联合主键防重复",
  "pit": "一批采集只取一次时间，不要每款游戏各取一次"
 },
 {
  "title": "`f\"{datetime.now():%Y%m%d}\"`",
  "file": "python/01-env.md",
  "desc": "在 f-string 里按格式输出日期，和 `strftime` 写法一样",
  "says": [
   "文件名带日期",
   "格式化日期"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：备份文件名 `steam-20261018.db`"
 },
 {
  "title": "`logging.basicConfig(level=logging.INFO, format=\"%(asctime)s %(levelname)s %(message)s\")`",
  "file": "python/01-env.md",
  "desc": "设置日志级别和格式，每行自动带时间和级别",
  "says": [
   "打日志",
   "日志带时间",
   "代替 print"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：`collect.py`、`backup.py`",
  "pit": "cron 后台跑没人看屏幕，`print` 没时间、没级别，换成 logging 再配合 `>> 日志 2>&1`"
 },
 {
  "title": "`logging.info` / `warning` / `error`",
  "file": "python/01-env.md",
  "desc": "按级别记日志",
  "says": [
   "记录信息",
   "记警告",
   "记错误"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：重试记 WARNING，最终失败记 ERROR，`grep -c ERROR` 就能数出问题"
 },
 {
  "title": "`Path(__file__).resolve().parent`",
  "file": "python/01-env.md",
  "desc": "脚本自己所在的目录，以它为基准拼路径",
  "says": [
   "脚本所在目录",
   "不受当前目录影响",
   "cron 找不到文件"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：`BASE_DIR`；分析脚本在 `analysis/` 里，要 `.parent.parent` 回到项目根目录",
  "pit": "`Path(\"data/steam.db\")` 这种相对路径相对的是“在哪运行”，cron 的当前目录不一样就找不到"
 },
 {
  "title": "`BASE_DIR / \"data\" / \"steam.db\"`",
  "file": "python/01-env.md",
  "desc": "用 `/` 拼路径",
  "says": [
   "拼路径",
   "路径拼接"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam、豆瓣"
 },
 {
  "title": "`mkdir(exist_ok=True)` / `glob` / `unlink` / `stat().st_size` / `read_text`",
  "file": "python/01-env.md",
  "desc": "建目录（已存在不报错）、按通配符找文件、删除文件、看大小、读出文本",
  "says": [
   "建文件夹",
   "找出所有备份",
   "删文件",
   "文件多大",
   "读文件内容"
  ],
  "cat": "Python 写脚本",
  "proj": "Steam：`sorted(BACKUP_DIR.glob(\"steam-*.db\"))` 排序后 `[:-7]` 是要删的旧备份，`[-1]` 是最新的一份",
  "pit": "文件名里日期是 `YYYYMMDD`，按字符串排序就等于按时间排序"
 },
 {
  "title": "`requests.get(网址, headers={\"User-Agent\": ...})`",
  "file": "python/02-scraping.md",
  "desc": "发 GET 请求取网页；带上浏览器的 User-Agent",
  "says": [
   "请求网页",
   "爬网页",
   "伪装浏览器"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：Top250 共 10 页，翻页爬取",
  "pit": "不带 User-Agent 容易被拒"
 },
 {
  "title": "`requests.get(网址, params={...}, timeout=10)`",
  "file": "python/02-scraping.md",
  "desc": "`params` 让 requests 帮你拼查询参数；`timeout` 最多等几秒",
  "says": [
   "带参数请求",
   "调接口",
   "超时设置"
  ],
  "cat": "爬网页",
  "proj": "Steam：`params={\"appid\": app_id}` 调 Steam 接口",
  "pit": "不设 timeout，网络卡住时脚本会一直挂着"
 },
 {
  "title": "`resp.json()`",
  "file": "python/02-scraping.md",
  "desc": "把返回的 JSON 转成 Python 字典",
  "says": [
   "解析 JSON",
   "接口返回的数据"
  ],
  "cat": "爬网页",
  "proj": "Steam：`resp.json()[\"response\"]`，`result` 不是 1 就是没数据",
  "pit": "还没发售的游戏返回 `result` 42，不插入，返回 `None` 交给调用方处理"
 },
 {
  "title": "`time.sleep(秒)`",
  "file": "python/02-scraping.md",
  "desc": "每次请求之间停一下",
  "says": [
   "限速",
   "别请求太快",
   "礼貌爬取"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：翻页之间 sleep；Steam：每款游戏间隔 1 秒"
 },
 {
  "title": "失败重试",
  "file": "python/02-scraping.md",
  "desc": "请求失败等几秒再试，最多几次；最后一次还失败就抛出",
  "says": [
   "自动重试",
   "网络抖动",
   "失败再来"
  ],
  "cat": "爬网页",
  "proj": "Steam：`fetch_with_retry` 最多 3 次，每次等 5 秒",
  "pit": "最后一次失败后不要再打印“5 秒后重试”"
 },
 {
  "title": "BeautifulSoup：`find` / `find_all` / `class_=`",
  "file": "python/02-scraping.md",
  "desc": "在 HTML 里找第一个 / 所有符合条件的标签；按 class 找要写 `class_`",
  "says": [
   "解析网页",
   "找标签",
   "提取内容"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：每部电影一个块，取片名、评分、年份、国家、类型、导演",
  "pit": "Python 3.6 上 bs4 要降到 4.11.2"
 },
 {
  "title": "`repr(文本)`",
  "file": "python/02-scraping.md",
  "desc": "显示字符串的真实样子，看得到 `\\xa0`、`\\n` 这些不可见字符",
  "says": [
   "看清脏文本",
   "看隐藏字符",
   "为什么切不开"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：发现年份、国家、类型之间隔的是 `\\xa0`（不换行空格）"
 },
 {
  "title": "切分清洗：`replace('\\xa0', ' ')`、`split('/')`、`strip()`",
  "file": "python/02-scraping.md",
  "desc": "替换掉特殊空格、按分隔符切开、去首尾空白",
  "says": [
   "清洗文本",
   "按斜杠切开",
   "去空格"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：一行文字切成年份、国家、类型"
 },
 {
  "title": "负下标 `parts[-2]`、`parts[-1]`",
  "file": "python/02-scraping.md",
  "desc": "从后往前取，前面有几段都不影响",
  "says": [
   "取最后一个",
   "倒数第二个",
   "从后面取"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：国家永远是倒数第 2 段、类型永远是倒数第 1 段",
  "pit": "有多个上映年份的电影（如《大闹天宫》）多出几段，从前往后按位置取就错位了"
 },
 {
  "title": "`str.replace('...', '')` vs `rstrip('.')`",
  "file": "python/02-scraping.md",
  "desc": "删掉指定的子串；`rstrip` 删的是末尾所有属于这些字符的字符",
  "says": [
   "去掉省略号",
   "删末尾字符"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：去掉被截断的导演名后面的 `...`",
  "pit": "`rstrip('.')` 会把名字末尾真正的句点也删掉"
 },
 {
  "title": "防御异常记录 + 测试脚本",
  "file": "python/02-scraping.md",
  "desc": "字段数不对时记日志、跳过；改爬虫前先写测试脚本，用真实页面跑边界情况",
  "says": [
   "数据格式不对",
   "容错",
   "先测试再改"
  ],
  "cat": "爬网页",
  "proj": "豆瓣：导演名被 `&nbsp;` 截断、被页面截断两种情况，先在测试脚本里复现再改 `spider.py`，改完做回归测试",
  "pit": "测试脚本和正式代码各写一份逻辑，改了一边忘了另一边就对不上"
 },
 {
  "title": "`pip install --trusted-host 源地址`",
  "file": "python/02-scraping.md",
  "desc": "信任这个 pip 源，跳过 SSL 证书校验",
  "says": [
   "pip 证书报错",
   "SSL 错误装不上包"
  ],
  "cat": "Python 环境",
  "proj": "豆瓣早期在 CentOS 7 的 Python 3.6 上装包"
 },
 {
  "title": "`pymysql.connect(host=..., port=..., user=..., password=..., database=..., charset='utf8mb4')`",
  "file": "python/03-db.md",
  "desc": "连 MySQL",
  "says": [
   "Python 连 MySQL",
   "连数据库",
   "pymysql 连接"
  ],
  "cat": "Python 连数据库",
  "proj": "豆瓣：`spider.py`、`split_tables.py`、`check.py`",
  "pit": "不加 `charset='utf8mb4'` 中文可能乱码；MySQL 8 默认认证方式要装 `cryptography`，或者把账号改成旧认证方式"
 },
 {
  "title": "`cursor.execute(sql, 参数)` / `conn.commit()` / `cursor.fetchall()` / `close()`",
  "file": "python/03-db.md",
  "desc": "执行 SQL；提交；取回全部结果（元组的元组）；关闭",
  "says": [
   "执行 SQL",
   "提交事务",
   "取查询结果"
  ],
  "cat": "Python 连数据库",
  "proj": "豆瓣：全部插完统一 `commit`；`check.py` 用 `len(rows)` 判断有没有问题行",
  "pit": "参数用占位符传，不要用 f-string 拼进 SQL"
 },
 {
  "title": "get-or-create",
  "file": "python/03-db.md",
  "desc": "先查这个名字有没有 id，有就用，没有就插入再取 id",
  "says": [
   "没有就新建",
   "去重插入",
   "查不到就插"
  ],
  "cat": "Python 连数据库",
  "proj": "豆瓣：拆表时 `genre`、`country`、`director` 都这样去重"
 },
 {
  "title": "连接重试",
  "file": "python/03-db.md",
  "desc": "连不上时等几秒再试，用 `for ... else`",
  "says": [
   "数据库还没起来",
   "连接失败重试"
  ],
  "cat": "Python 连数据库",
  "proj": "豆瓣：爬虫容器比 MySQL 先准备好时会连不上"
 },
 {
  "title": "`sqlite3.connect(路径)` / `con.execute(sql, 参数)` / `con.commit()`",
  "file": "python/03-db.md",
  "desc": "连 SQLite；`con.execute` 是省事写法，内部自动建游标",
  "says": [
   "Python 连 SQLite",
   "操作 SQLite"
  ],
  "cat": "Python 连数据库",
  "proj": "Steam：`init_db.py`、`collect.py`",
  "pit": "占位符是 `?`，不是 `%s`"
 },
 {
  "title": "`con.executescript(文本)`",
  "file": "python/03-db.md",
  "desc": "一次执行多条 SQL",
  "says": [
   "跑整个 SQL 文件",
   "一次建好几张表"
  ],
  "cat": "Python 连数据库",
  "proj": "Steam：`con.executescript(SCHEMA_PATH.read_text(encoding=\"utf-8\"))` 跑 `schema.sql`"
 },
 {
  "title": "`PRAGMA foreign_keys = ON`",
  "file": "python/03-db.md",
  "desc": "打开 SQLite 的外键检查",
  "says": [
   "SQLite 外键不生效",
   "开启外键"
  ],
  "cat": "Python 连数据库",
  "proj": "Steam：`collect.py` 连库后第一句"
 },
 {
  "title": "`cur.rowcount`",
  "file": "python/03-db.md",
  "desc": "这次执行影响了几行",
  "says": [
   "插入了几条",
   "写入成功没有"
  ],
  "cat": "Python 连数据库",
  "proj": "Steam：`INSERT OR IGNORE` 插进去是 1，被忽略是 0，加起来就是“写入 X 条”"
 },
 {
  "title": "`src.backup(dst)`",
  "file": "python/03-db.md",
  "desc": "SQLite 的备份接口，复制出一个完整、一致的快照",
  "says": [
   "备份数据库",
   "复制数据库文件"
  ],
  "cat": "Python 连数据库",
  "proj": "Steam：`backup.py` 每天一份，只留 7 份",
  "pit": "不能直接 `cp` 正在被写的数据库，可能复制到写了一半的文件"
 },
 {
  "title": "`create_engine(\"mysql+pymysql://用户:密码@地址:端口/库名?charset=utf8mb4\")`",
  "file": "python/03-db.md",
  "desc": "按地址管理连接，用的时候自动连、用完自动还；`mysql` 是数据库种类，`+pymysql` 是驱动",
  "says": [
   "pandas 连 MySQL",
   "数据库连接地址",
   "SQLAlchemy 引擎"
  ],
  "cat": "Python 连数据库",
  "proj": "豆瓣：分析脚本 `pd.read_sql(sql, engine)`",
  "pit": "直接把 pymysql 连接传给 `pd.read_sql` 能用，但会出 UserWarning；pandas 只测试过 SQLAlchemy 和 sqlite3 连接"
 },
 {
  "title": "`pd.read_sql(sql, 连接)`",
  "file": "python/04-pandas.md",
  "desc": "执行 SQL，结果直接变成 DataFrame",
  "says": [
   "从数据库读表",
   "SQL 结果转 DataFrame"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：读最新的 SQLite 备份；豆瓣：经 SQLAlchemy 读 MySQL",
  "pit": "MySQL 的 decimal 读进来是 `Decimal`，`read_sql` 默认会转成 float"
 },
 {
  "title": "`df.head()` / `df.dtypes` / `len(df)`",
  "file": "python/04-pandas.md",
  "desc": "看前几行、每列类型、行数",
  "says": [
   "看数据长什么样",
   "列的类型",
   "有几行"
  ],
  "cat": "pandas 处理表格",
  "proj": "豆瓣：`year` 读进来是字符串，要转数字才能算年代；JOIN 类型表后 701 行，不是 250",
  "pit": "先看类型再处理"
 },
 {
  "title": "`unique()` / `nunique()` / `drop_duplicates()` / `sort_values()`",
  "file": "python/04-pandas.md",
  "desc": "不重复的值 / 不重复值的个数 / 去重 / 排序",
  "says": [
   "有哪些值",
   "有几种",
   "去重",
   "排序"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：取分组列表、所有时间点；豆瓣：`df[\"genre\"].nunique()` 相当于 `COUNT(DISTINCT genre)`"
 },
 {
  "title": "`pd.to_datetime(列, utc=True)` / `.dt.tz_convert(\"Asia/Shanghai\")`",
  "file": "python/04-pandas.md",
  "desc": "文本转时间，并标明是 UTC；再换算成北京时间",
  "says": [
   "字符串转时间",
   "UTC 转北京时间",
   "时区转换"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：`collected_at` 存的是 UTC，画图时换成北京时间"
 },
 {
  "title": "只保留完整的天",
  "file": "python/04-pandas.md",
  "desc": "按“游戏 + 日期”数行数，只留 24 行的那些天，再算日均",
  "says": [
   "数据不完整的天",
   "去掉首尾两天",
   "日均"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：`04_pre_trend.py`",
  "pit": "开始采集那天、今天都不满 24 小时，直接算日均会被少数几个小时带偏"
 },
 {
  "title": "`df.groupby(\"列\")[\"值\"].transform(\"mean\")`",
  "file": "python/04-pandas.md",
  "desc": "按组算一个值，再按原来的行数“摊回去”，可以直接和原列相除",
  "says": [
   "每组的平均值放回每一行",
   "组内归一化",
   "除以自己的均值"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：每款游戏的人数除以它自己的平均人数，不同量级的游戏才能放一起比",
  "pit": "`groupby().mean()` 会把每组压成一行，`transform` 保持原行数"
 },
 {
  "title": "`pivot` / `pivot_table`",
  "file": "python/04-pandas.md",
  "desc": "长表转宽表；`pivot_table` 可以顺便聚合（比如求平均）",
  "says": [
   "长表变宽表",
   "透视表",
   "一列一个游戏"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：03 按时间 × 游戏转宽表画曲线；04 用 `pivot_table` 算各组平均"
 },
 {
  "title": "`reindex(完整的索引)`",
  "file": "python/04-pandas.md",
  "desc": "按给定的索引重排，缺的位置补 NaN",
  "says": [
   "补齐时间轴",
   "对齐横轴"
  ],
  "cat": "pandas 处理表格",
  "proj": "Steam：每张子图都 reindex 到同一组时间点",
  "pit": "子图用 `sharex` 时，某组数据时间点少，横轴会被截断；reindex 补齐就好"
 },
 {
  "title": "`astype(int)` / `// 10 * 10`",
  "file": "python/04-pandas.md",
  "desc": "转类型；整除再乘回去，取到十位",
  "says": [
   "转成整数",
   "按年代分组",
   "1994 变 1990"
  ],
  "cat": "pandas 处理表格",
  "proj": "豆瓣：`df[\"year\"].astype(int) // 10 * 10`",
  "pit": "能直接 `astype(int)`，靠的是 `check.py` 保证了每个年份都是 4 位数字"
 },
 {
  "title": "`value_counts().sort_index()`",
  "file": "python/04-pandas.md",
  "desc": "数每个值出现几次，再按值本身排序",
  "says": [
   "每个年代几部",
   "频数统计",
   "计数"
  ],
  "cat": "pandas 处理表格",
  "proj": "豆瓣：各年代电影数"
 },
 {
  "title": "`fig, axes = plt.subplots(2, 2, sharex=True)` / `axes.flat`",
  "file": "python/05-matplotlib.md",
  "desc": "一张图里排 2×2 个子图，共用横轴；`axes.flat` 把它们摊平成一排，按编号取",
  "says": [
   "画多个子图",
   "子图排版",
   "共用横轴"
  ],
  "cat": "画图",
  "proj": "Steam：03 按游戏分组，一组一张子图"
 },
 {
  "title": "`ax.axis(\"off\")` / `ax.tick_params(labelbottom=True, which=\"both\")`",
  "file": "python/05-matplotlib.md",
  "desc": "隐藏一个坐标区；让坐标区底部显示刻度文字（主、次刻度都要）",
  "says": [
   "隐藏空子图",
   "子图没有横轴刻度",
   "显示刻度"
  ],
  "cat": "画图",
  "proj": "Steam：只有 3 组时第 4 块隐藏",
  "pit": "`sharex` 只让最下面一行显示刻度；最下面那块被隐藏后，它正上方的子图要自己打开刻度；pandas 画时间轴时有些标签在次刻度上，只开主刻度会漏"
 },
 {
  "title": "中文字体：`font_manager.fontManager.addfont(路径)` + `plt.rcParams[\"font.family\"]`",
  "file": "python/05-matplotlib.md",
  "desc": "注册一个字体文件，并设为默认字体",
  "says": [
   "中文显示成方框",
   "中文乱码",
   "设置字体"
  ],
  "cat": "画图",
  "proj": "Steam、豆瓣：本地准备的 SimHei 放在 `fonts/`",
  "pit": "字体文件不进 Git"
 },
 {
  "title": "`df.plot(ax=ax)` / `ax.axhline(y=1)`",
  "file": "python/05-matplotlib.md",
  "desc": "在指定子图上画折线；画一条水平参考线",
  "says": [
   "画折线图",
   "加参考线",
   "趋势图"
  ],
  "cat": "画图",
  "proj": "Steam：04 平行趋势图，y=1 表示等于自己的平均水平"
 },
 {
  "title": "`plot(kind=\"bar\")` / `ax.bar_label(ax.containers[0])`",
  "file": "python/05-matplotlib.md",
  "desc": "画柱状图；在每根柱子顶上标数值",
  "says": [
   "画柱状图",
   "柱子上标数字"
  ],
  "cat": "画图",
  "proj": "豆瓣：各年代电影数"
 },
 {
  "title": "`ax.set_xticklabels([...], rotation=0)`",
  "file": "python/05-matplotlib.md",
  "desc": "改横轴标签文字，`rotation=0` 横着放",
  "says": [
   "改横轴文字",
   "标签别竖着"
  ],
  "cat": "画图",
  "proj": "豆瓣：横轴写成 `1930s` 这种",
  "pit": "柱状图默认把横轴标签转 90 度竖起来"
 },
 {
  "title": "`savefig(路径)`",
  "file": "python/05-matplotlib.md",
  "desc": "保存成图片文件",
  "says": [
   "保存图片",
   "导出图表"
  ],
  "cat": "画图",
  "proj": "Steam、豆瓣：存到 `analysis/output/`",
  "pit": "输出目录不进 Git；先 `mkdir(exist_ok=True)`"
 },
 {
  "title": "PowerShell 里的 `ssh` / `scp`",
  "file": "windows/01-powershell.md",
  "desc": "Windows 自带 OpenSSH，用法和 Linux 一样",
  "says": [
   "Windows 连服务器",
   "Windows 传文件到虚拟机",
   "下载备份"
  ],
  "cat": "Windows 命令",
  "proj": "Steam：从服务器下载备份到 D 盘，再从 D 盘传到虚拟机",
  "pit": "打开的是 **Windows PowerShell (x86)** 时找不到 scp，32 位程序访问 System32 会被重定向到 SysWOW64，那里没有 OpenSSH；`[Environment]::Is64BitProcess` 可以确认，换成不带 (x86) 的那个"
 },
 {
  "title": "`$LASTEXITCODE`",
  "file": "windows/01-powershell.md",
  "desc": "上一个外部程序的退出码",
  "says": [
   "scp 成功没有",
   "看退出码"
  ],
  "cat": "Windows 命令",
  "proj": "Steam：`pull.ps1` 把它写进 `pull.log`"
 },
 {
  "title": "`Get-Date -Format \"yyyy-MM-dd HH:mm:ss\"` / `Add-Content 文件 \"内容\"`",
  "file": "windows/01-powershell.md",
  "desc": "取当前时间；往文件末尾追加一行",
  "says": [
   "记录时间",
   "追加日志"
  ],
  "cat": "Windows 命令",
  "proj": "Steam：`Add-Content pull.log \"$time exit=$LASTEXITCODE\"`",
  "pit": "变量以 `$` 开头；双引号里的 `$变量` 会被替换，和 f-string 一个意思"
 },
 {
  "title": "`type 文件` / `dir 目录` / `notepad 文件`",
  "file": "windows/01-powershell.md",
  "desc": "看文件内容；列目录；用记事本打开编辑",
  "says": [
   "看文件",
   "列文件",
   "编辑脚本"
  ],
  "cat": "Windows 命令",
  "proj": "Steam：`type pull.log` 看运行记录；`notepad pull.ps1` 改脚本"
 },
 {
  "title": "`powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File 脚本.ps1`",
  "file": "windows/01-powershell.md",
  "desc": "新开一个 PowerShell 运行脚本，只对这一次放行脚本，不弹窗口",
  "says": [
   "运行 ps1 脚本",
   "脚本被禁止运行",
   "后台运行脚本"
  ],
  "cat": "Windows 命令",
  "proj": "Steam：任务计划里填的就是这一条",
  "pit": "另一个办法 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` 会改系统设置，以后所有本地脚本都放行；只放行这一次更稳"
 },
 {
  "title": "`netsh advfirewall set allprofiles state off` / `on`",
  "file": "windows/01-powershell.md",
  "desc": "关闭 / 打开 Windows 防火墙（要管理员 PowerShell）",
  "says": [
   "关防火墙",
   "虚拟机连不上宿主机"
  ],
  "cat": "Windows 命令",
  "proj": "练习：虚拟机连宿主机上的代理一直超时，关掉防火墙就通了",
  "pit": "先用 curl 测，确认是防火墙的问题再关"
 },
 {
  "title": "`curl.exe -x 代理 网址 -I`",
  "file": "windows/01-powershell.md",
  "desc": "在 Windows 本机测代理端口通不通",
  "says": [
   "Windows 上测代理",
   "代理本身好不好"
  ],
  "cat": "Windows 命令",
  "proj": "练习：Windows 本机通、虚拟机不通，说明是“局域网连接”或防火墙的问题",
  "pit": "PowerShell 里 `curl` 是别的命令的别名，要写 `curl.exe`"
 },
 {
  "title": "`taskschd.msc` → 创建任务",
  "file": "windows/01-powershell.md",
  "desc": "Windows 版的 cron，定时运行程序",
  "says": [
   "Windows 定时任务",
   "每天自动运行",
   "开机补跑"
  ],
  "cat": "任务计划",
  "proj": "Steam：任务 `steam-backup-pull`，每天 12:00 运行 `pull.ps1`",
  "pit": "选“创建任务”，不选“创建基本任务”，后者少了几个要用的设置"
 },
 {
  "title": "`scp -o BatchMode=yes` 用在后台任务里",
  "file": "windows/01-powershell.md",
  "desc": "需要输密码时直接失败，不卡住",
  "says": [
   "后台 scp 卡住",
   "无人值守下载"
  ],
  "cat": "任务计划",
  "proj": "Steam：`pull.ps1` 全量下载 `steam-*.db`，加 `-p` 保留时间、`-q` 不显示进度条",
  "pit": "BatchMode 下要密码时直接失败，退出码 255，从 `pull.log` 里一眼能看出来"
 }
];
window.CATEGORIES = ["看文件", "磁盘空间", "查系统信息", "改文件内容", "写脚本", "定时任务", "服务和日志", "查进程和端口", "测网络连通", "远程登录和传文件", "Git 日常", "Git 分支和远程", "容器操作", "构建镜像", "Compose 编排", "SQL 查询", "SQL 改数据", "建表和约束", "SQLite", "Python 环境", "Python 写脚本", "爬网页", "Python 连数据库", "pandas 处理表格", "画图", "Windows 命令", "任务计划"];
