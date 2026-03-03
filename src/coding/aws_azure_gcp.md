---
title: 三云对比：AWS / Azure / GCP
icon: cloud
---

# AWS vs Azure vs GCP：三云对比

## 一、市场定位

| | AWS | Azure | GCP |
|---|---|---|---|
| 全球份额 | ≈32% | ≈23% | ≈12% |
| 澳洲地位 | **绝对主流** | 企业/政府增速快 | AI/数据/初创 |
| 本地 Region | 悉尼、墨尔本、珀斯 | 悉尼、墨尔本 | 悉尼、墨尔本 |
| 代表客户 | CBA、Telstra、Atlassian、Canva | 政府项目、微软生态企业 | 初创公司、数据密集型企业 |
| 核心优势 | 生态最全、合规强、本地支持好 | 混合云、企业 AD 集成、.NET | BigQuery、GKE、AI/ML 工具链 |

---

## 二、服务映射速查

| 类别 | AWS | Azure | GCP |
|---|---|---|---|
| 虚拟机 | EC2 | Virtual Machines | Compute Engine |
| 对象存储 | S3 | Blob Storage | Cloud Storage |
| 无服务器 | Lambda | Azure Functions | Cloud Functions |
| 容器编排 | EKS | AKS | GKE |
| 关系数据库 | RDS | Azure SQL / Flexible Server | Cloud SQL |
| 数据仓库 | Redshift | Synapse Analytics | BigQuery |
| 流处理 | Kinesis | Event Hubs | Pub/Sub + Dataflow |
| 机器学习平台 | SageMaker | Azure ML | Vertex AI |
| CDN | CloudFront | Azure CDN / Front Door | Cloud CDN |
| 监控 | CloudWatch | Azure Monitor | Cloud Monitoring |
| IAM | IAM + Cognito | Azure AD + Entra ID | Cloud IAM |
| IaC 原生工具 | CloudFormation / CDK | ARM / Bicep | Deployment Manager |
| DNS | Route 53 | Azure DNS | Cloud DNS |
| 消息队列 | SQS / SNS | Service Bus | Pub/Sub |

---

## 三、五个典型问题，三家方案对比

---

### 问题 1：如何托管一个高可用的 Web 应用（用户量 10万/日，要求 99.9% SLA）

**AWS 方案**
```
用户 → Route 53（DNS + 健康检查）
     → CloudFront（CDN + WAF）
     → ALB（Application Load Balancer）
     → EC2 Auto Scaling Group（多 AZ）
     → RDS Multi-AZ（主备自动切换）
     → ElastiCache（Redis 缓存）
```
- Auto Scaling 策略成熟，多 AZ 部署开箱即用
- ALB 支持蓝绿/金丝雀发布

**Azure 方案**
```
用户 → Azure Front Door（全球 CDN + WAF + 负载均衡一体化）
     → App Service Plan（PaaS，内置 Auto Scale）
     → Azure SQL Flexible Server（Zone Redundant）
     → Azure Cache for Redis
```
- App Service 是 PaaS，无需管 VM，运维成本低
- Front Door 把 CDN + LB + WAF 合并成一个服务，配置简单

**GCP 方案**
```
用户 → Cloud DNS + Cloud CDN
     → Global HTTP(S) Load Balancer（Anycast，全球单 IP）
     → Cloud Run（无服务器容器，自动扩缩到零）
     → Cloud SQL（HA 配置）
     → Memorystore（Redis）
```
- Cloud Run 冷热弹性极好，流量零时无费用
- Global LB 的 Anycast 架构延迟最低

**Winner：AWS**
> 澳洲本地三 AZ 最成熟，ALB + Auto Scaling 组合文档最多、招聘市场最熟悉。GCP 的 Cloud Run 技术上更优雅，但生态支持相对弱。

---

### 问题 2：如何搭建一套 CI/CD + 容器化部署流水线

**AWS 方案**
```
代码 → CodeCommit / GitHub
     → CodePipeline（编排）
     → CodeBuild（构建镜像）
     → ECR（镜像仓库）
     → EKS（Kubernetes 集群）或 ECS（Fargate）
     → CodeDeploy（蓝绿/滚动发布）
```

**Azure 方案**
```
代码 → Azure Repos / GitHub
     → Azure Pipelines（CI/CD 一体，YAML 定义）
     → Azure Container Registry
     → AKS（Kubernetes）
     → ArgoCD / Flux（GitOps）
```
- Azure Pipelines 是三家中 CI/CD 体验最完整的原生工具
- 与 GitHub Actions 深度集成（微软收购了 GitHub）

**GCP 方案**
```
代码 → Cloud Source Repos / GitHub
     → Cloud Build（触发器自动构建）
     → Artifact Registry（镜像仓库）
     → GKE（最成熟的托管 K8s）
     → Cloud Deploy（发布管道 + 批准流程）
```
- GKE 是公认三家中最好的托管 Kubernetes（毕竟 K8s 是谷歌发明的）
- Cloud Build 配置极简

**Winner：GCP（K8s 场景）/ Azure（企业 DevOps 场景）**
> 纯 Kubernetes 首选 GKE，GKE Autopilot 省去节点管理；企业内部有 Jira / ADO 的首选 Azure Pipelines。AWS EKS 相对运维复杂，但文档和社区资源最多。

---

### 问题 3：如何构建一个实时数据管道（日志采集 → 实时处理 → 数据仓库 → BI 看板）

**AWS 方案**
```
日志 → Kinesis Data Streams（实时流入）
     → Kinesis Data Firehose（自动批量写入）
     → S3（数据湖 Bronze）
     → Glue（ETL，Spark 托管）
     → Redshift（数据仓库）
     → QuickSight（BI）
```

