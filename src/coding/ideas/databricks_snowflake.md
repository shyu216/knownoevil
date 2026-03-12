---
title: Databricks 与 Snowflake 项目构想
icon: snowflake
---

# Databricks & Snowflake

## 简介

### Snowflake

Snowflake 是一个云原生的**数据仓库平台**，核心特点是存储与计算分离。数据以列式格式存储在对象存储（S3/Azure Blob/GCS）上，查询时按需弹性扩展计算资源。

- **Multi-cluster shared data**：多个计算集群可同时读同一份数据，互不干扰
- **Time Travel**：可回溯查询历史任意时间点的数据状态
- **Zero-copy Clone**：克隆表/数据库不复制底层数据，节省存储
- **数据共享（Data Sharing）**：跨账户、跨云直接共享数据，无需导出
- 支持 SQL，对 BI 工具友好（Tableau、Looker、dbt）

适合场景：结构化/半结构化数据的存储、分析、报表。

---

### Databricks

Databricks 是基于 **Apache Spark** 构建的统一数据与 AI 平台，由 Spark 的原作者创建。核心组件是 **Delta Lake**（开源的 ACID 事务存储层）和 **MLflow**（机器学习实验追踪）。

- **Delta Lake**：在数据湖上实现 ACID 事务、Schema 演化、数据版本管理
- **Unity Catalog**：跨工作区的统一数据治理与血缘追踪
- **MLflow**：实验追踪、模型注册、部署一体化
- **Notebooks**：Spark + Python/SQL/Scala/R 混用，协作友好
- **Serverless SQL Warehouse**：也可跑纯 SQL 分析，与 Snowflake 正面竞争

适合场景：大规模数据工程（ETL）、机器学习训练、流批一体处理。

---

### 两者对比

| | Snowflake | Databricks |
|---|---|---|
| 核心定位 | 数据仓库 | 数据湖 + AI 平台 |
| 查询语言 | SQL 优先 | Spark / SQL / Python |
| ML 支持 | 弱（需外部工具） | 强（MLflow 原生集成） |
| 流处理 | 弱 | 强（Structured Streaming）|
| 价格模型 | 按计算时间 + 存储 | 按 DBU 计算单元 |
| 典型集成 | dbt, Fivetran, Tableau | Delta Live Tables, MLflow |

在实际生产中，两者常**配合使用**：Databricks 做数据加工和模型训练，Snowflake 做最终的分析层和 BI 数据源。

---

## 项目设想：城市生活成本智能分析平台

- https://www.numbeo.com/cost-of-living/

### 背景

不同城市的生活成本差异巨大，但网上数据分散（Numbeo、政府统计、租房平台、餐饮外卖等）。设想构建一个平台，持续爬取、整合多源数据，动态追踪全球/国内城市的生活成本变化，并加入 AI 预测与个性化建议。

### 架构

```
数据源
├── Numbeo API（生活成本指数）
├── 租房平台（安居客、Zillow）爬虫
├── 政府统计数据（CSV/API）
├── 外卖/超市价格（定期快照）
└── 社交媒体情绪（微博/Reddit 讨论）
        │
        ▼
[ Databricks - 数据工程层 ]
├── Delta Lake 存储原始数据（Bronze）
├── Spark Streaming 实时摄取租房/价格更新（Silver）
├── dbt-style 聚合逻辑：城市维度指标计算（Gold）
└── MLflow 训练生活成本预测模型（Prophet / LightGBM）
        │
        ▼
[ Snowflake - 分析服务层 ]
├── 接收 Gold 层数据（通过 Delta Sharing 或 Snowpipe）
├── 存储城市历史趋势快照
├── 供 BI 工具（Metabase / Superset）读取
└── 对外暴露 SQL API 供前端查询
        │
        ▼
[ 前端 / 应用层 ]
├── 交互式地图：各城市生活成本热力图
├── 个性化计算器：输入收入 + 偏好，推荐最适合居住城市
└── 趋势预警：某城市租金/物价异常波动通知
```

### 有意思的切入点

1. **"城漂指数"**：综合租金、通勤、饮食、娱乐，给每个城市打一个"性价比分"，筛选出适合特定职业群体（程序员、自由职业者）的城市
2. **跨城对比时光机**：Time Travel 特性可以回溯"2019 vs 2024 年同城生活成本对比"，直观展示疫情/通胀影响
3. **社群情绪 x 价格联动**：用 NLP 分析社交媒体上对某城市的情绪变化，看是否能预测房价/租金趋势

### 技术栈

- **数据摄取**：Python + Airflow（编排）
- **存储**：Delta Lake on S3
- **计算**：Databricks Notebook + Spark
- **ML**：MLflow + Prophet（时序预测）
- **分析层**：Snowflake + dbt
- **可视化**：Apache Superset / Streamlit
- **部署**：Databricks Jobs + Snowflake Task

---
