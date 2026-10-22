# matplotlib 画图

---

### `fig, axes = plt.subplots(2, 2, sharex=True)` / `axes.flat`

- 作用：一张图里排 2×2 个子图，共用横轴；`axes.flat` 把它们摊平成一排，按编号取
- 说法：画多个子图；子图排版；共用横轴
- 分类：画图
- 项目：Steam：03 按游戏分组，一组一张子图

### `ax.axis("off")` / `ax.tick_params(labelbottom=True, which="both")`

- 作用：隐藏一个坐标区；让坐标区底部显示刻度文字（主、次刻度都要）
- 说法：隐藏空子图；子图没有横轴刻度；显示刻度
- 分类：画图
- 项目：Steam：只有 3 组时第 4 块隐藏
- 坑：`sharex` 只让最下面一行显示刻度；最下面那块被隐藏后，它正上方的子图要自己打开刻度；pandas 画时间轴时有些标签在次刻度上，只开主刻度会漏

### 中文字体：`font_manager.fontManager.addfont(路径)` + `plt.rcParams["font.family"]`

- 作用：注册一个字体文件，并设为默认字体
- 说法：中文显示成方框；中文乱码；设置字体
- 分类：画图
- 项目：Steam、豆瓣：本地准备的 SimHei 放在 `fonts/`
- 坑：字体文件不进 Git

### `df.plot(ax=ax)` / `ax.axhline(y=1)`

- 作用：在指定子图上画折线；画一条水平参考线
- 说法：画折线图；加参考线；趋势图
- 分类：画图
- 项目：Steam：04 平行趋势图，y=1 表示等于自己的平均水平

### `plot(kind="bar")` / `ax.bar_label(ax.containers[0])`

- 作用：画柱状图；在每根柱子顶上标数值
- 说法：画柱状图；柱子上标数字
- 分类：画图
- 项目：豆瓣：各年代电影数

### `ax.set_xticklabels([...], rotation=0)`

- 作用：改横轴标签文字，`rotation=0` 横着放
- 说法：改横轴文字；标签别竖着
- 分类：画图
- 项目：豆瓣：横轴写成 `1930s` 这种
- 坑：柱状图默认把横轴标签转 90 度竖起来

### `savefig(路径)`

- 作用：保存成图片文件
- 说法：保存图片；导出图表
- 分类：画图
- 项目：Steam、豆瓣：存到 `analysis/output/`
- 坑：输出目录不进 Git；先 `mkdir(exist_ok=True)`
