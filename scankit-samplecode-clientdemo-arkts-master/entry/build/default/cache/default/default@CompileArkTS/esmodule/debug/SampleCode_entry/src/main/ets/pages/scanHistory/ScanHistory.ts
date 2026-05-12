if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanHistory_Params {
    records?: ScanRecord[];
}
import router from "@ohos:router";
import type { ScanRecord } from '../../common/mode1/ScanRecord';
import preferences from "@ohos:data.preferences";
class ScanHistory extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__records = new ObservedPropertyObjectPU([], this, "records");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanHistory_Params) {
        if (params.records !== undefined) {
            this.records = params.records;
        }
    }
    updateStateVars(params: ScanHistory_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__records.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__records.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __records: ObservedPropertyObjectPU<ScanRecord[]>;
    get records() {
        return this.__records.get();
    }
    set records(newValue: ScanRecord[]) {
        this.__records.set(newValue);
    }
    async aboutToAppear() {
        try {
            // 直接获取上下文，无需导入 common
            const context = getContext(this);
            const prefs = await preferences.getPreferences(context, 'scan_history');
            const jsonStr = await prefs.get('records', '[]') as string;
            this.records = JSON.parse(jsonStr) || [];
        }
        catch (err) {
            console.error("加载历史记录失败:", JSON.stringify(err));
            this.records = [];
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.padding(16);
            // 顶部导航栏
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('← 返回');
            Text.fontSize(18);
            Text.onClick(() => router.back());
            Text.width(80);
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('扫码历史');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('清空');
            Text.fontSize(14);
            Text.fontColor('#FF4444');
            Text.width(80);
            Text.textAlign(TextAlign.End);
            Text.onClick(async () => {
                try {
                    const context = getContext(this);
                    const prefs = await preferences.getPreferences(context, 'scan_history');
                    await prefs.put('records', '[]');
                    await prefs.flush();
                    this.records = [];
                }
                catch (err) {
                    console.error("清空记录失败:", JSON.stringify(err));
                }
            });
        }, Text);
        Text.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 空状态
            if (this.records.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({
                            direction: FlexDirection.Column,
                            alignItems: ItemAlign.Center,
                            justifyContent: FlexAlign.Center
                        });
                        Flex.width('100%');
                        Flex.layoutWeight(1);
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📭');
                        Text.fontSize(60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无扫码记录');
                        Text.fontSize(16);
                        Text.margin({ top: 12 });
                    }, Text);
                    Text.pop();
                    Flex.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 历史列表
                        List.create({ space: 12 });
                        // 历史列表
                        List.layoutWeight(1);
                        // 历史列表
                        List.padding({ left: 16, right: 16 });
                        // 历史列表
                        List.width('100%');
                        // 历史列表
                        List.height('100%');
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding(16);
                                        Row.borderRadius(12);
                                        Row.backgroundColor('#FFFFFF');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.layoutWeight(1);
                                        Column.alignItems(HorizontalAlign.Start);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.content);
                                        Text.fontSize(16);
                                        Text.maxLines(1);
                                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(`类型: ${item.type}`);
                                        Text.fontSize(13);
                                        Text.fontColor('#999999');
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(item.time);
                                        Text.fontSize(12);
                                        Text.fontColor('#CCCCCC');
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.records, forEachItemGenFunction, (item: ScanRecord) => item.id.toString(), false, false);
                    }, ForEach);
                    ForEach.pop();
                    // 历史列表
                    List.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScanHistory";
    }
}
registerNamedRoute(() => new ScanHistory(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/scanHistory/ScanHistory", pageFullPath: "entry/src/main/ets/pages/scanHistory/ScanHistory", integratedHsp: "false", moduleType: "followWithHap" });
