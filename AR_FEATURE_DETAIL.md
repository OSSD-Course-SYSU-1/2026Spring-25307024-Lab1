# 新增功能说明：AR码上生花 —— 虚实融合扫码新体验

## 一、功能概述

在原有的“文本展示型”扫码结果页基础上，创新性地引入**视觉基因分析引擎**与**动态AR特效渲染**机制。系统不再冷冰冰地告诉你“这是一个网址”，而是根据扫码内容，实时解析出其背后的“视觉基因”，并在相机预览层或结果页叠加动态粒子动画、光效波纹等AR特效，实现所见即所得的沉浸式信息可视化体验。

**一句话描述**：扫码不仅能看，还能“看”到信息的视觉形态。扫WiFi码看波纹，扫优惠券看金币雨，扫地理位置看光轨飞向目的地。

## 二、核心创新点

| 创新维度 | 传统扫码 | AR码上生花 |
| :--- | :--- | :--- |
| 结果呈现 | 纯文本字符串 | 动态粒子动画 + 视觉特效 |
| 用户感知 | 信息冰冷、体验单一 | 视觉冲击强、趣味性高 |
| 技术融合 | 仅调用 Scan Kit | Scan Kit + Canvas + Animator |
| 扩展性 | 功能固定 | 视觉基因库可无限扩展 |

## 三、新增/修改文件清单

### 3.1 新增文件

| 文件路径 | 功能说明 |
| :--- | :--- |
| `entry/src/main/ets/common/utils/VisualGeneEngine.ets` | 视觉基因分析引擎，内置关键词→特效映射规则库，扫码后自动匹配并生成特效配置。 |
| `entry/src/main/ets/common/components/ArScanOverlay.ets` | AR扫描叠加层组件，在相机预览画面上方覆盖透明Canvas，用于播放扫码成功瞬间的特效动画。 |
| `entry/src/main/ets/pages/resultPage/DynamicBackground.ets` | 可配置的动态背景组件，支持波纹扩散、粒子飘落、光轨飞射等多种动画模板。 |

### 3.2 修改文件

| 文件路径 | 修改内容 |
| :--- | :--- |
| `entry/src/main/ets/pages/customScan/pages/ScanPage.ets` | 集成ArScanOverlay组件，在扫码成功回调中插入特效播放逻辑，特效结束后跳转结果页。 |
| `entry/src/main/ets/pages/resultPage/ResultPage.ets` | 重构结果展示页，接收特效配置参数，使用DynamicBackground渲染动态背景，文本部分增加打字机逐字显现效果。 |
| `entry/src/main/ets/common/Utils.ets` | 新增 `getRandomInRange()` 随机数生成工具方法，供粒子动画使用。 |

## 四、技术实现详解

### 4.1 视觉基因引擎（VisualGeneEngine）

**设计思路**：
构建一个轻量级的本地关键词匹配引擎，不依赖网络，扫码成功后立即在本地完成分析与特效配置生成。

**核心数据结构**：
```typescript
export enum EffectType {
  PARTICLE_FALL = 'particle_fall',
  WAVE_RIPPLE = 'wave_ripple',
  LIGHT_TRAIL = 'light_trail',
  TREE_GROW = 'tree_grow'
}

export interface EffectConfig {
  effectType: EffectType;
  primaryColor: string;
  secondaryColor: string;
  duration: number;
  particleShape?: string;
  particleCount?: number;
  title?: string;
}
