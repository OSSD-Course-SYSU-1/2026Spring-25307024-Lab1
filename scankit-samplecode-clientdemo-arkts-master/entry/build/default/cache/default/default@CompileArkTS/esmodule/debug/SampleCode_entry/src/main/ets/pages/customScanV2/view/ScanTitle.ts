if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { BREAK_POINT_TYPE_MARGIN_VP } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/BreakpointType";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanLayout";
function __Text__scanTitle(color: ResourceColor, fontWeight: FontWeight): void {
    Text.textAlign(TextAlign.Center);
    Text.fontFamily('HarmonyHeiTi');
    Text.fontWeight(fontWeight);
    Text.fontColor(color);
    Text.maxLines(2);
    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
}
const TAG = 'ScanTitleV2';
export class ScanTitle extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.scanLayout = ScanLayout.getInstance();
        this.initParam("scanResultSize", (params && "scanResultSize" in params) ? params.scanResultSize : 0);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.scanLayout = ScanLayout.getInstance();
        this.resetParam("scanResultSize", (params && "scanResultSize" in params) ? params.scanResultSize : 0);
        this.resetComputed("isSMOrMDBreakpoint");
    }
    @Local
    scanLayout: ScanLayout;
    @Param
    readonly scanResultSize: number;
    @Computed
    get isSMOrMDBreakpoint() {
        return this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM ||
            this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_MD;
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
            Column.id('scan_scan_title_v2');
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
            Text.width(this.isSMOrMDBreakpoint ? `calc(100% - 80vp - 16vp)` : '100%');
            Text.constraintSize({
                maxWidth: this.isSMOrMDBreakpoint ? `calc(100% - 80vp - 16vp)` : 460
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("scanResultSize" in params) {
            this.updateParam("scanResultSize", params.scanResultSize);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
