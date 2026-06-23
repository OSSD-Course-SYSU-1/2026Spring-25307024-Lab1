import { window } from '@kit.ArkUI'
import common from '@ohos.app.ability.common'

export enum BreakpointType {
  SM = 'sm',   // 手机竖屏
  MD = 'md',   // 手机横屏 / 小平板
  LG = 'lg',   // 大平板 / 2in1
}

interface AdaptiveConfig<T> {
  sm: T,
  md?: T,
  lg?: T
}

export class BreakpointSystem {
  private static instance: BreakpointSystem
  private currentBreakpoint: BreakpointType = BreakpointType.SM
  private listeners: Array<(bp: BreakpointType) => void> = [] as Array<(bp: BreakpointType) => void>

  static getInstance(): BreakpointSystem {
    if (!BreakpointSystem.instance) {
      BreakpointSystem.instance = new BreakpointSystem()
    }
    return BreakpointSystem.instance
  }

  async init(context: common.UIAbilityContext) {
    try {
      const win = await window.getLastWindow(context)
      const props = win.getWindowProperties()
      this.updateBreakpoint(props.windowRect.width)
      win.on('windowSizeChange', (size) => {
        this.updateBreakpoint(size.width)
      })
    } catch (err) {
      console.error("断点初始化异常", JSON.stringify(err))
    }
  }

  private updateBreakpoint(width: number) {
    let newBreakpoint: BreakpointType
    // 直接使用像素宽度判断，不再做px2vp换算
    if (width < 600) {
      newBreakpoint = BreakpointType.SM
    } else if (width < 840) {
      newBreakpoint = BreakpointType.MD
    } else {
      newBreakpoint = BreakpointType.LG
    }

    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint
      this.listeners.forEach(cb => cb(newBreakpoint))
    }
  }

  getCurrentBreakpoint(): BreakpointType {
    return this.currentBreakpoint
  }

  isWideScreen(): boolean {
    return this.currentBreakpoint === BreakpointType.LG
  }

  addListener(callback: (bp: BreakpointType) => void) {
    this.listeners.push(callback)
  }

  removeListener(callback: (bp: BreakpointType) => void) {
    const index = this.listeners.indexOf(callback)
    if (index > -1) this.listeners.splice(index, 1)
  }
}

export function getAdaptiveValue<T>(breakpoint: BreakpointType, values: AdaptiveConfig<T>): T {
  if (breakpoint === BreakpointType.SM) return values.sm
  if (breakpoint === BreakpointType.MD && values.md !== undefined) return values.md
  if (breakpoint === BreakpointType.LG && values.lg !== undefined) return values.lg
  return values.sm
}