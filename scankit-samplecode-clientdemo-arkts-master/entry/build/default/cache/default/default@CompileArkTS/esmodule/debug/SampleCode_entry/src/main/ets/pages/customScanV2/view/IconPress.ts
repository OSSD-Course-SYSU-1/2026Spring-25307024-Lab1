if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import accessibility from "@ohos:accessibility";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanLayout";
function __Column__iconContainerMaskLayer(): void {
    Column.width(48);
    Column.height(48);
    Column.borderRadius(48);
    Column.clip(true);
}
function __Column__iconContainer(): void {
    Column.width(48);
    Column.height(48);
    Column.borderRadius(48);
    Column.clip(true);
    Column.alignItems(HorizontalAlign.Center);
    Column.justifyContent(FlexAlign.Center);
    Column.backgroundColor({ "id": 125829512, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
}
function __SymbolGlyph__icon(): void {
    SymbolGlyph.fontColor([{ "id": 125830987, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }]);
    SymbolGlyph.fontWeight(FontWeight.Regular);
    SymbolGlyph.fontSize('24vp');
}
function __Text__iconText(): void {
    Text.fontColor({ "id": 125830987, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Text.textAlign(TextAlign.Center);
    Text.fontFamily('HarmonyHeiTi');
    Text.maxLines(2);
    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
}
const BREAKPOINT_SM: string = BreakpointConstants.BREAKPOINT_SM;
const BREAKPOINT_MD: string = BreakpointConstants.BREAKPOINT_MD;
const BREAKPOINT_LG: string = BreakpointConstants.BREAKPOINT_LG;
const BREAKPOINT_XL: string = BreakpointConstants.BREAKPOINT_XL;
const ICON_MARGIN_BOTTOM_WITHOUT_TEXT: number = 12;
const ICON_MARGIN_BOTTOM_WITH_TEXT: number = 0;
const TEXT_MARGIN_BOTTOM: number = 2;
const TEXT_MARGIN_TOP: number = 6; // 4 + 2
export class IconPress extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.scanLayout = ScanLayout.getInstance();
        this.initParam("url", (params && "url" in params) ? params.url : undefined);
        this.initParam("text", (params && "text" in params) ? params.text : undefined);
        this.initParam("iconId", (params && "iconId" in params) ? params.iconId : undefined);
        this.imageClick = "imageClick" in params ? params.imageClick : () => {
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.scanLayout = ScanLayout.getInstance();
        this.resetParam("url", (params && "url" in params) ? params.url : undefined);
        this.resetParam("text", (params && "text" in params) ? params.text : undefined);
        this.resetParam("iconId", (params && "iconId" in params) ? params.iconId : undefined);
        this.imageClick = "imageClick" in params ? params.imageClick : () => {
        };
    }
    @Local
    scanLayout: ScanLayout;
    @Param
    readonly url: Resource;
    @Param
    readonly text: Resource;
    @Param
    readonly iconId: string;
    @Event
    imageClick: () => void;
    IconBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            ViewStackProcessor.visualState("pressed");
            __Column__iconContainerMaskLayer();
            Column.backgroundColor({ "id": 125829167, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            ViewStackProcessor.visualState("normal");
            __Column__iconContainerMaskLayer();
            Column.backgroundColor({ "id": 125831090, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            ViewStackProcessor.visualState();
            Column.margin({
                bottom: this.scanLayout.widthBreakpoint === BREAKPOINT_SM &&
                    (this.scanLayout.heightBreakpoint === BREAKPOINT_SM ||
                        this.scanLayout.heightBreakpoint === BREAKPOINT_MD) ? ICON_MARGIN_BOTTOM_WITHOUT_TEXT :
                    ICON_MARGIN_BOTTOM_WITH_TEXT,
            });
            Column.onClick(() => {
                this.imageClick();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            __Column__iconContainer();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(this.url);
            __SymbolGlyph__icon();
        }, SymbolGlyph);
        Column.pop();
        Column.pop();
    }
    textBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            __Text__iconText();
            Text.fontSize({ "id": 125830972, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_SYMBOL_TEXT);
            Text.margin({
                bottom: TEXT_MARGIN_BOTTOM,
                top: TEXT_MARGIN_TOP
            });
        }, Text);
        Text.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.id(this.iconId);
            Column.justifyContent(this.scanLayout.widthBreakpoint === BREAKPOINT_SM ? FlexAlign.End : FlexAlign.Center);
            Column.height(this.scanLayout.widthBreakpoint === BREAKPOINT_SM ? '100%' : '');
            Column.accessibilityGroup(true);
            Column.onClick(() => {
                if (accessibility.isOpenAccessibilitySync()) {
                    this.imageClick();
                }
            });
        }, Column);
        this.IconBuilder.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((this.scanLayout.widthBreakpoint === BREAKPOINT_SM &&
                (this.scanLayout.heightBreakpoint === BREAKPOINT_LG || this.scanLayout.heightBreakpoint === BREAKPOINT_XL)) ||
                this.scanLayout.widthBreakpoint !== BREAKPOINT_SM) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.textBuilder.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("url" in params) {
            this.updateParam("url", params.url);
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("iconId" in params) {
            this.updateParam("iconId", params.iconId);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
