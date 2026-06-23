import deviceInfo from '@ohos.deviceInfo'

export class DeviceUtils {
  // 判断是否平板
  static isTablet(): boolean {
    return deviceInfo.deviceType === 'tablet'
  }
  // 判断是否二合一设备
  static is2in1(): boolean {
    return deviceInfo.deviceType === '2in1'
  }
  // 判断是否手机
  static isPhone(): boolean {
    return deviceInfo.deviceType === 'phone'
  }
}