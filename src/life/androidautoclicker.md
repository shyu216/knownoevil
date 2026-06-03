---
title: Android 连点器
icon: hand-pointer
---

内容由claude sonnet 4.6搜集。

::: tip 核心结论
GitHub 上 Android 连点器项目稀少，根本原因是 **Android 安全架构在设计上禁止普通 App 注入输入事件**。这是系统安全机制，而非疏漏。
:::

## 为什么 GitHub 上安卓连点器稀少？

### `INJECT_EVENTS` 权限壁垒

Android 中向其他应用注入输入事件需要 `INJECT_EVENTS` 权限。该权限只能授予**系统签名**的应用，即便在已 root 的设备上也极难获取。

这带来三个连锁问题：

- 普通开发者无法发布一个在 Play 商店里可用的连点器（除非走无障碍服务路线）
- 发布到 GitHub 的项目必然依赖 root、ADB 或 Accessibility，三条路都有门槛
- 商业连点器（如 Auto Clicker、Quick Touch）几乎全部**闭源**，开源社区动力不足

### Google Play 政策打压

申请 `BIND_ACCESSIBILITY_SERVICE` 权限需要提供无障碍功能的正当理由（如帮助残障人士），否则会收到警告甚至封号。这导致开发者要么伪装成辅助工具，要么放弃上架。

---

## Android 触控输入架构

触控事件经过以下层级传递，每一层都有权限拦截：

```
用户手指触摸
      ↓
Linux 内核 (evdev / uinput 驱动)      ← 需要 root 才能写入
      ↓
InputFlinger (system_server 进程)      ← 系统级，不可直接访问
      ↓
WindowManager / InputDispatcher        ← 负责路由到正确窗口
      ↓
ViewRootImpl (应用进程)                ← 应用最终接收事件
```

::: warning 关键点
触控注入必须发生在 **InputFlinger 层**，而这一层在 Android 安全模型中受到严格保护。
:::

---

## 可行方案全景

### 方案一：无障碍服务（Accessibility Service）

> 无需 root，主流商业连点器采用的方案

**原理**：通过 `AccessibilityService#dispatchGesture()`（API 24+）向系统发送手势事件。

```kotlin
val path = Path().apply { moveTo(x, y) }
val gesture = GestureDescription.Builder()
    .addStroke(GestureDescription.StrokeDescription(path, 0, duration))
    .build()
dispatchGesture(gesture, null, null)
```

::: details 优缺点分析

**优点**
- 无需 root，可上架应用商店
- 用户手动开启即可使用

**缺点**
- 游戏绝大多数时候**不响应**无障碍服务的点击事件（游戏使用 OpenGL/Vulkan 直接渲染，绕过了标准 View 层）
- 用户需进入设置手动开启，体验繁琐
- 国产 ROM 常在后台强制关闭无障碍服务
:::

---

### 方案二：ADB Shell（调试桥注入）

> 开发者方案，稳定可靠

**原理**：`adb shell input tap X Y` 由 ADB 守护进程以 shell 权限执行，绕过普通应用的权限限制。

```bash
# 单次点击
adb shell input tap 500 800

# 长按（用 swipe 模拟）
adb shell input swipe 500 800 500 800 500

# 脚本循环连点
while true; do
  adb shell input tap 500 800
  sleep 0.1
done
```

**无线 ADB（Android 11+）**

```bash
# 设备端开启无线调试，获取 IP:PORT 后
adb connect 192.168.1.x:PORT
```

::: details 优缺点分析

**优点**
- 对游戏有效（shell 层面注入）
- 稳定，无需安装任何 App

**缺点**
- 需保持 USB 连接或配置无线 ADB
- 不适合普通用户日常使用
:::

---

### 方案三：Shizuku（ADB 权限代理）

> ⭐ **2024–2026 最佳非 root 方案**

**原理**：Shizuku 是强大的桥接工具，允许其他应用通过 ADB 获得系统级 API 权限，无需完整 root 访问。用户一次性用 ADB 启动 Shizuku 服务后，连点器 App 可通过 Shizuku API 获得 shell 级权限，调用 `IInputManager` 系统接口注入触控事件。

**集成示例**

```java
// 通过 Shizuku 调用系统输入接口
IInputManager inputManager = IInputManager.Stub.asInterface(
    ShizukuBinderWrapper.newBinderWrapper(
        SystemServiceHelper.getSystemService("input")
    )
);
```

