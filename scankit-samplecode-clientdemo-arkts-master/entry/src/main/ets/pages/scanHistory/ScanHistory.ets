import { router } from '@kit.ArkUI';
import { ScanRecord } from '../../common/mode1/ScanRecord';
import { preferences } from '@kit.ArkData';

@Entry
@Component
struct ScanHistory {
  @State records: ScanRecord[] = [];

  async aboutToAppear() {
    try {
      // 直接获取上下文，无需导入 common
      const context = getContext(this);
      const prefs = await preferences.getPreferences(context, 'scan_history');
      const jsonStr = await prefs.get('records', '[]') as string;
      this.records = JSON.parse(jsonStr) || [];
    } catch (err) {
      console.error("加载历史记录失败:", JSON.stringify(err));
      this.records = [];
    }
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Text('← 返回')
          .fontSize(18)
          .onClick(() => router.back())
          .width(80)
          .textAlign(TextAlign.Start);

        Blank();
        Text('扫码历史')
          .fontSize(20)
          .fontWeight(FontWeight.Bold);
        Blank();

        Text('清空')
          .fontSize(14)
          .fontColor('#FF4444')
          .width(80)
          .textAlign(TextAlign.End)
          .onClick(async () => {
            try {
              const context = getContext(this);
              const prefs = await preferences.getPreferences(context, 'scan_history');
              await prefs.put('records', '[]');
              await prefs.flush();
              this.records = [];
            } catch (err) {
              console.error("清空记录失败:", JSON.stringify(err));
            }
          });
      }
      .width('100%')
      .padding(16)
      .justifyContent(FlexAlign.SpaceBetween);

      // 空状态
      if (this.records.length === 0) {
        Flex({
          direction: FlexDirection.Column,
          alignItems: ItemAlign.Center,
          justifyContent: FlexAlign.Center
        }) {
          Text('📭').fontSize(60);
          Text('暂无扫码记录').fontSize(16).margin({ top: 12 });
        }
        .width('100%')
        .layoutWeight(1);
      } else {
        // 历史列表
        List({ space: 12 }) {
          ForEach(this.records, (item: ScanRecord) => {
            ListItem() {
              Row() {
                Column() {
                  Text(item.content)
                    .fontSize(16)
                    .maxLines(1)
                    .textOverflow({ overflow: TextOverflow.Ellipsis });
                  Text(`类型: ${item.type}`)
                    .fontSize(13)
                    .fontColor('#999999')
                    .margin({ top: 4 });
                }
                .layoutWeight(1)
                .alignItems(HorizontalAlign.Start);

                Text(item.time)
                  .fontSize(12)
                  .fontColor('#CCCCCC');
              }
              .width('100%')
              .padding(16)
              .borderRadius(12)
              .backgroundColor('#FFFFFF');
            }
          }, (item: ScanRecord) => item.id.toString());
        }
        .layoutWeight(1)
        .padding({ left: 16, right: 16 })
        .width('100%')
        .height('100%');
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5');
  }
}