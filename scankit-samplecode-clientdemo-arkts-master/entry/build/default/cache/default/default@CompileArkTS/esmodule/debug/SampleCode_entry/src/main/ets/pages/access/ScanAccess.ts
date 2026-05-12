if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanAccess_Params {
    translateWidth?: number;
    translateHeight?: number;
}
import { LengthMetrics } from "@ohos:arkui.node";
import { CustomButton } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/CommonComponents";
import { StatusBar } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/StatusBar";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
class ScanAccess extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__translateWidth = new ObservedPropertySimplePU(1, this, "translateWidth");
        this.__translateHeight = new ObservedPropertySimplePU(1, this, "translateHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanAccess_Params) {
        if (params.translateWidth !== undefined) {
            this.translateWidth = params.translateWidth;
        }
        if (params.translateHeight !== undefined) {
            this.translateHeight = params.translateHeight;
        }
    }
    updateStateVars(params: ScanAccess_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__translateWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__translateHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__translateWidth.aboutToBeDeleted();
        this.__translateHeight.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.width('100%');
            RelativeContainer.height('100%');
        }, RelativeContainer);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBar(this, { isBackToHome: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/access/ScanAccess.ets", line: 29, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isBackToHome: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        isBackToHome: true
                    });
                }
            }, { name: "StatusBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777279, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.id('AccessMessage');
            Text.fontSize(25);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 50 });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomButton(this, {
                        mText: { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, mOnClick: () => {
                            UIContextSelf.pushUrl({
                                url: 'pages/access/ScanDetail'
                            });
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/access/ScanAccess.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mText: { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            mOnClick: () => {
                                UIContextSelf.pushUrl({
                                    url: 'pages/access/ScanDetail'
                                });
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mText: { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomButton" });
        }
        Column.pop();
        RelativeContainer.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScanAccess";
    }
}
registerNamedRoute(() => new ScanAccess(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/access/ScanAccess", pageFullPath: "entry/src/main/ets/pages/access/ScanAccess", integratedHsp: "false", moduleType: "followWithHap" });