**激活步骤**

```bash
# 方式 1：USB ADB（一次性）
adb shell sh /sdcard/Android/data/moe.shizuku.privileged.api/start.sh

# 方式 2：Android 11+ 无线调试，无需 USB
# 在设置 → 开发者选项 → 无线调试 中配对即可
```

::: details 优缺点分析

**优点**
- 无需 root，对游戏有效
- 配置一次，长期有效
- GitHub 项目 [RikkaApps/Shizuku](https://github.com/RikkaApps/Shizuku)，23k+ ⭐

**缺点**
- 初次配置需要一次 ADB 命令，有一定技术门槛
- 部分厂商 ROM 重启后需重新激活
:::

---

### 方案四：Root + uinput 内核注入

> 最强方案，对所有游戏有效

**原理**：直接向 Linux 内核的 `/dev/uinput` 虚拟输入设备写入触控事件，完全模拟硬件触屏，任何应用层均无法区分真假触控。

```c
// 打开 uinput 设备
int fd = open("/dev/uinput", O_WRONLY | O_NONBLOCK);

// 配置多点触控协议（ABS_MT_*）
ioctl(fd, UI_SET_EVBIT, EV_ABS);
ioctl(fd, UI_SET_ABSBIT, ABS_MT_POSITION_X);
ioctl(fd, UI_SET_ABSBIT, ABS_MT_POSITION_Y);

// 注入触控事件序列
struct input_event ev = {
    .type = EV_ABS,
    .code = ABS_MT_POSITION_X,
    .value = x
};
write(fd, &ev, sizeof(ev));
// ... 发送 SYN_REPORT 提交
```

::: details 优缺点分析

**优点**
- 内核层面模拟，对所有游戏 100% 有效
- 可模拟多点触控（Multi-touch Protocol Type B）
- 参考项目：[kp7742/TouchSimulation](https://github.com/kp7742/TouchSimulation)

**缺点**
- 需要 root 权限
- 并非所有设备内核都开启了 `CONFIG_INPUT_UINPUT`
- 开发复杂度高
:::

---

### 方案五：Appium / scrcpy（自动化测试框架）

适用于开发者测试场景，需连接电脑。

```bash
# scrcpy 配合 adb 脚本
scrcpy &
adb shell input tap 500 800
```

Appium 支持多点触控，但真实设备需要 instrumentation 框架或 ADB 配合。

---

## 方案对比

| 方案 | 需要 Root | 对游戏有效 | 用户门槛 | 注入层级 |
|:---|:---:|:---:|:---:|:---|
| Accessibility Service | ❌ | ⚠️ 部分 | 低 | View 层 |
| ADB Shell | ❌ | ✅ | 中（需 USB）| Shell 权限层 |
| **Shizuku** | ❌ | ✅ | **中（一次配置）** | Shell 权限层 |
| uinput 内核注入 | ✅ | ✅✅ | 高 | Linux 内核层 |
| Appium / scrcpy | ❌ | ✅ | 高（需电脑）| ADB 层 |

---

## 推荐开源项目

| 项目 | 方案 | Stars | 说明 |
|:---|:---|:---:|:---|
| [Nain57/Smart-AutoClicker](https://github.com/Nain57/Smart-AutoClicker) | Accessibility | ⭐⭐⭐ | 基于图像识别的智能连点器 |
| [RikkaApps/Shizuku](https://github.com/RikkaApps/Shizuku) | Shizuku | 23k+ | 权限代理核心框架 |
| [kp7742/TouchSimulation](https://github.com/kp7742/TouchSimulation) | uinput | — | 内核级触控模拟 |
| [emanuele-f/TouchInjector](https://github.com/emanuele-f/TouchInjector) | ADB | — | ADB 权限注入触控 |

---

## 总结

```
普通用户（不想 root）   → Shizuku 方案（配置一次，效果最好）
游戏自动化（已 root）   → uinput 内核注入（无法被检测）
开发者测试             → ADB Shell / Appium
日常辅助（非游戏）      → Accessibility Service（最简单）
```

::: danger 注意
部分游戏的服务条款禁止使用自动化工具，使用连点器可能导致账号封禁，请自行评估风险。
:::