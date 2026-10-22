# Docker Compose

Compose 文件里的每一项，几乎都对应 `docker run` 的一个参数：

| docker run | Compose |
|---|---|
| 镜像名 | `image: mysql:8.0` |
| `docker build` | `build: .` |
| `-e KEY=VAL` | `environment:` |
| `-p 宿主:容器` | `ports:` |
| `-v 宿主:容器` | `volumes:` |
| 启动顺序 | `depends_on:` |
| 启动命令 | `command:` |

| 在哪连数据库 | 地址 |
|---|---|
| Compose 里的其他容器 | 服务名 `db`、容器端口 |
| 宿主机上的脚本 | `localhost`、映射出来的宿主端口 |

---

## 字段

### `image:` / `build: .`

- 作用：`image` 用现成镜像；`build: .` 用当前目录的 Dockerfile 现场构建
- 说法：用现成镜像还是自己构建；Compose 里 build
- 分类：Compose 编排
- 项目：豆瓣：`db` 用 `mysql:8.0`，`spider` 用 `build: .`
- 坑：`image` 拼成 `iamge`，报 `Additional property ... is not allowed`；YAML 缩进只能用空格

### `environment:` + `${变量}` + `.env`

- 作用：给容器传环境变量；`${变量}` 从同目录的 `.env` 里取值
- 说法：传密码给容器；密码不写在配置里；环境变量
- 分类：Compose 编排
- 项目：豆瓣：数据库密码从所有源文件里移到 `.env`，Compose 和 Python 都从环境变量读
- 坑：`.env` 进 `.gitignore`，另外提交一份不含真实密码的 `.env.example`

### `volumes:`（命名卷）

- 作用：把数据存在 Docker 管理的卷里，容器删了数据还在
- 说法：数据持久化；数据库数据存哪；容器删了数据别丢
- 分类：Compose 编排
- 项目：豆瓣：MySQL 的数据目录
- 坑：顶层也要声明这个卷，漏了会报错

### `ports:`

- 作用：端口映射，写法和 `-p` 一样
- 说法：映射端口；从外面访问容器
- 分类：Compose 编排
- 项目：豆瓣：只给 `db` 映射，Navicat 和宿主机脚本要连；`spider` 不需要对外，就不写
- 坑：宿主端口被别的容器或程序占着就起不来

### `depends_on:`

- 作用：控制启动顺序，先起被依赖的服务
- 说法：先启动数据库；启动顺序
- 分类：Compose 编排
- 项目：豆瓣：`spider` 依赖 `db`
- 坑：只保证先**启动**，不保证 MySQL 已经**就绪**；爬虫里用 `for ... else` 加连接重试

### `restart: unless-stopped`

- 作用：除非手动停止，否则容器退出或机器重启后自动拉起
- 说法：开机自启；虚拟机重启后数据库没了；自动重启
- 分类：Compose 编排
- 项目：豆瓣：只给 `db` 加
- 坑：不要给 `spider` 加，爬完正常退出也会被拉起来，反复重爬

### `command:`

- 作用：覆盖镜像默认的启动命令，常用来加启动参数
- 说法：改启动参数；MySQL 认证方式
- 分类：Compose 编排
- 项目：豆瓣：给 MySQL 设置认证方式，让 Python 3.6 的 pymysql 能连上

### 服务名通信

- 作用：Compose 给这组容器建一个网络，容器之间用服务名当地址
- 说法：容器之间怎么连；连数据库填什么地址；不用写 IP
- 分类：Compose 编排
- 项目：豆瓣：爬虫容器里连 `db`；宿主机上的 `split_tables.py` 连 `localhost` 加映射端口
- 坑：两种地址别混，容器里的 `localhost` 是容器自己

---

## 命令

### `docker-compose config`

- 作用：检查 YAML 语法，打印展开后的完整配置
- 说法：检查 compose 文件；配置写对没有；看变量替换结果
- 分类：Compose 编排
- 项目：豆瓣
- 坑：Docker 20.10 不带 compose 插件，Compose v2 是单独装的二进制，命令是带横线的 `docker-compose`

### `docker-compose up -d` / `up -d 服务`

- 作用：后台启动全部服务，或只启动某一个
- 说法：一键启动；只起数据库；后台运行
- 分类：Compose 编排
- 项目：豆瓣：`run_all.sh` 第一步 `docker-compose up -d db`

### `docker-compose run --rm 服务 [命令]`

- 作用：临时跑一次某个服务，跑完删掉容器；后面可以换成别的命令
- 说法：跑一次爬虫；临时运行；看镜像里有哪些文件
- 分类：Compose 编排
- 项目：豆瓣：`run_all.sh` 里 `docker-compose run --rm spider`；`docker-compose run --rm spider ls -la` 确认 `.env` 没进镜像
- 坑：`run` 把容器的退出码原样返回，`set -e` 能接住；`up` 不会，脚本里要用 `run`

### `docker-compose build 服务`

- 作用：重新构建某个服务的镜像
- 说法：改了代码重新打包；重新 build
- 分类：Compose 编排
- 项目：豆瓣：改了 `spider.py` 后先 build 再提交

### `docker-compose ps` / `logs` / `down`

- 作用：看状态 / 看日志 / 停止并删除容器和网络
- 说法：看服务状态；一键停止；全部关掉
- 分类：Compose 编排
- 项目：练习、豆瓣
- 坑：`down` 默认保留数据卷，`down -v` 才连卷一起删
