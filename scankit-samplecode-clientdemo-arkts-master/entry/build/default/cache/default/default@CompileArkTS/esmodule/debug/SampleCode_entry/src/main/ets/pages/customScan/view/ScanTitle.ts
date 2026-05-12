if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanTitle_Params {
    scanLayout?: ScanLayout;
    scanResultSize?: number;
}
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { BREAK_POINT_TYPE_MARGIN_VP } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/BreakpointType";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanLayout";
function __Text__scanTitle(color: ResourceColor, fontWeight: FontWeight): void {
    Text.textAlign(TextAlign.Center);
    Text.fontFamily('HarmonyHeiTi');
    Text.fontWeight(fontWeight);
    Text.fontColor(color);
    Text.maxLines(2);
    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
}
const TAG = 'ScanTitle';
export class ScanTitle extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__scanLayout = new ObservedPropertyObjectPU(ScanLayout.getInstance(), this, "scanLayout");
        this.__scanResultSize = new SynchedPropertySimpleOneWayPU(params.scanResultSize, this, "scanResultSize");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanTitle_Params) {
        if (params.scanLayout !== undefined) {
            this.scanLayout = params.scanLayout;
        }
        if (params.scanResultSize === undefined) {
            this.__scanResultSize.set(0);
        }
    }
    updateStateVars(params: ScanTitle_Params) {
        this.__scanResultSize.reset(params.scanResultSize);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scanLayout.purgeDependencyOnElmtId(rmElmtId);
        this.__scanResultSize.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scanLayout.aboutToBeDeleted();
        this.__scanResultSize.aboutToBeDeleted();
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
    private __scanResultSize: SynchedPropertySimpleOneWayPU<number>;
    get scanResultSize() {
        return this.__scanResultSize.get();
    }
    set scanResultSize(newValue: number) {
        this.__scanResultSize.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
                Logger.info(TAG, `title height has changed, oldTitleHeight: ${oldValue.height}, newTitleHeight: ${newValue.height}`);
                let titleHeight: number = Number(newValue.height);
                if (Math.abs(this.scanLayout.titleHeight - titleHeight) > 1) {
                    this.scanLayout.setTopLayout(titleHeight);
                }
            });
            Column.id('scan_scan_title');
            Column.alignItems(HorizontalAlign.Center);
            Column.margin({
                top: this.scanLayout.titleMarginTop
            });
            Column.padding({
                left: BREAK_POINT_TYPE_MARGIN_VP.getValue(this.scanLayout.widthBreakpoint),
                right: BREAK_POINT_TYPE_MARGIN_VP.getValue(this.scanLayout.widthBreakpoint)
            });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.scanResultSize > 1 ? { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 16777224, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__scanTitle({ "id": 125829189, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, FontWeight.Regular);
            Text.fontSize({ "id": 125830967, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_TITLE_TEXT);
            Text.width(this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM ||
                this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_MD ? `calc(100% - 80vp - 16vp)` : '100%');
            Text.constraintSize({
                maxWidth: this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM ||
                    this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_MD ? `calc(100% - 80vp - 16vp)` : 460
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
