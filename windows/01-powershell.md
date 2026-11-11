# Windows：PowerShell、任务计划程序

| Linux | PowerShell |
|---|---|
| `cat` | `type` |
| `ls` | `dir` |
| `>>` | `Add-Content 文件 "内容"` |
| `$?` | `$LASTEXITCODE`（外部程序的退出码） |
| cron | 任务计划程序 |

| scp 退出码 | 意思 |
|---|---|
| 0 | 成功 |
| 1 | scp 自己失败，比如找不到文件 |
| 255 | 底层 ssh 连接或登录失败 |

---

## PowerShell

### PowerShell 里的 `ssh` / `scp`

- 作用：Windows 自带 OpenSSH，用法和 Linux 一样
- 说法：Windows 连服务器；Windows 传文件到虚拟机；下载备份
- 分类：Windows 命令
- 项目：Steam：从服务器下载备份到 D 盘，再从 D 盘传到虚拟机
- 坑：打开的是 **Windows PowerShell (x86)** 时找不到 scp，32 位程序访问 System32 会被重定向到 SysWOW64，那里没有 OpenSSH；`[Environment]::Is64BitProcess` 可以确认，换成不带 (x86) 的那个

### `$LASTEXITCODE`

- 作用：上一个外部程序的退出码
- 说法：scp 成功没有；看退出码
- 分类：Windows 命令
- 项目：Steam：`pull.ps1` 把它写进 `pull.log`

### `Get-Date -Format "yyyy-MM-dd HH:mm:ss"` / `Add-Content 文件 "内容"`

- 作用：取当前时间；往文件末尾追加一行
- 说法：记录时间；追加日志
- 分类：Windows 命令
- 项目：Steam：`Add-Content pull.log "$time exit=$LASTEXITCODE"`
- 坑：变量以 `$` 开头；双引号里的 `$变量` 会被替换，和 f-string 一个意思

### `type 文件` / `dir 目录` / `notepad 文件`

- 作用：看文件内容；列目录；用记事本打开编辑
- 说法：看文件；列文件；编辑脚本
- 分类：Windows 命令
- 项目：Steam：`type pull.log` 看运行记录；`notepad pull.ps1` 改脚本

### `powershell -ExecutionPolicy Bypass -WindowStyle Hidden -File 脚本.ps1`

