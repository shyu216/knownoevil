---
title: Unity MR 牙科应用（Unity MR Dentistry App）
icon: cube
tag:
  - Unity
  - HoloLens
  - MRTK3
  - UWP
---

对 `UnityHoloLens2` 项目的逆向梳理——即牙齿叠加的设备端（device-side）部分。证据来自 `manifest.json`、其初始状态的 `.backup`，以及构建目录（`_builds/`，19+ 个版本）。

它是一个 **"MR 牙科"（MR Dentistry）** 应用：通过 HoloLens 2（微软混合现实头显 / Microsoft MR headset）在 AR 中将 3D 牙科模型叠加到患者牙齿上，PC 端位姿估计（基于 ArUco（OpenCV 二维码标记库 / fiducial marker library））通过 TCP（传输控制协议 / Transmission Control Protocol）流式传输。属于研究级项目，经过大量迭代。

---

## 1. 创建：Unity 3D Core，而非 MRTK 模板

该项目**并非**由 MRTK（混合现实工具包 / Mixed Reality Toolkit）Unity 模板创建。`manifest.json.backup`（初始 manifest）只含默认的 Unity 内置包（`com.unity.modules.*`）——零 XR / MRTK。因此它是一个标准的 **Unity 2022.3.10f1 3D Core** 项目。

> **参考代码：** 设备端：`manifest.json.backup`（Unity 项目根目录，不在本仓库内）· PC 端对应：`exp_script/03_full_pipeline.py` → `tcp_server()` (L607)

---

## 2. 按时间顺序新增了什么

### 阶段 1 —— XR + MRTK3 全栈

相比 backup，`manifest.json` 新增：

- **XR 基础设施**：`com.unity.xr.management` (4.4.0)、`com.unity.xr.openxr` (1.8.2)、`com.microsoft.mixedreality.openxr` (1.11.2)
- **MRTK3 核心系列**（以本地 `.tgz` 安装于 `Packages/MixedReality/` 下）：`core`、`input`、`uxcore`、`uxcomponents`、`uxcomponents.noncanvas`、`spatialmanipulation`（均为 `4.0.0-pre.1`），外加 `audio`、`diagnostics`、`tools`、`standardassets`、`extendedassets`、`accessibility`、`windowsspeech`、`graphicstools.unity`、`tts.windows`

### 阶段 2 —— 自定义牙科-MR 代码

`Assets/Codebase/` 下的 6 个脚本：

| 脚本 | 职责 |
|---|---|
| `HoloLensDeployConfig.cs` | PC 网络配置（IP、端口、牙齿模型物理尺寸 0.07 m） |
| `HoloLensPvCamera.cs` | 旧版 HL2 相机采集（现已禁用；设备改用 HL2SS） |
| `HoloLensTetherStreamer.cs` | TCP 位姿客户端——从 PC 拉取 ArUco 位姿，驱动牙齿叠加 |
| `WebcamFramePipeline.cs` | 旧版 HTTP 帧管线（仅编辑器，设备上已禁用） |
| `ManualAlignmentCapture.cs` | 抓取 / 语音触发的对齐采集 → 保存位姿到 PC |
| `ToothPosePanel.cs` | 实时位姿面板（可拖拽的 TextMeshPro UI） |

外加 `Assets/Editor/` 下的 1 个编辑器工具：

> **参考代码：** 设备端：`Assets/Codebase/HoloLensTetherStreamer.cs`、`HoloLensPvCamera.cs`、`HoloLensDeployConfig.cs`、`WebcamFramePipeline.cs`、`ManualAlignmentCapture.cs`、`ToothPosePanel.cs` + `Assets/Editor/HoloLensBuildValidator.cs`（Unity 项目，不在本仓库内）· PC 端：`exp_script/03_full_pipeline.py` → `tcp_server()` (L607) + `compute_mesh_world_unity()` (L246)

- `HoloLensBuildValidator.cs` —— 一键构建验证 / 配置

### 阶段 3 —— 导入牙科模型

`Assets/Models/model.fbx` —— 牙齿 / 牙弓 3D 模型。

---

## 3. 构建配置

分为自动配置（编辑器菜单）+ 手动构建。

### 自动配置（编辑器菜单）

`HoloLensBuildValidator.cs` 添加了一个菜单 **"MRT Dentistry → Validate HoloLens 2 Build Settings"**，点击后：

1. **场景（Scenes）**：将 `Assets/Scenes/` 场景（MRBase 在前）加入 Build Settings
2. **管线对象**：创建 / 配置 `Webcam` GameObject，**禁用**旧版 `WebcamFramePipeline`，**启用** `HoloLensTetherStreamer`
3. **UWP Player Settings**：
   - 脚本后端（Scripting Backend）→ **IL2CPP（Unity 编译后端 / scripting backend）**
   - 架构（Architecture）→ **ARM64（64 位 ARM 架构）**
   - 能力（Capabilities）：**InternetClient、PrivateNetworkClientServer、WebCam、Microphone、SpatialPerception、GazeInput**

### 手动构建

自动配置后，手动运行 **File → Build Settings**：

- 平台（Platform）：**Universal Windows Platform（通用 Windows 平台 / Universal Windows Platform）**
- 输出到 `_builds/`，生成 Visual Studio 解决方案（`_MRDentistry.sln`）
- 从 Visual Studio 编译并部署到 HoloLens 2

> **参考代码：** 设备端：`HoloLensBuildValidator.cs`（自动设置 IL2CPP/ARM64/能力）→ UWP 构建 → `_builds/`（19+ 个版本）

`_builds/` 中保留了 **19+ 个构建版本**（v1…v19）——清晰的迭代开发证据（改代码 → 构建 → VS 测试）。

---

## 4. 汇总表

| 阶段 | 动作 |
|---|---|
| 起点 | Unity 2022.3.10f1，3D Core 项目 |
| + XR | XR Management + OpenXR 插件 |
| + MRTK3 | MRTK3 全栈（16 个本地 `.tgz` 包） |
| + 自定义代码 | 7 个 C# 脚本（牙科-MR 管线） |
| + 3D 模型 | 导入 `model.fbx` 牙齿模型 |
| 构建 | 编辑器脚本自动设置 IL2CPP / ARM64 / 能力 → 手动 UWP 构建 → VS 部署到 HoloLens 2 |

核心闭环：**PC 端做 ArUco 视觉跟踪 → 计算牙齿位姿 → 通过 TCP 流式传输到 HoloLens 2 → Unity 叠加 3D 牙齿模型。**

> **参考代码：** PC 端：`exp_script/03_full_pipeline.py` → `tcp_server()` 返回 `pack_pose_response(compute_mesh_world_unity(...))` (L655) · 设备端：Unity `HoloLensTetherStreamer.cs` 消费这 68 字节的数据包
