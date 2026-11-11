# pandas 处理表格

| 长表 | 宽表 |
|---|---|
| 一行一条记录：游戏、时间、人数 | 一行一个时间点，一列一款游戏 |
| 适合分组计算 | 适合画多条线 |
| 宽表 → 长表、长表 → 宽表用 `pivot` | |

---

## 读进来、先看看

### `pd.read_sql(sql, 连接)`

- 作用：执行 SQL，结果直接变成 DataFrame
- 说法：从数据库读表；SQL 结果转 DataFrame
- 分类：pandas 处理表格
- 项目：Steam：读最新的 SQLite 备份；豆瓣：经 SQLAlchemy 读 MySQL
- 坑：MySQL 的 decimal 读进来是 `Decimal`，`read_sql` 默认会转成 float

### `df.head()` / `df.dtypes` / `len(df)`

- 作用：看前几行、每列类型、行数
- 说法：看数据长什么样；列的类型；有几行
- 分类：pandas 处理表格
- 项目：豆瓣：`year` 读进来是字符串，要转数字才能算年代；JOIN 类型表后 701 行，不是 250
- 坑：先看类型再处理

### `unique()` / `nunique()` / `drop_duplicates()` / `sort_values()`

- 作用：不重复的值 / 不重复值的个数 / 去重 / 排序
- 说法：有哪些值；有几种；去重；排序
- 分类：pandas 处理表格
- 项目：Steam：取分组列表、所有时间点；豆瓣：`df["genre"].nunique()` 相当于 `COUNT(DISTINCT genre)`

---

## 时间

### `pd.to_datetime(列, utc=True)` / `.dt.tz_convert("Asia/Shanghai")`

- 作用：文本转时间，并标明是 UTC；再换算成北京时间
- 说法：字符串转时间；UTC 转北京时间；时区转换
- 分类：pandas 处理表格
- 项目：Steam：`collected_at` 存的是 UTC，画图时换成北京时间

### 只保留完整的天

- 作用：按“游戏 + 日期”数行数，只留 24 行的那些天，再算日均
- 说法：数据不完整的天；去掉首尾两天；日均
- 分类：pandas 处理表格
- 项目：Steam：`04_pre_trend.py`
- 坑：开始采集那天、今天都不满 24 小时，直接算日均会被少数几个小时带偏

---

## 计算和变形

### `df.groupby("列")["值"].transform("mean")`

- 作用：按组算一个值，再按原来的行数“摊回去”，可以直接和原列相除
- 说法：每组的平均值放回每一行；组内归一化；除以自己的均值
- 分类：pandas 处理表格
- 项目：Steam：每款游戏的人数除以它自己的平均人数，不同量级的游戏才能放一起比
- 坑：`groupby().mean()` 会把每组压成一行，`transform` 保持原行数

### `pivot` / `pivot_table`

- 作用：长表转宽表；`pivot_table` 可以顺便聚合（比如求平均）
- 说法：长表变宽表；透视表；一列一个游戏
- 分类：pandas 处理表格
- 项目：Steam：03 按时间 × 游戏转宽表画曲线；04 用 `pivot_table` 算各组平均

### `reindex(完整的索引)`

- 作用：按给定的索引重排，缺的位置补 NaN
- 说法：补齐时间轴；对齐横轴
- 分类：pandas 处理表格
- 项目：Steam：每张子图都 reindex 到同一组时间点
- 坑：子图用 `sharex` 时，某组数据时间点少，横轴会被截断；reindex 补齐就好

### `astype(int)` / `// 10 * 10`

- 作用：转类型；整除再乘回去，取到十位
- 说法：转成整数；按年代分组；1994 变 1990
- 分类：pandas 处理表格
- 项目：豆瓣：`df["year"].astype(int) // 10 * 10`
- 坑：能直接 `astype(int)`，靠的是 `check.py` 保证了每个年份都是 4 位数字

### `value_counts().sort_index()`

- 作用：数每个值出现几次，再按值本身排序
- 说法：每个年代几部；频数统计；计数
- 分类：pandas 处理表格
- 项目：豆瓣：各年代电影数

### `s.mask(条件)`

- 作用：条件为真的位置换成 NaN，其余不变（和 `where` 相反）。整数列出现 NaN 会变成 `float64`
- 说法：把异常值当缺失；0 换成空；某些值不要
- 分类：pandas 处理表格
- 项目：Steam：接口偶尔返回 0 人，`df["players"].mask(df["players"] == 0)`，画图时那里断开一格而不是掉到 0

### `idxmax()` / `nsmallest(n, "列")`

- 作用：`idxmax` 返回最大值所在行的索引（配合 `.loc` 取那一行）；`nsmallest` 取某列最小的 n 行，找异常值很快
- 说法：最大值在哪一行；峰值是什么时候；找最小的几个；找异常值
- 分类：pandas 处理表格
- 项目：Steam：06 里找峰值时刻；`nsmallest(3, "players")` 发现 10/25 18:00 正好是 0

### `isin(集合)` 与 `~`

- 作用：每行的值在不在集合里，返回 True/False；`~` 取反，`df[~df["列"].isin(集合)]` 就是排除这些
- 说法：排除某几个；在不在列表里；去掉几款游戏
- 分类：pandas 处理表格
- 项目：Steam：04 排除赛博朋克2077（10/20 动画、10/22 更新、打折，人数暴涨）和鬼武者（自身衰退）

### `groupby().agg(新列=("原列", "算法"))`

- 作用：命名聚合，一次算多个指标；`"size"` 行数、`"mean"`、`"std"` 等。0/1 列求 `mean` 就是比例
- 说法：分组算多个指标；按类型算部数和平均分；算好评率
- 分类：pandas 处理表格
- 项目：豆瓣 02：`count=("title", "size"), avg=("rating", "mean"), std=("rating", "std")`；Steam 07：`pos_rate=("voted_up", "mean")` 就是好评率

### DataFrame 除以 Series

- 作用：按**列名**对齐，每一列除以 Series 里同名的那个数
- 说法：每列除以各自的基准；宽表归一化
- 分类：pandas 处理表格
- 项目：Steam：06 `pivot_table(...) / base`，每款游戏除以自己发售前的均值

### `pd.to_datetime(列, unit="s", utc=True)`

- 作用：把 Unix 时间戳（整数秒）转成时间，再 `.dt.tz_convert(...)` 转时区
- 说法：时间戳转日期；秒数转时间
- 分类：pandas 处理表格
- 项目：Steam：`load_reviews()` 把评论的 `created` 转成北京时间 `bj`

### `iloc[:-1]`

- 作用：按位置取，去掉最后一行；和列表 `[:-1]` 一样
- 说法：去掉最后一行；不要最后一天
- 分类：pandas 处理表格
- 项目：Steam 07：备份在凌晨 4 点，最后一天只有几个小时，去掉免得像“断崖式下跌”
