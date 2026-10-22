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
