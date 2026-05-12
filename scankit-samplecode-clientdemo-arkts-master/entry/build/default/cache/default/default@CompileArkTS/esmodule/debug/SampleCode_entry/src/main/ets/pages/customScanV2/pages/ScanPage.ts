if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import display from "@ohos:display";
import { LengthMetrics } from "@ohos:arkui.node";
import type customScan from "@hms:core.scan.customScan";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import type { AsyncCallback } from "@ohos:base";
import type { BusinessError } from "@ohos:base";
import emitter from "@ohos:events.emitter";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { ScanLine } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/ScanLine";
import { ScanBottom } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/ScanBottom";
import { CodeLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/CommonCodeLayout";
import { ScanTitle } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/ScanTitle";
import { openAlbum } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/OpenPhoto";
import { MaskLayer } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/MaskLayer";
import { ScanServiceV2, ScanStatus } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanService";
import type { ScanResults } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanService";
import { ScanXComponent } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/ScanXComponent";
import { ScanLoading } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/ScanLoading";
import { PermissionsUtil } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/PermissionsUtil";
import { CommonTipsDialog } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/CommonTipsDialog";
import { WindowServiceV2 } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/WindowService";
import { XComponentService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/XComponentService";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanLayout";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { DeviceService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/DeviceService";
import { PromptTone } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/PromptTone";
import { BREAK_POINT_TYPE_MARGIN_VP } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/BreakpointType";
const TAG = 'ScanPageV2';
let timerId: number | null;
function __Row__tipContainer(): void {
    Row.margin({
        top: 16
    });
    Row.padding(8);
    Row.backgroundColor({ "id": 125830783, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Row.borderRadius({ "id": 125830915, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
}
class ScanPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.tipShow = false;
        this.xComponentService = XComponentService.getInstance();
        this.windowService = WindowServiceV2.getInstance();
        this.scanLayout = ScanLayout.getInstance();
        this.scanService = ScanServiceV2.getInstance();
        this.scanResult = this.scanService.scanResult;
        this.densityDPI = 0;
        this.viewControl = {
            width: this.xComponentService.width,
            height: this.xComponentService.height,
            surfaceId: this.xComponentService.surfaceId
        };
        this.userGrant = false;
        this.options = {
            scanTypes: [scanCore.ScanType.ALL],
            enableMultiMode: true,
            enableAlbum: true
        };
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CommonTipsDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 77, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            autoCancel: false,
            customStyle: false,
            alignment: DialogAlignment.Center
        }, this);
        this.avPlayer = null;
        this.photoPickerCallback = async (error: BusinessError, result: scanBarcode.ScanResult[]) => {
            Logger.info(TAG, `photoPickerCallback start. Code: ${error.code}, message: ${error.message},scanStatus: ${this.scanService.scanStatus}`);
            if (this.scanService.scanStatus === ScanStatus.NO_PHOTO_SELECT) {
                this.startCustomScan();
            }
            else {
                // ScanStatus: PHOTO_DECODING_COMPLETED
                this.handleDecodeResult(error, result);
                this.scanService.updateScanStatus(ScanStatus.PHOTO_DECODING_COMPLETED);
            }
        };
        this.customScanCallback = async (error: BusinessError, result: scanBarcode.ScanResult[]) => {
            if (this.scanService.retryOnCondition(error, this.options, this.viewControl, this.customScanCallback)) {
                return;
            }
            if (this.scanService.scanStatus === ScanStatus.PREVIEW_DECODING) {
                this.handleDecodeResult(error, result);
                if (this.scanResult.size > 0) {
                    this.scanService.stopPreviewStream();
                    Logger.info(TAG, `customScanCallback, scanStatus: ${this.scanService.scanStatus}`);
                    this.scanService.updateScanStatus(ScanStatus.PREVIEW_DECODING_COMPLETED);
                    this.clearTimer();
                }
            }
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.tipShow = false;
        this.xComponentService = XComponentService.getInstance();
        this.windowService = WindowServiceV2.getInstance();
        this.scanLayout = ScanLayout.getInstance();
        this.scanService = ScanServiceV2.getInstance();
        this.scanResult = this.scanService.scanResult;
        this.densityDPI = 0;
        this.viewControl = {
            width: this.xComponentService.width,
            height: this.xComponentService.height,
            surfaceId: this.xComponentService.surfaceId
        };
        this.userGrant = false;
    }
    @Local
    tipShow: boolean; // Determine whether to display the message indicating that no barcode is recognized.
    @Local
    xComponentService: XComponentService;
    @Local
    windowService: WindowServiceV2;
    @Local
    scanLayout: ScanLayout;
    @Local
    scanService: ScanServiceV2;
    @Local
    scanResult: ScanResults;
    @Local
    densityDPI: number; // Pixel density.
    @Local
    viewControl: customScan.ViewControl;
    @Local
    userGrant: boolean; // Check whether the camera permission is granted.
    options: scanBarcode.ScanOptions;
    dialogController: CustomDialogController;
    public avPlayer: PromptTone | null; // Audio notification after successful barcode scanning.
    photoPickerCallback: AsyncCallback<scanBarcode.ScanResult[]>;
    customScanCallback: AsyncCallback<scanBarcode.ScanResult[]>;
    aboutToAppear() {
        Logger.info(TAG, 'aboutToAppear.');
        if (DeviceService.isFolding) {
            DeviceService.newFoldStatus = DeviceService.getFoldStatusByDisplay();
            DeviceService.oldFoldStatus = DeviceService.newFoldStatus;
            // Foldable screen status listener.
            this.foldStatusSubscribe();
        }
        // Window size listener.
        this.windowSizeSubscribe();
        // Pixel density listener.
        this.onDisplayChange();
        // Screen event listener.
        this.onScreenEvent();
        this.windowService.enterCustomScanPage();
    }
    async onPageShow(): Promise<void> {
        Logger.info(TAG, 'onPageShow.');
        if (this.scanService.scanStatus !== ScanStatus.PHOTO_DECODING) {
            await this.empowerment();
        }
    }
    onPageHide(): void {
        Logger.info(TAG, 'onPageHide.');
        if (this.scanService.scanStatus !== ScanStatus.PHOTO_DECODING) {
            this.scanService.stopPreviewStream();
            this.scanService.updateScanStatus(ScanStatus.FORBIDDEN);
            this.clearTimer();
            this.userGrant = false;
            this.dialogController.close();
        }
    }
    async aboutToDisappear(): Promise<void> {
        Logger.info(TAG, 'aboutToDisappear.');
        try {
            emitter.off(CommonConstants.WINDOW_SIZE_CHANGE);
            if (DeviceService.isFolding) {
                display.off('foldStatusChange');
            }
        }
        catch (error) {
            Logger.error(TAG, `listener off catch error. Code: ${error?.code}`);
        }
        this.offDisplayChange();
        this.offScreenEvent();
        this.windowService.leaveCustomScanPage();
    }
    BackgroundBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.height('100%');
            __Common__.width('100%');
            __Common__.position({ x: 0, y: 0 });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ScanXComponent(this, {
                        startCustomScan: (() => {
                            this.startCustomScan();
                        })
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 167, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            startCustomScan: (() => {
                                this.startCustomScan();
                            })
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ScanXComponent" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Loading animation before redirection from gallery-based barcode image recognition.
            if (this.scanService.isAlbumLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ScanLoading(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 177, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ScanLoading" });
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
    ScanTitleBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Scan title.
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ScanTitle(this, {
                        scanResultSize: this.scanResult.size,
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 185, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            scanResultSize: this.scanResult.size
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        scanResultSize: this.scanResult.size
                    });
                }
            }, { name: "ScanTitle" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.tipShow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        __Row__tipContainer();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                        Text.fontSize({ "id": 125829685, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                        Text.fontFamily('HarmonyHeiTi');
                        Text.fontColor({ "id": 125829216, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // Scan title.
        Column.pop();
    }
    ScanLineBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Scanning line.
            if (this.scanService.scanStatus === ScanStatus.PREVIEW_DECODING) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.justifyContent(FlexAlign.Start);
                        Column.width('100%');
                        Column.height('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.height(`calc(100% - ${this.scanLayout.scanLineMarginTop}vp - ${this.scanLayout.scanLineMarginBottom}vp)`);
                        __Common__.margin({
                            top: this.scanLayout.scanLineMarginTop
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ScanLine(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 205, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ScanLine" });
                    }
                    __Common__.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    ScanBottomBuilder(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // Gallery, flash light
                    ScanBottom(this, {
                        enableAlbum: this.options.enableAlbum,
                        openPicker: (async () => {
                            if (this.scanService.scanStatus === ScanStatus.PREVIEW_DECODING) {
                                await this.scanService.stopPreviewStream();
                                this.scanService.resetRetryScanTimes();
                                this.clearTimer();
                                this.scanService.updateScanStatus(ScanStatus.PHOTO_DECODING);
                                Logger.info(TAG, `openAlbum, scanStatus: ${this.scanService.scanStatus}`);
                                openAlbum(this.photoPickerCallback);
                            }
                        })
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 219, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            enableAlbum: this.options.enableAlbum,
                            openPicker: (async () => {
                                if (this.scanService.scanStatus === ScanStatus.PREVIEW_DECODING) {
                                    await this.scanService.stopPreviewStream();
                                    this.scanService.resetRetryScanTimes();
                                    this.clearTimer();
                                    this.scanService.updateScanStatus(ScanStatus.PHOTO_DECODING);
                                    Logger.info(TAG, `openAlbum, scanStatus: ${this.scanService.scanStatus}`);
                                    openAlbum(this.photoPickerCallback);
                                }
                            })
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        enableAlbum: this.options.enableAlbum
                    });
                }
            }, { name: "ScanBottom" });
        }
    }
    MaskLayerBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Radio button information in the single-code and multi-code scanning results.
            if (this.scanService.isDecodingCompleted()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MaskLayer(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 238, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "MaskLayer" });
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
    CodeLayoutBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Display the radio button for scanning a single barcode or multiple barcodes.
            if (this.scanService.isDecodingCompleted()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CodeLayout(this, {
                                    scanResults: this.scanResult,
                                    restartPreviewStream: (() => {
                                        Logger.info(TAG, 'Start to restartPreviewStream by dialog button.');
                                        this.restartPreviewStream();
                                    })
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/pages/ScanPage.ets", line: 247, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        scanResults: this.scanResult,
                                        restartPreviewStream: (() => {
                                            Logger.info(TAG, 'Start to restartPreviewStream by dialog button.');
                                            this.restartPreviewStream();
                                        })
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    scanResults: this.scanResult
                                });
                            }
                        }, { name: "CodeLayout" });
                    }
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    CloseButtonBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({
                type: ButtonType.Circle,
                stateEffect: true
            });
            Button.width(CommonConstants.CLOSE_IMAGE_SIZE);
            Button.height(CommonConstants.CLOSE_IMAGE_SIZE);
            Button.backgroundColor('rgba(255,255,255,0.15)');
            Button.id('scan_page_goBack_v2');
            Button.margin({
                top: LengthMetrics.vp(this.scanLayout.closeButtonMarginTop),
                start: LengthMetrics.vp(BREAK_POINT_TYPE_MARGIN_VP.getValue(this.scanLayout.widthBreakpoint))
            });
            Button.onClick(async () => {
                if (this.scanResult.size > 1) {
                    Logger.info(TAG, 'Start to restartPreviewStream by close button.');
                    this.scanService.resetRetryScanTimes();
                    this.restartPreviewStream();
                }
                else {
                    Logger.info(TAG, 'router back');
                    UIContextSelf.getRouter().back();
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            SymbolGlyph.create({ "id": 125831487, "type": 40000, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            SymbolGlyph.fontWeight(FontWeight.Regular);
            SymbolGlyph.fontColor([{ "id": 125830987, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }]);
            SymbolGlyph.fontSize('24vp');
        }, SymbolGlyph);
        Button.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor(this.userGrant ? Color.Transparent : Color.Black);
            Gesture.create(GesturePriority.Low);
            GestureGroup.create(GestureMode.Exclusive);
            TapGesture.create({ count: 2 });
            TapGesture.onAction((_: GestureEvent) => {
                this.scanService.tapGesture();
            });
            TapGesture.pop();
            PinchGesture.create({
                fingers: 2
            });
            PinchGesture.onActionStart((_: GestureEvent) => {
                this.scanService.pinchGestureStart();
            });
            PinchGesture.onActionUpdate((event: GestureEvent) => {
                if (event && event.scale) {
                    this.scanService.pinchGestureUpdate(event.scale);
                }
            });
            PinchGesture.onActionEnd((_: GestureEvent) => {
                Logger.info(TAG, 'pinchGestureEnd');
            });
            PinchGesture.pop();
            GestureGroup.pop();
            Gesture.pop();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.userGrant) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.BackgroundBuilder.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.ScanLineBuilder.bind(this)();
        this.ScanBottomBuilder.bind(this)();
        this.MaskLayerBuilder.bind(this)();
        this.ScanTitleBuilder.bind(this)();
        this.CodeLayoutBuilder.bind(this)();
        this.CloseButtonBuilder.bind(this)();
        Stack.pop();
    }
    // Code recognition information processing.
    handleDecodeResult(error: BusinessError, result: scanBarcode.ScanResult[]): void {
        if (result) {
            this.scanResult.size = result.length;
            // Barcode image information recognized.
            if (this.scanResult.size > 0) {
                this.scanResult.code = (error && error.code) ? error.code : 0;
                this.scanResult.data = result;
                this.avPlayer?.playDrip();
            }
        }
    }
    onScreenEvent(): void {
        // Subscribe to COMMON_EVENT_SCREEN_CHANGE.
        emitter.on({ eventId: CommonConstants.COMMON_EVENT_SCREEN_CHANGE }, (eventData: emitter.EventData) => {
            Logger.info(TAG, 'screenEventChange enter');
            if (eventData.data && eventData.data.screenEventChange === CommonConstants.EVENT_SCREEN_OFF) {
                this.onPageHide();
            }
            else if (eventData.data && eventData.data.screenEventChange === CommonConstants.EVENT_SCREEN_ON) {
                this.onPageShow();
            }
        });
    }
    offScreenEvent(): void {
        emitter.off(CommonConstants.COMMON_EVENT_SCREEN_CHANGE);
    }
    async empowerment() {
        const permissions: Array<Permissions> = ['ohos.permission.CAMERA'];
        let grantStatus = await PermissionsUtil.checkAccessToken(permissions[0]);
        if (grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
            // If the user has granted the permission, the operation is allowed.
            this.userGrant = true;
            this.scanService.updateScanStatus(ScanStatus.NOT_STARTED);
            this.startCustomScan();
        }
        else {
            // Apply for the camera permission.
            this.requestCameraPermission();
        }
    }
    async requestCameraPermission() {
        const grantStatus: number[] = await PermissionsUtil.reqPermissionsFromUser();
        if (grantStatus[0] === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED) {
            // The user has granted the permission.
            Logger.info(TAG, 'Succeeded in requesting permissions from user.');
            this.userGrant = true;
            this.scanService.updateScanStatus(ScanStatus.NOT_STARTED);
            this.dialogController.close();
            this.startCustomScan();
        }
        else {
            // If the user refuses to grant the permission, display a message indicating that user authorization is required, and direct the user to set the permission in system settings.
            Logger.info(TAG, 'Failed to requesting permissions from user.');
            this.userGrant = false;
            this.dialogController.open();
        }
    }
    onDisplayChange(): void {
        display.on('change', () => {
            let newDisplay = DeviceService.getDisplayInfoSync();
            Logger.info(TAG, `onDisplayChange, pre_densityPixels: ${DeviceService.densityPixels}, new_densityPixels: ${newDisplay?.densityPixels}.pre_rotation: ${DeviceService.rotation}, new_rotation: ${newDisplay?.rotation}.`);
            if (newDisplay !== null) {
                // The device rotates.
                if (DeviceService.rotation !== newDisplay.rotation) {
                    Logger.info(TAG, `onDisplayChange, pre_rotation: ${DeviceService.rotation}, new_rotation: ${newDisplay.rotation}.`);
                    let rotationAngle: number = Math.abs(DeviceService.rotation - newDisplay.rotation);
                    DeviceService.setDisplayInfo(newDisplay);
                    // The device rotates and the screen density changes.
                    if (DeviceService.densityPixels !== newDisplay.densityPixels) {
                        this.windowService.refreshLayoutByDensityPixels(DeviceService.densityPixels);
                    }
                    else {
                        this.xComponentService.setScanXComponentSize();
                    }
                    // rotationAngle === 2 indicates that the rotation angle is 180 degrees. In this case, you do not need to initialize the width and height of XComponent. Instead, you can directly use initScan.
                    if (rotationAngle === 2) {
                        this.startCustomScan();
                    }
                    // The device screen density changes.
                }
                else if (DeviceService.densityPixels !== newDisplay.densityPixels) {
                    Logger.info(TAG, `onDisplayChange, pre_densityPixels: ${DeviceService.densityPixels}, new_densityPixels: ${newDisplay.densityPixels}.`);
                    DeviceService.setDisplayInfo(newDisplay);
                    this.windowService.refreshLayoutByDensityPixels(DeviceService.densityPixels);
                }
                else {
                    DeviceService.setDisplayInfo(newDisplay);
                }
            }
        });
    }
    offDisplayChange(): void {
        try {
            display.off('change');
        }
        catch (error) {
            Logger.error(TAG, `offDensityDPI off catch error. Code: ${error?.code}`);
        }
    }
    startCustomScan(): void {
        this.viewControl = {
            width: this.xComponentService.width,
            height: this.xComponentService.height,
            surfaceId: this.xComponentService.surfaceId
        };
        if (this.xComponentService.surfaceId) {
            Logger.info(TAG, `startCustomScan, surfaceId: ${this.xComponentService.surfaceId}`);
            this.scanService.startPreviewStream(this.options, this.viewControl, this.customScanCallback);
            this.startTimer();
            this.avPlayer = PromptTone.getInstance(UIContextSelf.getHostContext());
        }
    }
    clearTimer() {
        if (timerId !== null) {
            clearTimeout(timerId);
            timerId = null;
            this.tipShow = false;
        }
    }
    startTimer() {
        this.clearTimer();
        timerId = setTimeout(() => {
            if (this.userGrant && this.scanResult.size === 0) {
                this.tipShow = true;
            }
        }, 5000);
    }
    windowSizeSubscribe(): void {
        // Respond to the window size change.
        emitter.on({ eventId: CommonConstants.WINDOW_SIZE_CHANGE }, async (eventData: emitter.EventData) => {
            Logger.info(TAG, 'windowSizeChange enter');
            if (eventData.data) {
                if (DeviceService.oldFoldStatus !== DeviceService.newFoldStatus) {
                    DeviceService.oldFoldStatus = DeviceService.newFoldStatus;
                    this.clearTimer();
                    await this.scanService.stopPreviewStream();
                    this.scanService.resetRetryScanTimes();
                    DeviceService.selectSuitableRatio();
                    this.xComponentService.setScanXComponentSize();
                }
                this.startCustomScan();
            }
        });
    }
    foldStatusSubscribe(): void {
        try {
            display.on('foldStatusChange', async (foldStatus: display.FoldStatus) => {
                // FOLD_STATUS_FOLDED => FOLD_STATUS_HALF_FOLDED; FOLD_STATUS_EXPANDED or FOLD_STATUS_HALF_FOLDED => FOLD_STATUS_FOLDED
                Logger.info(TAG, `foldStatus has changed, pre_foldStatus: ${DeviceService.newFoldStatus}, new_foldStatus: ${foldStatus}`);
                DeviceService.oldFoldStatus = DeviceService.newFoldStatus;
                DeviceService.newFoldStatus = foldStatus;
            });
        }
        catch (error) {
            Logger.error(TAG, `Failed to foldStatusListen. Code: ${error?.code}`);
        }
    }
    restartPreviewStream() {
        this.scanService.startPreviewStream(this.options, this.viewControl, this.customScanCallback);
        this.startTimer();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScanPage";
    }
}
if (UIContextSelf.getSharedLocalStorage() && UIContextSelf.getSharedLocalStorage().routeName != undefined && UIContextSelf.getSharedLocalStorage().storage != undefined) {
    registerNamedRoute(() => new ScanPage(undefined, {}, UIContextSelf.getSharedLocalStorage().useSharedStorage ? LocalStorage.getShared() : UIContextSelf.getSharedLocalStorage().storage), UIContextSelf.getSharedLocalStorage().routeName, { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/customScanV2/pages/ScanPage", pageFullPath: "entry/src/main/ets/pages/customScanV2/pages/ScanPage", integratedHsp: "false", moduleType: "followWithHap" });
}
else if (UIContextSelf.getSharedLocalStorage() && UIContextSelf.getSharedLocalStorage().routeName != undefined && UIContextSelf.getSharedLocalStorage().storage == undefined) {
    registerNamedRoute(() => new ScanPage(undefined, {}, UIContextSelf.getSharedLocalStorage().useSharedStorage ? LocalStorage.getShared() : UIContextSelf.getSharedLocalStorage().storage), UIContextSelf.getSharedLocalStorage().routeName, { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/customScanV2/pages/ScanPage", pageFullPath: "entry/src/main/ets/pages/customScanV2/pages/ScanPage", integratedHsp: "false", moduleType: "followWithHap" });
}
else if (UIContextSelf.getSharedLocalStorage() && UIContextSelf.getSharedLocalStorage().routeName == undefined && UIContextSelf.getSharedLocalStorage().storage != undefined) {
    registerNamedRoute(() => new ScanPage(undefined, {}, UIContextSelf.getSharedLocalStorage().useSharedStorage ? LocalStorage.getShared() : UIContextSelf.getSharedLocalStorage().storage), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/customScanV2/pages/ScanPage", pageFullPath: "entry/src/main/ets/pages/customScanV2/pages/ScanPage", integratedHsp: "false", moduleType: "followWithHap" });
}
else if (UIContextSelf.getSharedLocalStorage() && UIContextSelf.getSharedLocalStorage().useSharedStorage != undefined) {
    registerNamedRoute(() => new ScanPage(undefined, {}, UIContextSelf.getSharedLocalStorage().useSharedStorage ? LocalStorage.getShared() : undefined), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/customScanV2/pages/ScanPage", pageFullPath: "entry/src/main/ets/pages/customScanV2/pages/ScanPage", integratedHsp: "false", moduleType: "followWithHap" });
}
else {
    registerNamedRoute(() => new ScanPage(undefined, {}, UIContextSelf.getSharedLocalStorage()), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/customScanV2/pages/ScanPage", pageFullPath: "entry/src/main/ets/pages/customScanV2/pages/ScanPage", integratedHsp: "false", moduleType: "followWithHap" });
}
