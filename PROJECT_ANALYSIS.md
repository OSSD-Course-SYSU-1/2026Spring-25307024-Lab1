# ScanKit 示例项目工程分析

## 一、项目简介

本项目是华为统一扫码服务（Scan Kit）的官方示例，展示了扫码直达、默认界面扫码、自定义界面扫码、图像识码和码图生成五大能力。适用于 HarmonyOS 6.0.2 及以上版本。

## 二、工程目录结构

├─entry/src/main/ets // 代码区
│ ├─common
│ │ ├─CommonComponents.ets // 公共组件
│ │ ├─CommonTipsDialog.ets // 公共提示弹窗
│ │ ├─Logger.ts // 日志打印方法
│ │ ├─PermissionsUtil.ets // 相机授权类
│ │ ├─StatusBar.ets // 状态栏组件
│ │ └─Utils.ets // 公共方法
│ ├─entryability
│ │ └─EntryAbility.ets // 程序入口类
│ ├─pages
│ │ ├─access // 扫码直达服务页
│ │ ├─customScan // 自定义界面扫码（V1 状态管理）
│ │ ├─customScanV2 // 自定义界面扫码（V2 状态管理）
│ │ ├─defaultScan // 默认界面扫码
│ │ ├─detectBarcode // 图像识码
│ │ ├─generateBarcode // 码图生成
│ │ ├─resultPage // 扫码结果页
│ │ └─Index.ets // 主页面入口
└─entry/src/main/resources // 资源文件目录

## 三、核心文件功能说明

### 1. 应用入口（EntryAbility.ets）
- 继承 UIAbility，管理应用全局生命周期
- 存储全局上下文
- 处理相机权限动态申请

### 2. 主页面（Index.ets）
- 应用主菜单，提供各功能模块的入口按钮
- 通过 router.pushUrl 实现页面跳转

### 3. 默认界面扫码（defaultScan/DefaultScan.ets）
- 调用 scanCore.startScanForResult()
- 一行代码唤起系统统一扫码界面，无需自定义 UI

### 4. 自定义界面扫码（customScan/ScanService.ets）
- 封装 customScan SDK 调用（init/start/stop/release）
- 支持闪光灯、变焦、对焦等高级控制
- 通过 XComponent 渲染相机预览流

### 5. 图像识码（detectBarcode/）
- decode()：从相册图片中识别码图
- DecodeCameraYuv.ets：实时从相机帧数据中识码

### 6. 码图生成（generateBarcode/CreateBarcode.ets）
- 将字符串或字节数组生成指定格式码图（PixelMap）

## 四、技术栈

- 语言：ArkTS
- SDK：HarmonyOS 6.0.2 Release
- 核心依赖：@kit.ScanKit
- 状态管理：@State / @ObservedV2
- UI 框架：ArkUI（Stage 模型）