if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { IconPress } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/IconPress";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanLayout";
import { LengthMetrics } from "@ohos:arkui.node";
import { BreakpointType } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/BreakpointType";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { ScanServiceV2 } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanService";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
const breakpointType: BreakpointType<Resource> = new BreakpointType({ "id": 16777283, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, { "id": 16777282, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, { "id": 16777281, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
function __Column__componentColumnContainer(currentBreakpoint: string): void {
    Column.width('100%');
    Column.height('100%');
    Column.alignItems(HorizontalAlign.Center);
    Column.justifyContent(FlexAlign.End);
    Column.padding({
        left: breakpointType.getValue(currentBreakpoint),
        right: breakpointType.getValue(currentBreakpoint)
    });
}
function __Row__componentRowContainer(currentBreakpoint: string): void {
    Row.width('100%');
    Row.height('100%');
    Row.justifyContent(FlexAlign.End);
    Row.alignItems(VerticalAlign.Center);
    Row.padding({
        left: breakpointType.getValue(currentBreakpoint),
        right: breakpointType.getValue(currentBreakpoint)
    });
}
function __SymbolGlyph__lightIcon(): void {
    SymbolGlyph.fontColor([{ "id": 125830987, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }]);
    SymbolGlyph.fontWeight(FontWeight.Regular);
    SymbolGlyph.fontSize('24vp');
}
function __Text__lightText(): void {
    Text.fontColor({ "id": 125831057, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Text.textAlign(TextAlign.Center);
    Text.fontFamily('HarmonyHeiTi');
    Text.height(16);
    Text.lineHeight(16);
}
export class FlashLight extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.scanService = ScanServiceV2.getInstance();
        this.initParam("isLargeScreen", (params && "isLargeScreen" in params) ? params.isLargeScreen : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.scanService = ScanServiceV2.getInstance();
        this.resetParam("isLargeScreen", (params && "isLargeScreen" in params) ? params.isLargeScreen : undefined);
    }
    @Local
    scanService: ScanServiceV2;
    @Param
    readonly isLargeScreen: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(CommonConstants.FLASH_HEIGHT);
            Column.padding({
                top: 3,
                bottom: 3
            });
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.scanService.changeFlashlight();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create(this.scanService.isFlashlight ? { "id": 125831528, "type": 40000, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 125831526, "type": 40000, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __SymbolGlyph__lightIcon();
            SymbolGlyph.margin({ bottom: 6 });
            ViewStackProcessor.visualState("pressed");
            SymbolGlyph.opacity(0.4);
            ViewStackProcessor.visualState("normal");
            SymbolGlyph.opacity(1);
            ViewStackProcessor.visualState();
        }, SymbolGlyph);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.scanService.isFlashlight ? { "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Text__lightText();
            Text.fontSize({ "id": 125830972, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_SYMBOL_TEXT);
        }, Text);
        Text.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("isLargeScreen" in params) {
            this.updateParam("isLargeScreen", params.isLargeScreen);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class ScanBottom extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.scanService = ScanServiceV2.getInstance();
        this.scanLayout = ScanLayout.getInstance();
        this.initParam("enableAlbum", (params && "enableAlbum" in params) ? params.enableAlbum : undefined);
        this.openPicker = "openPicker" in params ? params.openPicker : () => {
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.scanService = ScanServiceV2.getInstance();
        this.scanLayout = ScanLayout.getInstance();
        this.resetParam("enableAlbum", (params && "enableAlbum" in params) ? params.enableAlbum : undefined);
        this.openPicker = "openPicker" in params ? params.openPicker : () => {
        };
    }
    @Local
    scanService: ScanServiceV2;
    @Local
    scanLayout: ScanLayout;
    @Param
    readonly enableAlbum: boolean;
    @Event
    openPicker: () => void;
    IsIconPress(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.enableAlbum) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IconPress(this, {
                                    url: { "id": 125832430, "type": 40000, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                    text: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                    iconId: 'scan_page_openPicker',
                                    imageClick: () => {
                                        this.openPicker();
                                    }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/view/ScanBottom.ets", line: 114, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        url: { "id": 125832430, "type": 40000, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                        text: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                        iconId: 'scan_page_openPicker',
                                        imageClick: () => {
                                            this.openPicker();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    url: { "id": 125832430, "type": 40000, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                    text: { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                    iconId: 'scan_page_openPicker'
                                });
                            }
                        }, { name: "IconPress" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    SMBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            __Column__componentColumnContainer(this.scanLayout.widthBreakpoint);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({
                bottom: this.scanLayout.flashToGallery
            });
            __Common__.visibility((this.scanService.isFlashlight || this.scanService.isSensorLight)
                && this.scanLayout.isFlashShow ? Visibility.Visible : Visibility.Hidden);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // Flash light.
                    FlashLight(this, {
                        isLargeScreen: false
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/view/ScanBottom.ets", line: 129, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isLargeScreen: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        isLargeScreen: false
                    });
                }
            }, { name: "FlashLight" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Image button area.
            Row.create();
            // Image button area.
            Row.height(this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_SM ||
                this.scanLayout.heightBreakpoint === BreakpointConstants.BREAKPOINT_MD ? CommonConstants.ICON_PRESS_HEIGHT :
                CommonConstants.ICON_PRESS_TEXT_HEIGHT);
            // Image button area.
            Row.width('100%');
            // Image button area.
            Row.margin({
                bottom: this.scanLayout.galleryMarginBottom
            });
            // Image button area.
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.IsIconPress.bind(this)();
        // Image button area.
        Row.pop();
        Column.pop();
    }
    NotSMBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            __Row__componentRowContainer(this.scanLayout.widthBreakpoint);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({
                end: LengthMetrics.vp(this.scanLayout.flashToGallery)
            });
            __Common__.visibility((this.scanService.isFlashlight || this.scanService.isSensorLight)
                && this.scanLayout.isFlashShow ? Visibility.Visible : Visibility.Hidden);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new FlashLight(this, {
                        isLargeScreen: true
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/view/ScanBottom.ets", line: 157, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isLargeScreen: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        isLargeScreen: true
                    });
                }
            }, { name: "FlashLight" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
            Column.width(this.scanLayout.galleryAreaWidth);
        }, Column);
        this.IsIconPress.bind(this)();
        Column.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.scanLayout.widthBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.SMBuilder.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.NotSMBuilder.bind(this)();
                });
            }
        }, If);
        If.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("enableAlbum" in params) {
            this.updateParam("enableAlbum", params.enableAlbum);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
