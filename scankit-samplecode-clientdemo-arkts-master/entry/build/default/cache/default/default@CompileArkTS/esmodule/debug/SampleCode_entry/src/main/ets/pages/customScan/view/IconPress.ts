if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IconPress_Params {
    scanLayout?: ScanLayout;
    url?: Resource;
    text?: Resource;
    iconId?: string;
    imageClick?: () => void;
}
import accessibility from "@ohos:accessibility";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanLayout";
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
export class IconPress extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__scanLayout = new ObservedPropertyObjectPU(ScanLayout.getInstance(), this, "scanLayout");
        this.__url = new SynchedPropertyObjectOneWayPU(params.url, this, "url");
        this.__text = new SynchedPropertyObjectOneWayPU(params.text, this, "text");
        this.__iconId = new SynchedPropertySimpleOneWayPU(params.iconId, this, "iconId");
        this.imageClick = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IconPress_Params) {
        if (params.scanLayout !== undefined) {
            this.scanLayout = params.scanLayout;
        }
        if (params.imageClick !== undefined) {
            this.imageClick = params.imageClick;
        }
    }
    updateStateVars(params: IconPress_Params) {
        this.__url.reset(params.url);
        this.__text.reset(params.text);
        this.__iconId.reset(params.iconId);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scanLayout.purgeDependencyOnElmtId(rmElmtId);
        this.__url.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__iconId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scanLayout.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__iconId.aboutToBeDeleted();
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
    private __url: SynchedPropertySimpleOneWayPU<Resource>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: Resource) {
        this.__url.set(newValue);
    }
    private __text: SynchedPropertySimpleOneWayPU<Resource>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: Resource) {
        this.__text.set(newValue);
    }
    private __iconId: SynchedPropertySimpleOneWayPU<string>;
    get iconId() {
        return this.__iconId.get();
    }
    set iconId(newValue: string) {
        this.__iconId.set(newValue);
    }
    public imageClick: () => void;
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
    rerender() {
        this.updateDirtyElements();
    }
}
