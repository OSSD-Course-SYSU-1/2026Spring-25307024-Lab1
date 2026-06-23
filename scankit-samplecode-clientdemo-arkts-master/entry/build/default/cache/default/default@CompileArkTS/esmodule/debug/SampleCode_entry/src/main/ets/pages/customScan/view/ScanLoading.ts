if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanLoading_Params {
    scanLayout?: ScanLayout;
}
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { BreakpointType } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/BreakpointType";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanLayout";
const LOADING_OFFSET_Y: number = -36;
function __LoadingProgress__loadingIcon(): void {
    LoadingProgress.color({ "id": 125829495, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    LoadingProgress.width(72);
    LoadingProgress.height(72);
}
function __Text__loadingText(): void {
    Text.fontFamily('HarmonyHeiTi');
    Text.fontSize({ "id": 125830971, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Text.fontWeight(FontWeight.Regular);
    Text.textAlign(TextAlign.Center);
    Text.fontColor({ "id": 125829217, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Text.lineHeight(19);
    Text.margin({
        top: 16
    });
}
export class ScanLoading extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__scanLayout = new ObservedPropertyObjectPU(ScanLayout.getInstance(), this, "scanLayout");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanLoading_Params) {
        if (params.scanLayout !== undefined) {
            this.scanLayout = params.scanLayout;
        }
    }
    updateStateVars(params: ScanLoading_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scanLayout.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scanLayout.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __scanLayout: ObservedPropertyObjectPU<ScanLayout>;
    get scanLayout() {
        return this.__scanLayout.get();
    }
    set scanLayout(newValue: ScanLayout) {
        this.__scanLayout.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.End);
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.Black);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(new BreakpointType(BreakpointConstants.LOADING_HEIGHT_SM, BreakpointConstants.LOADING_HEIGHT_MD, BreakpointConstants.LOADING_HEIGHT_LG).getValue(this.scanLayout.widthBreakpoint));
            Column.offset({
                y: LOADING_OFFSET_Y
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            __LoadingProgress__loadingIcon();
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__loadingText();
            Text.maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_SYMBOL_TEXT);
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
