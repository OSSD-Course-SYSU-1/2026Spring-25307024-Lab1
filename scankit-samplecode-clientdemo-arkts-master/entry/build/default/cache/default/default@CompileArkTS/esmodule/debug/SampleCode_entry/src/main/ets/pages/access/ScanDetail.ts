if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanDetail_Params {
    translateWidth?: number;
    translateHeight?: number;
    language?: string;
}
import { LengthMetrics } from "@ohos:arkui.node";
import { StatusBar } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/StatusBar";
function __Text__textHead(): void {
    Text.width('100%');
    Text.fontSize(20);
    Text.fontWeight(FontWeight.Bold);
    Text.fontColor({ "id": 125831025, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Text.textAlign(TextAlign.Center);
}
function __Text__text(): void {
    Text.width('100%');
    Text.textAlign(TextAlign.Start);
    Text.fontSize(14);
    Text.lineHeight(20);
}
function __Text__textTitle(): void {
    Text.width('100%');
    Text.textAlign(TextAlign.Start);
    Text.fontSize(16);
    Text.fontWeight(FontWeight.Bold);
    Text.margin({ top: 20 });
}
class ScanDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__translateWidth = new ObservedPropertySimplePU(1, this, "translateWidth");
        this.__translateHeight = new ObservedPropertySimplePU(1, this, "translateHeight");
        this.__language = this.createStorageLink('scanLanguage', 'zh-Hans-CN', "language");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanDetail_Params) {
        if (params.translateWidth !== undefined) {
            this.translateWidth = params.translateWidth;
        }
        if (params.translateHeight !== undefined) {
            this.translateHeight = params.translateHeight;
        }
    }
    updateStateVars(params: ScanDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__translateWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__translateHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__language.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__translateWidth.aboutToBeDeleted();
        this.__translateHeight.aboutToBeDeleted();
        this.__language.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __translateWidth: ObservedPropertySimplePU<number>;
    get translateWidth() {
        return this.__translateWidth.get();
    }
    set translateWidth(newValue: number) {
        this.__translateWidth.set(newValue);
    }
    private __translateHeight: ObservedPropertySimplePU<number>;
    get translateHeight() {
        return this.__translateHeight.get();
    }
    set translateHeight(newValue: number) {
        this.__translateHeight.set(newValue);
    }
    private __language: ObservedPropertyAbstractPU<string>;
    get language() {
        return this.__language.get();
    }
    set language(newValue: string) {
        this.__language.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.width('100%');
            RelativeContainer.height('100%');
            RelativeContainer.backgroundColor('white');
        }, RelativeContainer);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/access/ScanDetail.ets", line: 54, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "StatusBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
            Column.alignRules({
                top: { anchor: '__container__', align: VerticalAlign.Center },
                left: { anchor: '__container__', align: HorizontalAlign.Center }
            });
            Column.markAnchor({
                top: LengthMetrics.vp(this.translateHeight),
                start: LengthMetrics.vp(this.translateWidth),
            });
            Column.onSizeChange((_: SizeOptions, newValue: SizeOptions) => {
                if (newValue && typeof newValue.width === 'number' && typeof newValue.height === 'number') {
                    this.translateWidth = newValue.width / 2;
                    this.translateHeight = newValue.height / 2;
                }
            });
            Column.id('columnScanDetail');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__textHead();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__textTitle();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__textTitle();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777240, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__text();
            Text.margin({ top: 20 });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": -1, "type": 30000, params: [this.language === 'zh-Hans-CN' ? 'access.jpg' : 'accessEs.jpg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Image.height(150);
        }, Image);
        Column.pop();
        Column.pop();
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScanDetail";
    }
}
registerNamedRoute(() => new ScanDetail(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/access/ScanDetail", pageFullPath: "entry/src/main/ets/pages/access/ScanDetail", integratedHsp: "false", moduleType: "followWithHap" });
