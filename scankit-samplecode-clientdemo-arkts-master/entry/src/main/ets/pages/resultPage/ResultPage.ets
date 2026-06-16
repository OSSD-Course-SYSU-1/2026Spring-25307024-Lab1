/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { LengthMetrics } from '@kit.ArkUI';
import { scanBarcode, scanCore } from '@kit.ScanKit';
import { StatusBar } from '../../common/StatusBar';
import { getScanTypeKey } from '../../common/Utils'
import { UIContextSelf } from '../customScan/model/UIContextSelf';
import { WindowService } from '../customScan/model/WindowService';
import { preferences } from '@kit.ArkData';
import { ScanRecord } from '../../common/mode1/ScanRecord';
import { ShareUtil } from '../../common/utils/ShareUtil';
// 导入AR引擎（路径完全匹配你的项目目录）
import { VisualGeneEngine, EffectConfig } from '../../common/mode1/VisualGeneEngine';

@Extend(Text)
function labelText() {
  .fontSize(20)
  .textAlign(TextAlign.Start)
  .fontColor($r('sys.color.black'))
}

@Extend(Text)
function valueText() {
  .margin({
    top: 4,
  })
  .fontSize(16)
  .textAlign(TextAlign.Start)
  .fontColor($r('sys.color.mask_secondary'))
}

@Entry
@Component
struct ResultPage {
  // 原有：扫码结果对象
  @State result: scanBarcode.ScanResult = UIContextSelf.getRouter().getParams() as scanBarcode.ScanResult;
  @State windowService: WindowService = WindowService.getInstance();

  // 新增：AR特效配置
  @State effectConfig: EffectConfig = VisualGeneEngine.analyze('');

  // 页面加载时：同时执行「保存记录」+「匹配AR特效」
  async aboutToAppear() {
    // 1. 原有：保存扫码记录到本地
    await this.saveScanRecord();
    // 2. 新增：调用AR引擎，匹配对应特效
    this.effectConfig = VisualGeneEngine.analyze(this.result.originalValue);
  }

  // 原有：扫码记录保存方法
  async saveScanRecord() {
    try {
      const record = new ScanRecord(
        this.result.originalValue,
        getScanTypeKey(this.result.scanType)
      );

      const context = getContext(this);
      const prefs = await preferences.getPreferences(context, 'scan_history');

      const jsonStr = await prefs.get('records', '[]') as string;
      const records: ScanRecord[] = JSON.parse(jsonStr) || [];

      records.unshift(record);

      // 限制最多保存50条历史记录
      if (records.length > 50) {
        records.pop();
      }

      await prefs.put('records', JSON.stringify(records));
      await prefs.flush();

      console.log("扫码记录保存成功:", record.content);
    } catch (err) {
      console.error("保存扫码记录失败:", JSON.stringify(err));
    }
  }

  build() {
    Stack() {
      // 原有：扫码结果显示区域
      Column() {
        Column() {
          Text($r('app.string.code_format'))
            .labelText()
          Text(getScanTypeKey(this.result.scanType))
            .valueText()

          Text($r('app.string.result_content'))
            .margin({
              top: 18,
            })
            .labelText()
          Text(this.result.originalValue)
            .valueText()
          // 新增：隔空投送/复制按钮
          Button('📡 隔空投送')
            .width('60%')
            .height(48)
            .fontSize(18)
            .backgroundColor('#007DFF')
            .borderRadius(24)
            .onClick(() => {
              // 用你页面里实际存在的变量：this.result.originalValue
              ShareUtil.shareText(this.result.originalValue)
            })
          if (this.result.scanCodeRect) {
            Text($r('app.string.code_rect'))
              .margin({
                top: 18,
              })
              .labelText()
            Text('left: ' + (this.result.scanCodeRect?.left || 0) + '  top: ' + (this.result.scanCodeRect?.top || 0) +
              '  right: ' + (this.result.scanCodeRect?.right || 0) + '  bottom: ' +
              (this.result.scanCodeRect?.bottom || 0))
              .valueText()
          }

          if (this.result.isGS1 !== undefined) {
            Text($r('app.string.is_gs1'))
              .margin({
                top: 18,
              })
              .labelText()
            Text(this.result.isGS1 + '')
              .valueText()
          }

          if (this.result.source === scanCore.ScanSource.CAMERA || this.result.source === scanCore.ScanSource.PHOTO) {
            Text($r('app.string.code_source'))
              .margin({
                top: 18,
              })
              .labelText()
            Text(this.result.source === scanCore.ScanSource.CAMERA ? 'CAMERA' : 'PHOTO')
              .valueText()
          }
        }
        .backgroundColor('#0a000000')
        .borderRadius(12)
        .width(this.windowService.width <= 480 ? '85%' : '60%')
        .alignItems(HorizontalAlign.Start)
        .padding(24)
      }
      .alignItems(HorizontalAlign.Center)
      .width('100%')

      // 新增：AR特效叠加层（全屏显示，不遮挡原有内容）
      Column() {
        // 特效标题
        Text(this.effectConfig.title || '扫码结果')
          .fontSize(22)
          .fontColor(this.effectConfig.primaryColor)
          .fontWeight(FontWeight.Bold)
          .margin({ top: 80 })
          .shadow({ radius: 10, color: this.effectConfig.primaryColor })
      }
      .width('100%')
      .height('100%')

      // 原有：顶部状态栏
      StatusBar({ title: $r('app.string.result_content') })
        .position({ start: LengthMetrics.vp(-15) })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('white')
  }
}