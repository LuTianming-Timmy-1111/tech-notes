# Dockerfile、.dockerignore

| 指令 | 作用 | 类比 |
|---|---|---|
| `FROM` | 基础镜像 | 用什么底料起锅 |
| `WORKDIR` | 镜像里的工作目录 | 在哪块案板上操作 |
| `COPY` | 把宿主机文件复制进镜像 | 把食材放进锅 |
| `RUN` | **构建时**执行，比如装依赖 | 烹饪过程 |
| `EXPOSE` | 声明端口，只是说明 | 标注配什么餐具 |
| `CMD` | **容器启动时**执行 | 上桌时怎么吃 |

---

### Dockerfile 基本写法

- 作用：写镜像的“菜谱”：`FROM` → `WORKDIR` → `COPY requirements.txt .` → `RUN pip install -r requirements.txt` → `COPY 代码 .` → `CMD ["python", "xxx.py"]`
- 说法：打包自己的程序；写 Dockerfile；做镜像
- 分类：构建镜像
- 项目：练习：Flask 小服务打包成 `myapp:1.0`；豆瓣：爬虫镜像
- 坑：`CMD` 里的文件名照抄模板没改（还是 `app.py`），容器一启动就找不到文件

### `RUN` vs `CMD`

- 作用：`RUN` 在构建镜像时执行，结果存进镜像；`CMD` 在容器启动时执行
- 说法：RUN 和 CMD 区别；装依赖用哪个；启动命令写哪
- 分类：构建镜像
- 项目：练习：`RUN pip install`、`CMD ["python", "app.py"]`

### 先 COPY 依赖文件，再 COPY 代码

- 作用：利用构建缓存：只改代码时，装依赖那一层直接复用
- 说法：构建太慢；每次都重装依赖；缓存
- 分类：构建镜像
- 项目：练习、豆瓣
- 坑：把不常变的（依赖）放前面，常变的（代码）放后面

### 镜像分层

- 作用：每条指令生成一层，镜像是一摞只读层；相同的底层可以共享
- 说法：镜像为什么这么大；分层；层缓存
- 分类：构建镜像
- 项目：练习：myapp 只比 `python:3.9-slim` 大 12MB

### `docker build -t 名字:标签 .`

- 作用：按当前目录的 Dockerfile 构建镜像
- 说法：构建镜像；打包镜像；build
- 分类：构建镜像
- 项目：练习：`docker build -t myapp:1.0 .`
- 坑：最后的 `.` 是构建上下文（当前目录），漏了会报错

### `.dockerignore`

- 作用：构建时 Docker 会先把整个目录（构建上下文）打包发给引擎，`.dockerignore` 决定哪些不发
- 说法：构建时排除文件；不要把 .env 打进镜像；构建上下文太大
- 分类：构建镜像
- 项目：豆瓣：`.env`、测试脚本、`venv/`（249M）
- 坑：Dockerfile 是逐个 COPY 文件时，`.env` 本来就进不了镜像；`.dockerignore` 防的是以后改成 `COPY . .`，以及缩小构建上下文