- 作用：新开一个 PowerShell 运行脚本，只对这一次放行脚本，不弹窗口
- 说法：运行 ps1 脚本；脚本被禁止运行；后台运行脚本
- 分类：Windows 命令
- 项目：Steam：任务计划里填的就是这一条
- 坑：另一个办法 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` 会改系统设置，以后所有本地脚本都放行；只放行这一次更稳

### `netsh advfirewall set allprofiles state off` / `on`

- 作用：关闭 / 打开 Windows 防火墙（要管理员 PowerShell）
- 说法：关防火墙；虚拟机连不上宿主机
- 分类：Windows 命令
- 项目：练习：虚拟机连宿主机上的代理一直超时，关掉防火墙就通了
- 坑：先用 curl 测，确认是防火墙的问题再关

### `curl.exe -x 代理 网址 -I`

- 作用：在 Windows 本机测代理端口通不通
- 说法：Windows 上测代理；代理本身好不好
- 分类：Windows 命令
- 项目：练习：Windows 本机通、虚拟机不通，说明是“局域网连接”或防火墙的问题
- 坑：PowerShell 里 `curl` 是别的命令的别名，要写 `curl.exe`

---

## 任务计划程序

### `taskschd.msc` → 创建任务

- 作用：Windows 版的 cron，定时运行程序
- 说法：Windows 定时任务；每天自动运行；开机补跑
- 分类：任务计划
- 项目：Steam：任务 `steam-backup-pull`，每天 12:00 运行 `pull.ps1`
- 坑：选“创建任务”，不选“创建基本任务”，后者少了几个要用的设置

| 设置 | 选什么 | 为什么 |
|---|---|---|
| 安全选项 | 只在用户登录时运行 | 以你的身份运行才找得到你的私钥，也不用把 Windows 密码存进任务 |
| 触发器 | 每天 12:00 | |
| 操作 | 程序填 `powershell.exe`，参数填 `-ExecutionPolicy Bypass -WindowStyle Hidden -File 脚本路径` | 默认启动 64 位 PowerShell |
| 设置 | 错过计划时间后尽快启动 | 中午没开机，开机后补跑 |
| 设置 | 运行超时就停止 | 万一卡住不会一直挂着 |

### `scp -o BatchMode=yes` 用在后台任务里

- 作用：需要输密码时直接失败，不卡住
- 说法：后台 scp 卡住；无人值守下载
- 分类：任务计划
- 项目：Steam：`pull.ps1` 全量下载 `steam-*.db`，加 `-p` 保留时间、`-q` 不显示进度条
- 坑：BatchMode 下要密码时直接失败，退出码 255，从 `pull.log` 里一眼能看出来

### `Get-ChildItem 路径 -Recurse -Filter 名字`

- 作用：递归找文件；`-Directory` 只找文件夹；`-ErrorAction SilentlyContinue` 跳过读不了的（只在确定无所谓时用）
- 说法：在 Windows 上找文件；搜文件夹；find 的 PowerShell 版
- 分类：Windows 命令
- 项目：小肥鱼：在 `D:\Coopanion` 下找 `sticker-index.json`、扩展的包目录、NapCat 日志目录

### `Select-String -Pattern "A|B"`

- 作用：在文件**内容**里搜，PowerShell 版 `grep`；默认**不区分大小写**；`-Context 前,后` 看上下文，`-List` 每个文件只报第一处；接在 `Get-ChildItem -Recurse` 后面可以搜整个目录
- 说法：在文件里搜内容；PowerShell grep；查代码里有没有某个词
- 分类：Windows 命令
- 项目：小肥鱼：在 QQ 扩展源码里搜 `sticker-index`，找到表情包目录的配置方式

### `ForEach-Object { $_... }`

- 作用：对管道里每个结果执行一段代码，`$_` 是当前这一个；常用来改输出格式，比如去掉长路径前缀
- 说法：对每个结果处理；PowerShell 循环；简化输出
- 分类：Windows 命令
- 项目：`ForEach-Object { $_.Path.Replace($qf, "") + " : " + $_.LineNumber }`

### `$f = (Get-ChildItem ... | Select-Object -Last 1).FullName`

- 作用：取最新的那个文件的完整路径存进变量，下一行直接用，不用手抄文件名
- 说法：最新的文件；传最新备份；变量存路径
- 分类：Windows 命令
- 项目：Steam：`scp $f root@虚拟机:/root/steam-tracker/backups/`

### `Test-Path` / `New-Item -ItemType Directory`

- 作用：判断路径存不存在（True/False）；新建文件夹，逗号隔开可以一次建多个
- 说法：文件在不在；新建文件夹
- 分类：Windows 命令
- 项目：小肥鱼：确认 Chrome 装在默认位置；建 `D:\coo-stickers`、`D:\coo-images`

### `Test-NetConnection 主机 -Port 端口`

- 作用：测某个端口通不通，看最后一行 `TcpTestSucceeded`
- 说法：端口通不通；ssh 连不上排查；telnet 的替代
- 分类：Windows 命令
- 项目：虚拟机连不上时：ping 通、22 端口通，最后发现是刚重启

### `curl` 和 `curl.exe`

- 作用：PowerShell 里单写 `curl` 是 `Invoke-WebRequest` 的别名，参数完全不同；要用真正的 curl 必须带 `.exe`
- 说法：PowerShell curl 报错；curl 参数不认
- 分类：Windows 命令
- 项目：Steam：在 Windows 上测评论接口

### `& "带空格的路径\程序.exe" 参数`

- 作用：运行路径里有空格的程序，前面要加 `&`
- 说法：运行带空格路径的程序；Program Files 里的程序
- 分类：Windows 命令
- 项目：`& "C:\Program Files (x86)\VMware\VMware Workstation\vmrun.exe" list` 看虚拟机是否在运行

### `Get-Process 名字 | Where-Object Path -like "*关键词*" | Stop-Process`

- 作用：按路径筛选进程再结束，只关特定位置的那个，不误伤同名程序
- 说法：结束进程；杀掉残留进程；只关某个路径下的程序
- 分类：Windows 命令
- 项目：小肥鱼：关掉 NapCat 黑窗口后 QQ 进程残留，导致“已登录，无法重复登录”；只关 NapCat 的 QQ，不动平时登大号的 QQ

### 两个时区的时间相减：先都转 UTC

- 作用：`[TimeZoneInfo]::ConvertTimeToUtc($t, [TimeZoneInfo]::FindSystemTimeZoneById("China Standard Time"))` 和 `(Get-Date).ToUniversalTime()` 再相减；`Get-Date -Format "... zzz"` 时间戳自带时区
- 说法：时区不同时间差；改了系统时区；北京时间转 UTC
- 分类：Windows 命令
- 项目：Steam：电脑改成纽约时区后，`pull.ps1` 拿北京时间的日志直接和本地时间相减会差 13 小时、每小时误报

### `Get-ScheduledTask` / `Start-ScheduledTask` / `Get-ScheduledTaskInfo`

- 作用：查看任务的操作（`.Actions`）、手动触发、看上次运行时间和结果码。经 `wscript` 启动的任务，`LastTaskResult` 是 wscript 的退出码，永远是 0，成功与否要看脚本自己的日志
- 说法：任务计划用什么启动；手动运行任务；任务上次结果
- 分类：任务计划
- 项目：Steam：`steam-backup-pull` 改成 `wscript.exe` + `run-hidden.vbs` 启动后不再闪窗口，以 `pull.log` 为准
