# 定时任务、服务、日志

cron 时间格式：

| 分 | 时 | 日 | 月 | 星期 | 例子 |
|---|---|---|---|---|---|
| `5,35` | `*` | `*` | `*` | `*` | 每小时第 5、35 分钟 |
| `20` | `4` | `*` | `*` | `*` | 每天 4:20 |

cron 运行脚本的三个坑：

| 坑 | 解决 |
|---|---|
| 没激活 venv | 直接写 `venv/bin/python` |
| 当前目录不对 | 脚本里 `cd "$(dirname "$0")"`，Python 里路径基于 `__file__` |
| 输出没地方去 | `>> logs/xxx.log 2>&1` + logging |

---

## 定时任务

### `crontab -e` / `crontab -l`

- 作用：`-e` 编辑当前用户的定时任务，`-l` 列出来
- 说法：加定时任务；每小时自动跑；看有哪些定时任务
- 分类：定时任务
- 项目：Steam：`5,35 * * * * .../run_collect.sh` 采集，`20 4 * * * .../run_backup.sh` 备份
- 坑：第一次 `crontab -e` 会让选编辑器，选 vim；看任务时用 `crontab -l | grep -v "^#"` 去掉注释

### cron 时间字段 `分 时 日 月 星期`

- 作用：五个字段决定什么时候跑，`*` 是“每个”，逗号列出多个值
- 说法：每小时跑一次；每天几点跑；定时规则怎么写
- 分类：定时任务
- 项目：Steam：`:35` 那次是补跑，`:05` 成功的话 `:35` 写入 0 条；备份放在凌晨，避开采集时间
- 坑：按**服务器时区**看钟；脚本路径写绝对路径

---

## 服务

### `systemctl daemon-reload` + `systemctl restart 服务`

- 作用：改了服务的配置文件后，先让 systemd 重新读配置，再重启服务生效
- 说法：重启服务；改完配置不生效；让配置生效
- 分类：服务和日志
- 项目：练习：改 Docker 镜像源、Docker 代理后 `systemctl restart docker`

### `systemctl restart ssh.socket`

- 作用：Ubuntu 24.04 的 SSH 由 socket 监听端口，改端口后要重启它
- 说法：SSH 改端口不生效；重启 SSH
- 分类：服务和日志
- 项目：Steam：服务器加 SSH 端口、后来关掉 22 端口
- 坑：只重启 ssh 服务不够，要 `daemon-reload` 再重启 `ssh.socket`

### `systemctl list-timers 定时器`

- 作用：看 systemd 定时器下次、上次什么时候运行
- 说法：logrotate 什么时候跑；看系统定时任务
- 分类：服务和日志
- 项目：Steam：`systemctl list-timers logrotate.timer`，每天 0 点运行

### `apt upgrade` + `reboot`

- 作用：更新系统软件包，重启
- 说法：系统更新；装补丁；重启服务器
- 分类：服务和日志
- 项目：Steam：登录提示有一堆更新和 “restart required”，更新重启后顺便验证 cron 开机自启

---

## 日志

### `journalctl -u 服务 --since "时间" --no-pager`

- 作用：看 systemd 记录的某个服务的日志；`-u` 指定服务，`--no-pager` 直接打印不翻页
- 说法：cron 到底跑没跑；看系统日志；查服务记录
- 分类：服务和日志
- 项目：Steam：`journalctl -u cron --since "20:00" --no-pager` 看到 cron 准时调用了 `run_collect.sh`
- 坑：脚本日志是脚本自己说“我跑了”，journalctl 是系统说“我调用了”，两边对上才算确认

### logrotate 配置 `/etc/logrotate.d/项目名`

- 作用：让系统定期轮转日志：改名、压缩、删最旧的
- 说法：日志太大；日志按月切分；自动清理旧日志
- 分类：服务和日志
- 项目：Steam：`logs/*.log` 配了 `monthly`、`rotate 12`、`compress`、`missingok`、`notifempty`
- 坑：路径要写绝对路径；参考 `/etc/logrotate.d/apt` 这类现成配置最稳