**Azure 方案**
```
日志 → Event Hubs（Kafka 协议兼容）
     → Azure Stream Analytics（实时 SQL 处理）
     → ADLS Gen2（数据湖）
     → Azure Data Factory（ETL 编排）
     → Synapse Analytics（数仓 + Spark 一体）
     → Power BI（BI，与微软生态深度集成）
```
- Power BI 是企业 BI 事实标准，Synapse 把数仓和 Spark 集成在一起

**GCP 方案**
```
日志 → Pub/Sub（消息队列）
     → Dataflow（Apache Beam 托管，流批一体）
     → Cloud Storage（数据湖）
     → BigQuery（数仓，极速查询 + 内置 ML）
     → Looker / Looker Studio（BI）
```
- BigQuery 是三家中**最强的数据仓库**：无需调优、按查询量计费、内置 BQML
- Dataflow 的 Beam 模型是流批最统一的编程模型

**Winner：GCP**
> BigQuery + Pub/Sub + Dataflow 是数据工程师的梦幻组合，开箱即用，无需运维集群。Azure Synapse + Power BI 在企业 BI 场景胜出。

---

### 问题 4：如何训练并部署一个机器学习模型（从实验到生产 API）

**AWS 方案**
```
实验 → SageMaker Studio（Jupyter 环境）
      → SageMaker Experiments（实验追踪）
      → SageMaker Training（托管训练，支持 GPU 集群）
      → SageMaker Model Registry（模型版本管理）
      → SageMaker Endpoint（实时推理 API）
      → SageMaker Monitor（数据漂移检测）
```

**Azure 方案**
```
实验 → Azure ML Studio（低代码 + 代码双模式）
      → MLflow（实验追踪，原生集成）
      → Azure ML Compute（GPU 训练集群）
      → Azure ML Model Registry
      → Azure ML Online Endpoint（托管推理）
      → Azure OpenAI Service（直接调用 GPT-4 等）
```
- Azure OpenAI Service 独家提供 GPT-4 / o 系列企业级 API（合规、私有部署）

**GCP 方案**
```
实验 → Vertex AI Workbench（Jupyter + 深度集成）
      → Vertex AI Experiments（MLflow 兼容）
      → Vertex AI Training（TPU/GPU，谷歌硬件优势）
      → Vertex AI Model Registry
      → Vertex AI Prediction（在线/批量推理）
      → Gemini API（直接调用 Gemini 系列模型）
```
- TPU 是谷歌独有硬件，训练大模型成本最低
- Vertex AI 一体化程度最高，数据 → 特征 → 训练 → 部署全覆盖

**Winner：GCP（自训练模型）/ Azure（调用大模型 API）**
> 自己训练模型首选 Vertex AI（TPU + 一体化）；需要用 GPT-4 / OpenAI 系列的企业首选 Azure OpenAI Service；AWS SageMaker 功能最全但配置最繁琐。

---

### 问题 5：如何在澳洲做一个符合隐私法规（Privacy Act）的企业多区域部署

**AWS 方案**
```
主 Region：ap-southeast-2（悉尼）
DR Region：ap-southeast-4（墨尔本）

关键服务：
- S3 Object Lock（数据不可删除合规）
- AWS Config + CloudTrail（审计追踪）
- AWS Macie（PII 数据自动发现）
- Control Tower（多账号合规基线）
- AWS Artifact（合规报告下载）
```

**Azure 方案**
```
主 Region：australiaeast（悉尼）
DR Region：australiasoutheast（墨尔本）

关键服务：
- Microsoft Purview（数据治理 + PII 扫描）
- Azure Policy（自动合规策略）
- Azure Blueprints（部署合规环境模板）
- Defender for Cloud（安全评分 + 建议）
- Australian Government 专属合规框架（IRAP 认证）
```
- Azure 是澳洲政府项目合规认证最完整的云

**GCP 方案**
```
主 Region：australia-southeast1（悉尼）
DR Region：australia-southeast2（墨尔本）

关键服务：
- VPC Service Controls（数据边界隔离）
- Cloud DLP（PII 自动脱敏）
- Access Transparency（谷歌员工访问日志）
- Assured Workloads（合规工作负载边界）
```

**Winner：Azure（政府/金融合规场景）**
> 澳洲政府 IRAP 认证 Azure 最成熟，Privacy Act 合规工具链完整。AWS 在金融行业（CBA、ANZ）有更多实际案例。GCP 的 Access Transparency 理念先进但落地案例少。

---

## 四、总结：哪家最好？

**没有最好，只有最适合。** 以下是场景化推荐：

| 场景 | 推荐 | 原因 |
|---|---|---|
| 澳洲通用 Web/App 后端 | **AWS** | 份额最大、人才最多、Sydney Region 最成熟 |
| 企业 IT 上云（有 M365 / AD）| **Azure** | 混合云、SSO、Office 集成无缝 |
| 数据工程 / 数据仓库 | **GCP** | BigQuery 无对手 |
| ML 模型训练 | **GCP** | TPU + Vertex AI 一体化 |
| 调用 GPT-4 等大模型 API | **Azure** | Azure OpenAI Service 独家企业级 |
| 澳洲政府 / 高合规项目 | **Azure** | IRAP 认证最完整 |
| Kubernetes / 云原生 | **GCP** | GKE 是 K8s 亲儿子 |
| 多云/混合云架构 | **AWS + Azure** | AWS 做核心算力，Azure 做企业集成 |

**澳洲求职优先级**：AWS ≥ Azure > GCP
**技术深度优先级**：根据方向走——数据/AI 往 GCP、企业运维往 Azure、全栈基础设施往 AWS

---
