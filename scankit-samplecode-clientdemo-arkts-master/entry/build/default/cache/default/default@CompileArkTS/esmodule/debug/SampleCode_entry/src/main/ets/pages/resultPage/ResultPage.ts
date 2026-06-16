if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ResultPage_Params {
    result?: scanBarcode.ScanResult;
    windowService?: WindowService;
    effectConfig?: EffectConfig;
}
import { LengthMetrics } from "@ohos:arkui.node";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import { StatusBar } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/StatusBar";
import { getScanTypeKey } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
import preferences from "@ohos:data.preferences";
import { ScanRecord } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/mode1/ScanRecord";
import { ShareUtil } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/utils/ShareUtil";
import { VisualGeneEngine } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/mode1/VisualGeneEngine";
import type { EffectConfig } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/mode1/VisualGeneEngine";
function __Text__labelText(): void {
    Text.fontSize(20);
    Text.textAlign(TextAlign.Start);
    Text.fontColor({ "id": 125831025, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
}
function __Text__valueText(): void {
    Text.margin({
        top: 4,
    });
    Text.fontSize(16);
    Text.textAlign(TextAlign.Start);
    Text.fontColor({ "id": 125830998, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
}
class ResultPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__result = new ObservedPropertyObjectPU(UIContextSelf.getRouter().getParams() as scanBarcode.ScanResult, this, "result");
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.__effectConfig = new ObservedPropertyObjectPU(VisualGeneEngine.analyze(''), this, "effectConfig");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ResultPage_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
        if (params.effectConfig !== undefined) {
            this.effectConfig = params.effectConfig;
        }
    }
    updateStateVars(params: ResultPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__result.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
        this.__effectConfig.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        this.__effectConfig.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 原有：扫码结果对象
    private __result: ObservedPropertyObjectPU<scanBarcode.ScanResult>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: scanBarcode.ScanResult) {
        this.__result.set(newValue);
    }
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    // 新增：AR特效配置
    private __effectConfig: ObservedPropertyObjectPU<EffectConfig>;
    get effectConfig() {
        return this.__effectConfig.get();
    }
    set effectConfig(newValue: EffectConfig) {
        this.__effectConfig.set(newValue);
    }
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
            const record = new ScanRecord(this.result.originalValue, getScanTypeKey(this.result.scanType));
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
        }
        catch (err) {
            console.error("保存扫码记录失败:", JSON.stringify(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('white');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 原有：扫码结果显示区域
            Column.create();
            // 原有：扫码结果显示区域
            Column.alignItems(HorizontalAlign.Center);
            // 原有：扫码结果显示区域
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor('#0a000000');
            Column.borderRadius(12);
            Column.width(this.windowService.width <= 480 ? '85%' : '60%');
            Column.alignItems(HorizontalAlign.Start);
            Column.padding(24);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777258, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__labelText();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(getScanTypeKey(this.result.scanType));
            __Text__valueText();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777275, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.margin({
                top: 18,
            });
            __Text__labelText();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.result.originalValue);
            __Text__valueText();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 新增：隔空投送/复制按钮
            Button.createWithLabel('📡 隔空投送');
            // 新增：隔空投送/复制按钮
            Button.width('60%');
            // 新增：隔空投送/复制按钮
            Button.height(48);
            // 新增：隔空投送/复制按钮
            Button.fontSize(18);
            // 新增：隔空投送/复制按钮
            Button.backgroundColor('#007DFF');
            // 新增：隔空投送/复制按钮
            Button.borderRadius(24);
            // 新增：隔空投送/复制按钮
            Button.onClick(() => {
                // 用你页面里实际存在的变量：this.result.originalValue
                ShareUtil.shareText(this.result.originalValue);
            });
        }, Button);
        // 新增：隔空投送/复制按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.result.scanCodeRect) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777259, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                        Text.margin({
                            top: 18,
                        });
                        __Text__labelText();
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('left: ' + (this.result.scanCodeRect?.left || 0) + '  top: ' + (this.result.scanCodeRect?.top || 0) +
                            '  right: ' + (this.result.scanCodeRect?.right || 0) + '  bottom: ' +
                            (this.result.scanCodeRect?.bottom || 0));
                        __Text__valueText();
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.result.isGS1 !== undefined) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777272, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                        Text.margin({
                            top: 18,
                        });
                        __Text__labelText();
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.result.isGS1 + '');
                        __Text__valueText();
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.result.source === scanCore.ScanSource.CAMERA || this.result.source === scanCore.ScanSource.PHOTO) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777260, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                        Text.margin({
                            top: 18,
                        });
                        __Text__labelText();
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.result.source === scanCore.ScanSource.CAMERA ? 'CAMERA' : 'PHOTO');
                        __Text__valueText();
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        // 原有：扫码结果显示区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 新增：AR特效叠加层（全屏显示，不遮挡原有内容）
            Column.create();
            // 新增：AR特效叠加层（全屏显示，不遮挡原有内容）
            Column.width('100%');
            // 新增：AR特效叠加层（全屏显示，不遮挡原有内容）
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 特效标题
            Text.create(this.effectConfig.title || '扫码结果');
            // 特效标题
            Text.fontSize(22);
            // 特效标题
            Text.fontColor(this.effectConfig.primaryColor);
            // 特效标题
            Text.fontWeight(FontWeight.Bold);
            // 特效标题
            Text.margin({ top: 80 });
            // 特效标题
            Text.shadow({ radius: 10, color: this.effectConfig.primaryColor });
        }, Text);
        // 特效标题
        Text.pop();
        // 新增：AR特效叠加层（全屏显示，不遮挡原有内容）
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.position({ start: LengthMetrics.vp(-15) });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 原有：顶部状态栏
                    StatusBar(this, { title: { "id": 16777275, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/resultPage/ResultPage.ets", line: 176, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777275, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777275, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "StatusBar" });
        }
        __Common__.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ResultPage";
    }
}
registerNamedRoute(() => new ResultPage(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/resultPage/ResultPage", pageFullPath: "entry/src/main/ets/pages/resultPage/ResultPage", integratedHsp: "false", moduleType: "followWithHap" });
