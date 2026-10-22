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
