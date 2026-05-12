if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ResultPage_Params {
    result?: scanBarcode.ScanResult;
    windowService?: WindowService;
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
    }
    updateStateVars(params: ResultPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__result.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
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
    // 新增：页面加载时自动保存扫码记录
    async aboutToAppear() {
        await this.saveScanRecord();
    }
    // 新增：保存扫码记录到本地存储的方法
    async saveScanRecord() {
        try {
            // 1. 创建记录对象，用你已有的 getScanTypeKey 获取准确的扫码类型
            const record = new ScanRecord(this.result.originalValue, getScanTypeKey(this.result.scanType));
            // 2. 初始化本地存储
            const context = getContext(this);
            const prefs = await preferences.getPreferences(context, 'scan_history');
            // 3. 读取已有的历史记录
            const jsonStr = await prefs.get('records', '[]') as string;
            const records: ScanRecord[] = JSON.parse(jsonStr) || [];
            // 4. 把新记录加到最前面（最新的在最上面）
            records.unshift(record);
            // 5. 限制最多保存50条，避免数据过多
            if (records.length > 50) {
                records.pop();
            }
            // 6. 保存回本地存储
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
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
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
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.position({ start: LengthMetrics.vp(-15) });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBar(this, { title: { "id": 16777275, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/resultPage/ResultPage.ets", line: 147, col: 7 });
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
