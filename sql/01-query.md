# SQL 查询：基础、分组、JOIN、NULL

逻辑执行顺序（和书写顺序不一样）：

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

| | WHERE | HAVING |
|---|---|---|
| 什么时候 | 分组**前**筛行 | 分组**后**筛组 |
| 能用聚合函数吗 | 不能 | 能 |

| | INNER JOIN | LEFT JOIN |
|---|---|---|
| 保留 | 两边都匹配的行 | 左表全部行，右表没匹配的补 NULL |

---

## 基础

### `SELECT 列 FROM 表` / `DISTINCT`

- 作用：取指定的列；`DISTINCT` 去重
- 说法：查几列；去重；有哪些不同的值
- 分类：SQL 查询
- 项目：练习：选课库 student / course / sc
- 坑：少用 `SELECT *`，只取需要的列

### `WHERE` 条件写法

- 作用：比较 `= <> > <`、范围 `BETWEEN a AND b`、枚举 `IN (...)`、模糊 `LIKE '张%'`、空值 `IS NULL`、逻辑 `AND OR NOT`
- 说法：筛选；按条件过滤；在某个范围内；模糊匹配
- 分类：SQL 查询
- 项目：练习；豆瓣：`check.py` 里 `rating NOT BETWEEN 0 AND 10`
- 坑：`BETWEEN` 两端都包含；`LIKE` 里 `%` 是任意多个字符，`_` 是一个字符

### `ORDER BY 列 DESC` / `LIMIT N`

- 作用：排序（`ASC` 升序，`DESC` 降序，可多列）；只取前 N 条
- 说法：排序；从高到低；取前几名；前 10 条
- 分类：SQL 查询
- 项目：练习；豆瓣：推荐结果按分数降序取前几部
- 坑：没写 `ORDER BY` 时返回顺序不保证

### NULL 的三条规则

- 作用：① 和 NULL 的比较、运算结果都是 NULL，`WHERE` 把它当不满足；② 判空只能用 `IS NULL` / `IS NOT NULL`；③ 聚合函数忽略 NULL，`COUNT(*)` 除外
- 说法：空值；查不到 NULL 的行；NULL 判断
- 分类：SQL 查询
- 项目：豆瓣：`check.py` 年份检查的第一版遇到 NULL 会漏掉（比较结果是 NULL，被当成不满足），改成 `year IS NULL OR year NOT REGEXP '^[0-9]{4}$'`
- 坑：空字符串 `''` 和 NULL 不是一回事，Navicat 里一个显示空白、一个显示 `(Null)`，用眼睛看最容易漏

---

## 聚合和分组

### `COUNT` / `SUM` / `AVG` / `MAX` / `MIN` + `GROUP BY`

- 作用：按某列分组，每组算一个汇总值
- 说法：分组统计；每个类型有几部；平均分；计数
- 分类：SQL 查询
- 项目：豆瓣：各类型、各国家的电影数和平均分；Steam：`GROUP BY collected_at` 数每小时写入了几条
- 坑：`SELECT` 里非聚合的列都要出现在 `GROUP BY` 里

### `HAVING 条件`

- 作用：对分组后的结果再筛
- 说法：筛选分组结果；数量大于几的组；聚合后过滤
- 分类：SQL 查询
- 项目：豆瓣：`SELECT COUNT(*) AS n FROM movie_new HAVING n <> 250`，不等于 250 才返回一行

---

## JOIN

### `JOIN 表 ON 条件`（内连接）

- 作用：按关联条件把多张表拼成一张宽表，只保留两边都匹配的行
- 说法：多表查询；关联两张表；连表
- 分类：SQL 查询
- 项目：豆瓣：`movie_new` → `movie_genre` → `genre` 三表 JOIN，查每部电影的类型；Steam：`player_count` JOIN `game` JOIN `game_group`
- 坑：多对多 JOIN 之后行数会变多（250 部电影 JOIN 类型后是 701 行），直接算总数、平均会重复计算

### `LEFT JOIN` + `IS NULL`

- 作用：保留左表全部行；右边为 NULL 的就是“左边有、右边没有”的
- 说法：找没有的；没选课的学生；没有类型的电影；孤立记录
- 分类：SQL 查询
- 项目：练习：没选课的学生；豆瓣：`check.py` 查“没有类型 / 国家 / 导演的电影”

### `COUNT(右表列)` vs `COUNT(*)`

- 作用：LEFT JOIN 后统计个数，要数右表的列
- 说法：没有的显示 0；统计个数包括 0
- 分类：SQL 查询
- 项目：练习：每个学生选了几门课
- 坑：没选课的学生右表是 NULL，`COUNT(*)` 会数成 1，`COUNT(sc.cid)` 才是 0

### `INSERT ... ON CONFLICT(列) DO NOTHING`

- 作用：只在**指定列**冲突（主键重复）时跳过；`NOT NULL` 等其他约束被违反照样报错。`INSERT OR IGNORE` 会把所有约束冲突都悄悄吞掉
- 说法：重复的跳过；去重插入；只忽略主键重复；OR IGNORE 和 ON CONFLICT 区别
- 分类：SQL 改数据
- 项目：Steam：评论表用它，数据有问题时能报出来，而不是每天悄悄少几行

### SQLite 没有布尔类型

- 作用：用 `INTEGER` 存 1/0；`SUM(列)` 就是“是”的个数，`AVG(列)` 就是比例
- 说法：SQLite 存布尔；true false 怎么存；算比例
- 分类：SQLite
- 项目：Steam：`voted_up` 1 好评 0 差评，`SUM(voted_up)` 是好评数

### 外键指向 `UNIQUE` 列 / 默认不检查

- 作用：`REFERENCES 表(列)` 可以指向主键或 `UNIQUE` 列；SQLite 默认不检查外键（要 `PRAGMA foreign_keys = ON`），不检查时插入不存在的值不报错，但之后 JOIN 时那些行会消失
- 说法：外键关联；外键不生效；JOIN 后行数变少
- 分类：建表和约束
- 项目：Steam：`review.app_id REFERENCES game(app_id)`；规则是要采哪款游戏的评论，先把它加进 `game` 表

### 时间存成 Unix 时间戳（`INTEGER`）

- 作用：从 1970-01-01 00:00 UTC 起的秒数，和时区无关，比较、相减方便；缺点是人看不懂，分析时再换算。采集时原样存，不在采集环节做时区转换
- 说法：时间怎么存；时间戳还是文本；存时间的列用什么类型
- 分类：建表和约束
- 项目：Steam：`review.created` 存时间戳；`player_count.collected_at` 存 UTC 文本，两种都用过