| 规则 | 意思 |
|---|---|
| `monthly` | 每月轮转（还有 `daily`、`weekly`） |
| `rotate 12` | 保留 12 份旧的 |
| `compress` | 旧的压缩成 `.gz` |
| `missingok` | 文件不存在不报错 |
| `notifempty` | 空文件不轮转 |

轮转后 `.1.gz` 是最近一期，数字越大越旧。脚本用 `>>` 写日志，轮转后会自动新建 `collect.log`。

### `logrotate -d 配置文件`

- 作用：演习模式，说一遍要做什么，但不真正执行，也不写记录
- 说法：测试 logrotate 配置；预演；配置写对没有
- 分类：服务和日志
- 项目：Steam：写完配置先演习，看到 `log does not need rotating`

### `/var/lib/logrotate/status`

- 作用：logrotate 记录每个文件上次什么时候轮转过
- 说法：logrotate 跑过没有；上次轮转时间
- 分类：服务和日志
- 项目：Steam：`grep steam /var/lib/logrotate/status` 确认两个日志都有了记录

### `nohup 命令 > /dev/null 2>&1 &` 与 `$!`

- 作用：`nohup` 忽略挂断信号，关掉终端或断网后命令继续跑；`&` 放到后台；`$!` 是刚放到后台的进程号。输出已在脚本里写进日志时，用 `> /dev/null` 扔掉，避免生成 `nohup.out`
- 说法：后台运行；关掉终端也继续跑；长任务挂后台；拿后台进程号
- 分类：查进程和端口
- 项目：Steam：补历史要跑四五十分钟，`nohup ./run_reviews.sh backfill 800 > /dev/null 2>&1 &`；结束时终端显示 `Done`（正常）或 `Exit 1`（出错）

### `ps -p 进程号`

- 作用：看某个进程还在不在
- 说法：后台任务还在跑吗；查某个进程；进程活着没
- 分类：查进程和端口
- 项目：Steam：确认后台补历史还在运行

### `journalctl -u cron --since "时间"`

- 作用：看 cron 服务自己的记录：某个任务有没有被启动。脚本出错没写日志时，也能看到它被调用过
- 说法：cron 到底跑了没；定时任务有没有执行；看系统服务日志
- 分类：服务和日志
- 项目：Steam：新加 `:25` 评论增量后，用它确认 cron 确实调用了 `run_reviews.sh`

### `logrotate -d 配置文件`

- 作用：调试模式，打印“如果现在轮转会怎么做”，不动任何文件；输出里有 `considering log 路径` 说明管到了
- 说法：检查日志轮转配置；试运行 logrotate；日志会不会被轮转
- 分类：服务和日志
- 项目：Steam：确认 `logs/*.log` 通配符会自动管到新增的 `reviews.log`

### cron 时间错开

- 作用：多个定时任务写同一个 SQLite 库时，错开分钟，避免同时写入撞锁
- 说法：定时任务冲突；cron 安排时间；避免同时跑
- 分类：定时任务
- 项目：Steam：采集 `:05/:35`、健康检查 `:15/:45`、评论增量 `:25`、备份 `04:20`

### `date -d @时间戳` / `date -u`

- 作用：把 Unix 时间戳换算成可读时间；`-u` 按 UTC 显示，不加按本机时区
- 说法：时间戳转日期；时间戳是几点；看 UTC 时间
- 分类：查系统信息
- 项目：Steam：评论的 `created` 是时间戳，`date -d @1793763875` 得到 11/04 11:44（北京时间）

### `sysctl 参数名`

- 作用：查看或修改内核参数；`sysctl -w` 只改运行中的值，重启后恢复，要永久生效写进 `/etc/sysctl.conf`
- 说法：查内核参数；IP 转发开没开；容器不能联网
- 分类：查系统信息
- 项目：虚拟机：`sysctl net.ipv4.ip_forward` 为 0 时容器连不了网；Docker 启动时会把它设成 1，`systemctl restart docker` 通常能恢复
