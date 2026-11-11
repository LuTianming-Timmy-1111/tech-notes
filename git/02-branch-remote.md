# Git 分支和远程

分支流程：

| 步骤 | 命令 |
|---|---|
| 开分支 | `git checkout -b 分支名` |
| 在分支上改、提交 | `git add`、`git commit` |
| 回主分支 | `git checkout master` |
| 合并 | `git merge 分支名` |
| 推送 | `git push` |
| 删分支 | `git branch -d 分支名` |

| 开发流程（Steam） | 在哪 |
|---|---|
| 写代码、测试、提交、push | 虚拟机 |
| 存代码 | GitHub |
| `git pull` 后运行 | 服务器（不改代码） |

---

## 分支

### `git checkout -b 分支名`

- 作用：新建分支并切过去
- 说法：开新分支；新功能单独开发；不影响主线
- 分类：Git 分支和远程
- 项目：豆瓣：`recommend`、`director`、`schema`、`readme`、`quality`、`charts` 都是这样开的

### `git checkout master`

- 作用：切回主分支
- 说法：切换分支；回到主线
- 分类：Git 分支和远程
- 项目：豆瓣：每个功能做完先切回 master 再合并

### `git merge 分支名`

- 作用：把指定分支的提交合并进当前分支
- 说法：合并分支；把功能并回主线
- 分类：Git 分支和远程
- 项目：豆瓣：`quality` 合并回 master 时是 Fast-forward
- 坑：开分支后 master 上没有新提交时，合并只是把指针往前挪（Fast-forward），不会生成新的合并提交

### `git branch -d 分支名`

- 作用：删除已经合并的分支
- 说法：删分支；清理用完的分支
- 分类：Git 分支和远程
- 项目：豆瓣：合并、推送后删掉

---

## 远程

### `git remote add origin 地址` / `git remote set-url origin 新地址`

- 作用：添加远程仓库地址；地址变了用 `set-url` 改
- 说法：关联 GitHub；添加远程仓库；改远程地址
- 分类：Git 分支和远程
- 项目：练习：GitHub 改了用户名后，旧仓库要 `set-url` 换成新地址

### `git push -u origin master` / `git push`

- 作用：把本地提交推到 GitHub；第一次加 `-u` 记住对应关系，之后直接 `git push`
- 说法：推送到 GitHub；上传代码；同步到远程
- 分类：Git 分支和远程
- 项目：全程；https 推送时用户名照填，密码填 token
- 坑：虚拟机推 GitHub 要给 Git 配代理；curl 不读 Git 的代理配置，两者分开

### `git clone 地址`

- 作用：把远程仓库完整下载到本地
- 说法：下载仓库；拉一份代码；部署到服务器
- 分类：Git 分支和远程
- 项目：Steam：服务器 clone 公开仓库，不用认证；tech-notes：clone 到虚拟机
- 坑：在 GitHub 建仓库时勾上 Add README，clone 下来就有一次提交和分支，不是空仓库

### `git pull`

- 作用：把远程的新提交拉下来
- 说法：更新代码；同步最新版本；服务器拉代码
- 分类：Git 分支和远程
- 项目：Steam：虚拟机 push 后，服务器 `git pull`；`data/`、`logs/`、`venv/` 被忽略，不受影响

### `git branch -D 分支名`

- 作用：**强制**删除分支，不管有没有合并；未合并的提交之后很难找回。平时用 `-d`（未合并会拒绝），确定要放弃一个分支时才用 `-D`
- 说法：强制删分支；放弃这个分支；删没合并的分支
- 分类：Git 分支和远程
- 项目：豆瓣：`charts` 合并后用的是 `-d`

### `git push origin --delete 分支名`

- 作用：删掉 GitHub 上的远程分支；只删“分支”这个标签，已合并的提交都在 master 里
- 说法：删除远程分支；GitHub 上的分支不要了
- 分类：Git 分支和远程
- 项目：豆瓣：`charts` 推上去做过备份，合并进 master 后删掉

### 主分支叫 `main` 还是 `master`

- 作用：新版 Git 和 GitHub 默认叫 `main`，老版本 Git 默认叫 `master`，不同仓库可能不一样；不确定就 `git branch` 看。在分支 A 上 `git merge A` 会显示 `Already up-to-date`，什么都没发生
- 说法：checkout master 报错；pathspec did not match；主分支叫什么
- 分类：Git 分支和远程
- 项目：Steam 是 `main`，豆瓣、dotfiles 是 `master`；`git checkout master` 报 `pathspec 'master' did not match`
