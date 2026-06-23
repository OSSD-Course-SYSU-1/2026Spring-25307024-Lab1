if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import curves from "@native:ohos.curves";
import type { BusinessError } from "@ohos:base";
import vibrator from "@ohos:vibrator";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { ScanServiceV2, ScanStatus } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanService";
import type { ScanResults } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanService";
import { PickerDialog } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/view/PickerDialog";
import { funcDelayer } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import { XComponentService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/XComponentService";
import { DeviceService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/DeviceService";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { DisplayRotationAngle } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
function __Image__selected(scanState: boolean, x: number, y: number): void {
    Image.width(40);
    Image.height(40);
    Image.position({ x: x, y: y });
    Image.markAnchor({ x: 20, y: 20 });
    Image.visibility(scanState ? Visibility.Visible : Visibility.Hidden);
    Image.draggable(false);
}
const TAG: string = 'CommonCodeLayoutV2';
export class CodeLayout extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.scanService = ScanServiceV2.getInstance();
        this.xComponentService = XComponentService.getInstance();
        this.multiCodeScanLocation = [];
        this.isMultiSelected = false;
        this.multiSelectedIndex = 0;
        this.singleCodeX = 0;
        this.singleCodeY = 0;
        this.multiCodeScale = 0.3;
        this.multiCodeOpacity = 0;
        this.singleCodeScale = 0.3;
        this.singleCodeOpacity = 0;
        this.fadeOutScale = 1;
        this.fadeOutOpacity = 1;
        this.isPickerDialogShow = false;
        this.isShowCode = true;
        this.initParam("scanResults", (params && "scanResults" in params) ? params.scanResults : undefined);
        this.restartPreviewStream = "restartPreviewStream" in params ? params.restartPreviewStream : () => {
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.scanService = ScanServiceV2.getInstance();
        this.xComponentService = XComponentService.getInstance();
        this.multiCodeScanLocation = [];
        this.isMultiSelected = false;
        this.multiSelectedIndex = 0;
        this.singleCodeX = 0;
        this.singleCodeY = 0;
        this.multiCodeScale = 0.3;
        this.multiCodeOpacity = 0;
        this.singleCodeScale = 0.3;
        this.singleCodeOpacity = 0;
        this.fadeOutScale = 1;
        this.fadeOutOpacity = 1;
        this.isPickerDialogShow = false;
        this.isShowCode = true;
        this.resetParam("scanResults", (params && "scanResults" in params) ? params.scanResults : undefined);
        this.restartPreviewStream = "restartPreviewStream" in params ? params.restartPreviewStream : () => {
        };
    }
    @Local
    scanService: ScanServiceV2;
    @Local
    xComponentService: XComponentService;
    @Local
    multiCodeScanLocation: Array<Array<number>>; // Display positions of multiple barcodes.
    @Local
    isMultiSelected: boolean; // Whether a barcode among multiple barcodes is selected.
    @Local
    multiSelectedIndex: number; // Index of the selected barcode.
    @Local
    singleCodeX: number; // X-axis position of a single barcode.
    @Local
    singleCodeY: number; // Y-axis position of a single barcode.
    @Local
    multiCodeScale: number; // Radio button zoom ratio of multiple barcodes.
    @Local
    multiCodeOpacity: number; // Radio button transparency of multiple barcodes.
    @Local
    singleCodeScale: number;
    @Local
    singleCodeOpacity: number;
    @Local
    fadeOutScale: number;
    @Local
    fadeOutOpacity: number;
    @Local
    isPickerDialogShow: boolean;
    @Local
    isShowCode: boolean;
    @Param
    readonly scanResults: ScanResults;
    @Event
    restartPreviewStream: () => void;
    aboutToAppear() {
        if (this.scanService.scanStatus === ScanStatus.PHOTO_DECODING_COMPLETED) {
            // Not display the radio button for the gallery.
            if (this.scanResults.size === 0) {
                // No code value is recognized.
                this.isPickerDialogShow = true;
            }
            else {
                this.vibratorPlay();
                this.isShowCode = false;
                funcDelayer(() => {
                    this.terminateSelfPage();
                }, 200);
            }
        }
        else {
            this.vibratorPlay();
            // Display the radio button for real-time scanning.
            for (let i = 0; i < this.scanResults.size; i++) {
                // Scanning result.
                let scanResult: scanBarcode.ScanResult = this.scanResults.data[i];
                let scanCodeRect: scanBarcode.ScanCodeRect | undefined = scanResult.scanCodeRect;
                if (scanCodeRect) {
                    this.multiCodeScanLocation.push([scanCodeRect.left,
                        scanCodeRect.top,
                        scanCodeRect.right,
                        scanCodeRect.bottom]);
                }
            }
            if (this.scanResults.size === 1) {
                // Single barcode result.
                this.multiSelectedIndex = 0;
                let location = this.multiCodeScanLocation[0];
                this.singleCodeX = this.getOffset('x', location);
                this.singleCodeY = this.getOffset('y', location);
            }
        }
    }
    aboutToDisappear() {
        this.isPickerDialogShow = false;
    }
    SingleCodeLayout(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.position({ x: 0, y: 0 });
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 0, "type": 30000, params: ['scan_selected.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Image__selected(true, this.singleCodeX, this.singleCodeY);
            Image.scale({ x: this.singleCodeScale, y: this.singleCodeScale });
            Image.opacity(this.singleCodeOpacity);
            Image.onAppear(() => {
                // Non-gallery-based single barcode recognition.
                this.singleCodeBreathe();
            });
        }, Image);
        Column.pop();
    }
    MultiCodeLayout(arr: Array<number>, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Context.animation({
                duration: 200,
                curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
                delay: 0,
                iterations: 1,
                playMode: PlayMode.Alternate,
            });
            Row.position({
                x: this.getOffset('x', arr),
                y: this.getOffset('y', arr)
            });
            Row.width(40);
            Row.height(40);
            Row.markAnchor({ x: 20, y: 20 });
            Row.scale({ x: this.fadeOutScale, y: this.fadeOutScale });
            Row.opacity(this.fadeOutOpacity);
            Context.animation(null);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 0, "type": 30000, params: ['scan_selected2.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Image.width(40);
            Image.height(40);
            Image.visibility((this.isMultiSelected && this.multiSelectedIndex !== index) ? Visibility.None : Visibility.Visible);
            Image.scale({ x: this.multiCodeScale, y: this.multiCodeScale });
            Image.opacity(this.multiCodeOpacity);
            Image.onAppear(() => {
                if (index === 0) {
                    this.multiAppear();
                }
            });
            Image.onClick(() => {
                this.openMultiCode(arr, index);
            });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.scanResults.size === 1 && this.isShowCode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    // Single barcode scanning.
                    this.SingleCodeLayout.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            this.MultiCodeLayout.bind(this)(item, index);
                        };
                        this.forEachUpdateFunction(elmtId, this.multiCodeScanLocation, forEachItemGenFunction, (item: number, _: number) => item.toString(), true, true);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 0, "type": 30000, params: ['scan_selected.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                        __Image__selected(true, this.singleCodeX, this.singleCodeY);
                        Image.scale({ x: this.singleCodeScale, y: this.singleCodeScale });
                        Image.opacity(this.singleCodeOpacity);
                        Image.visibility(this.isMultiSelected ? Visibility.Visible : Visibility.None);
                    }, Image);
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isPickerDialogShow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PickerDialog(this, {
                                    text: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                    cancel: (() => {
                                        this.isPickerDialogShow = false;
                                        this.restartPreviewStream();
                                    })
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScanV2/view/CommonCodeLayout.ets", line: 175, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                        cancel: (() => {
                                            this.isPickerDialogShow = false;
                                            this.restartPreviewStream();
                                        })
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                                });
                            }
                        }, { name: "PickerDialog" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    getOffset(coordinateAxis: string, location: Array<number>): number {
        if (coordinateAxis === 'x') {
            return this.setOffsetXByRotation(location);
        }
        return this.setOffsetYByRotation(location);
    }
    setOffsetXByRotation(location: Array<number>): number {
        let offset: number = 0;
        switch (DeviceService.rotation) {
            case DisplayRotationAngle.ROTATION_0:
                offset = (location[0] + location[2]) / 2 + this.xComponentService.offsetX;
                break;
            case DisplayRotationAngle.ROTATION_90:
                offset = this.xComponentService.width - (location[1] + location[3]) / 2 + this.xComponentService.offsetX;
                break;
            case DisplayRotationAngle.ROTATION_180:
                offset = this.xComponentService.width - (location[0] + location[2]) / 2 + this.xComponentService.offsetX;
                break;
            case DisplayRotationAngle.ROTATION_270:
                offset = (location[1] + location[3]) / 2 + this.xComponentService.offsetX;
                break;
            default:
                break;
        }
        return offset;
    }
    setOffsetYByRotation(location: Array<number>): number {
        let offset: number = 0;
        switch (DeviceService.rotation) {
            case DisplayRotationAngle.ROTATION_0:
                offset = (location[3] + location[1]) / 2 + this.xComponentService.offsetY;
                break;
            case DisplayRotationAngle.ROTATION_90:
                offset = (location[0] + location[2]) / 2 + this.xComponentService.offsetY;
                break;
            case DisplayRotationAngle.ROTATION_180:
                offset = this.xComponentService.height - (location[3] + location[1]) / 2 + this.xComponentService.offsetY;
                break;
            case DisplayRotationAngle.ROTATION_270:
                offset = this.xComponentService.height - (location[0] + location[2]) / 2 + this.xComponentService.offsetY;
                break;
            default:
                break;
        }
        return offset;
    }
    vibratorPlay() {
        // Vibration.
        try {
            vibrator.startVibration({
                type: 'time',
                duration: 100
            }, {
                id: 0,
                usage: 'alarm'
            }).then((): void => {
            }).catch((error: BusinessError) => {
                Logger.error(TAG, `Failed to start vibration. Code: ${error.code}, message: ${error.message}`);
            });
        }
        catch (err) {
            let error: BusinessError = err as BusinessError;
            Logger.error(TAG, `Failed to play vibration, An unexpected error occurred. Code: ${error.code}, message: ${error.message}`);
        }
    }
    openMultiCode(arr: Array<number>, index: number): void {
        // Tap animation. Multi-barcode scanning is not supported based on the gallery currently.
        this.singleCodeX = this.getOffset('x', arr);
        this.singleCodeY = this.getOffset('y', arr);
        this.isMultiSelected = true;
        this.singleCodeScale = 0.3;
        this.singleCodeOpacity = 0;
        this.multiSelectedIndex = index || 0;
        // Button fade-out animation.
        this.fadeOutScale = 0.3;
        this.fadeOutOpacity = 0;
        Context.animateToImmediately({
            duration: 0
        }, () => {
        });
        // Radio button animation.
        UIContextSelf.uiContext.animateTo({
            duration: 350,
            curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
            delay: 100,
            iterations: 1,
            playMode: PlayMode.Alternate,
            onFinish: () => {
                this.toRedirectPage();
            }
        }, () => {
            this.singleCodeOpacity = 1;
            this.singleCodeScale = 1.1;
        });
    }
    terminateSelfPage(): void {
        if (this.scanResults && this.scanResults.size > 0) {
            try {
                UIContextSelf.pushUrl({
                    url: 'pages/resultPage/ResultPage',
                    params: this.scanResults.data[this.multiSelectedIndex]
                });
            }
            catch (error) {
                Logger.error(TAG, `Failed to terminateSelfPage. Code: ${error?.code}, message: ${error?.message}`);
                this.terminateScan();
            }
        }
        else {
            this.terminateScan();
        }
    }
    terminateScan() {
        UIContextSelf.getRouter().back();
    }
    singleCodeBreathe(): void {
        // Single-barcode scanning breathing effect.
        this.singleCodeOpacity = 0.3;
        this.singleCodeScale = 0.3;
        Context.animateToImmediately({
            duration: 0
        }, () => {
        });
        UIContextSelf.uiContext.animateTo({
            duration: 300,
            curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Alternate,
            onFinish: () => {
                this.terminateSelfPage();
            }
        }, () => {
            this.singleCodeOpacity = 1;
            this.singleCodeScale = 1;
        });
    }
    /*
     * Multi-code scanning result animation: 0 - 600ms stop(500ms) breath: Loop-scale: 1-0.8-1(600ms)-0.8-1(600ms)-stop(400ms)
     * 0 - 350ms  opacity:0-1 scale:0.3 - 1.1 multiAppear()
     * 350ms - 600ms scale: 1.1 - 1 multiAppearEnd()
     * */
    multiAppear(): void {
        this.multiCodeScale = 0.3;
        Context.animateToImmediately({
            duration: 0
        }, () => {
        });
        UIContextSelf.uiContext.animateTo({
            duration: 350,
            curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Alternate,
            onFinish: () => {
                this.multiAppearEnd();
            }
        }, () => {
            this.multiCodeScale = 1.1;
            this.multiCodeOpacity = 1;
        });
    }
    multiAppearEnd(): void {
        UIContextSelf.uiContext.animateTo({
            duration: 250,
            curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Alternate,
            onFinish: () => {
                funcDelayer(() => {
                    this.multiCodeBreathe();
                }, 500);
            }
        }, () => {
            this.multiCodeScale = 1;
        });
    }
    multiCodeBreathe(): void {
        // Multi-barcode scanning breathing effect.
        this.multiCodeScale = 1;
        Context.animateToImmediately({
            duration: 0
        }, () => {
        });
        UIContextSelf.uiContext.animateTo({
            duration: 300,
            curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
            delay: 0,
            iterations: 4,
            playMode: PlayMode.Alternate,
            onFinish: () => {
                funcDelayer(() => {
                    this.multiCodeBreathe();
                }, 400);
            }
        }, () => {
            this.multiCodeScale = 0.8;
        });
    }
    toRedirectPage(): void {
        UIContextSelf.uiContext.animateTo({
            duration: 250,
            curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Alternate,
            onFinish: () => {
                this.terminateSelfPage();
            }
        }, () => {
            this.singleCodeScale = 1;
        });
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("scanResults" in params) {
            this.updateParam("scanResults", params.scanResults);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
