if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CodeLayout_Params {
    scanService?: ScanService;
    xComponentService?: XComponentService;
    multiCodeScanLocation?: Array<Array<number>>;
    isMultiSelected?: boolean;
    multiSelectedIndex?: number;
    singleCodeX?: number;
    singleCodeY?: number;
    multiCodeScale?: number;
    multiCodeOpacity?: number;
    singleCodeScale?: number;
    singleCodeOpacity?: number;
    fadeOutScale?: number;
    fadeOutOpacity?: number;
    isPickerDialogShow?: boolean;
    isShowCode?: boolean;
    scanResults?: ScanResults;
    restartPreviewStream?: () => void;
}
import curves from "@native:ohos.curves";
import type { BusinessError } from "@ohos:base";
import vibrator from "@ohos:vibrator";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { ScanService, ScanStatus } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanService";
import type { ScanResults } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanService";
import { DisplayRotationAngle } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { PickerDialog } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/view/PickerDialog";
import { funcDelayer } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import { XComponentService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/XComponentService";
import { DeviceService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/DeviceService";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
function __Image__selected(scanState: boolean, x: number, y: number): void {
    Image.width(40);
    Image.height(40);
    Image.position({ x: x, y: y });
    Image.markAnchor({ x: 20, y: 20 });
    Image.visibility(scanState ? Visibility.Visible : Visibility.Hidden);
    Image.draggable(false);
}
const TAG: string = 'CommonCodeLayout';
export class CodeLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__scanService = new ObservedPropertyObjectPU(ScanService.getInstance(), this, "scanService");
        this.__xComponentService = new ObservedPropertyObjectPU(XComponentService.getInstance(), this, "xComponentService");
        this.__multiCodeScanLocation = new ObservedPropertyObjectPU([], this, "multiCodeScanLocation");
        this.__isMultiSelected = new ObservedPropertySimplePU(false, this, "isMultiSelected");
        this.__multiSelectedIndex = new ObservedPropertySimplePU(0, this, "multiSelectedIndex");
        this.__singleCodeX = new ObservedPropertySimplePU(0, this, "singleCodeX");
        this.__singleCodeY = new ObservedPropertySimplePU(0, this, "singleCodeY");
        this.__multiCodeScale = new ObservedPropertySimplePU(0.3, this, "multiCodeScale");
        this.__multiCodeOpacity = new ObservedPropertySimplePU(0, this, "multiCodeOpacity");
        this.__singleCodeScale = new ObservedPropertySimplePU(0.3, this, "singleCodeScale");
        this.__singleCodeOpacity = new ObservedPropertySimplePU(0, this, "singleCodeOpacity");
        this.__fadeOutScale = new ObservedPropertySimplePU(1, this, "fadeOutScale");
        this.__fadeOutOpacity = new ObservedPropertySimplePU(1, this, "fadeOutOpacity");
        this.__isPickerDialogShow = new ObservedPropertySimplePU(false, this, "isPickerDialogShow");
        this.__isShowCode = new ObservedPropertySimplePU(true, this, "isShowCode");
        this.__scanResults = new SynchedPropertyNesedObjectPU(params.scanResults, this, "scanResults");
        this.restartPreviewStream = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CodeLayout_Params) {
        if (params.scanService !== undefined) {
            this.scanService = params.scanService;
        }
        if (params.xComponentService !== undefined) {
            this.xComponentService = params.xComponentService;
        }
        if (params.multiCodeScanLocation !== undefined) {
            this.multiCodeScanLocation = params.multiCodeScanLocation;
        }
        if (params.isMultiSelected !== undefined) {
            this.isMultiSelected = params.isMultiSelected;
        }
        if (params.multiSelectedIndex !== undefined) {
            this.multiSelectedIndex = params.multiSelectedIndex;
        }
        if (params.singleCodeX !== undefined) {
            this.singleCodeX = params.singleCodeX;
        }
        if (params.singleCodeY !== undefined) {
            this.singleCodeY = params.singleCodeY;
        }
        if (params.multiCodeScale !== undefined) {
            this.multiCodeScale = params.multiCodeScale;
        }
        if (params.multiCodeOpacity !== undefined) {
            this.multiCodeOpacity = params.multiCodeOpacity;
        }
        if (params.singleCodeScale !== undefined) {
            this.singleCodeScale = params.singleCodeScale;
        }
        if (params.singleCodeOpacity !== undefined) {
            this.singleCodeOpacity = params.singleCodeOpacity;
        }
        if (params.fadeOutScale !== undefined) {
            this.fadeOutScale = params.fadeOutScale;
        }
        if (params.fadeOutOpacity !== undefined) {
            this.fadeOutOpacity = params.fadeOutOpacity;
        }
        if (params.isPickerDialogShow !== undefined) {
            this.isPickerDialogShow = params.isPickerDialogShow;
        }
        if (params.isShowCode !== undefined) {
            this.isShowCode = params.isShowCode;
        }
        this.__scanResults.set(params.scanResults);
        if (params.restartPreviewStream !== undefined) {
            this.restartPreviewStream = params.restartPreviewStream;
        }
    }
    updateStateVars(params: CodeLayout_Params) {
        this.__scanResults.set(params.scanResults);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scanService.purgeDependencyOnElmtId(rmElmtId);
        this.__xComponentService.purgeDependencyOnElmtId(rmElmtId);
        this.__multiCodeScanLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__isMultiSelected.purgeDependencyOnElmtId(rmElmtId);
        this.__multiSelectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__singleCodeX.purgeDependencyOnElmtId(rmElmtId);
        this.__singleCodeY.purgeDependencyOnElmtId(rmElmtId);
        this.__multiCodeScale.purgeDependencyOnElmtId(rmElmtId);
        this.__multiCodeOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__singleCodeScale.purgeDependencyOnElmtId(rmElmtId);
        this.__singleCodeOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__fadeOutScale.purgeDependencyOnElmtId(rmElmtId);
        this.__fadeOutOpacity.purgeDependencyOnElmtId(rmElmtId);
        this.__isPickerDialogShow.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowCode.purgeDependencyOnElmtId(rmElmtId);
        this.__scanResults.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scanService.aboutToBeDeleted();
        this.__xComponentService.aboutToBeDeleted();
        this.__multiCodeScanLocation.aboutToBeDeleted();
        this.__isMultiSelected.aboutToBeDeleted();
        this.__multiSelectedIndex.aboutToBeDeleted();
        this.__singleCodeX.aboutToBeDeleted();
        this.__singleCodeY.aboutToBeDeleted();
        this.__multiCodeScale.aboutToBeDeleted();
        this.__multiCodeOpacity.aboutToBeDeleted();
        this.__singleCodeScale.aboutToBeDeleted();
        this.__singleCodeOpacity.aboutToBeDeleted();
        this.__fadeOutScale.aboutToBeDeleted();
        this.__fadeOutOpacity.aboutToBeDeleted();
        this.__isPickerDialogShow.aboutToBeDeleted();
        this.__isShowCode.aboutToBeDeleted();
        this.__scanResults.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __scanService: ObservedPropertyObjectPU<ScanService>;
    get scanService() {
        return this.__scanService.get();
    }
    set scanService(newValue: ScanService) {
        this.__scanService.set(newValue);
    }
    private __xComponentService: ObservedPropertyObjectPU<XComponentService>;
    get xComponentService() {
        return this.__xComponentService.get();
    }
    set xComponentService(newValue: XComponentService) {
        this.__xComponentService.set(newValue);
    }
    private __multiCodeScanLocation: ObservedPropertyObjectPU<Array<Array<number>>>; // Display positions of multiple barcodes.
    get multiCodeScanLocation() {
        return this.__multiCodeScanLocation.get();
    }
    set multiCodeScanLocation(newValue: Array<Array<number>>) {
        this.__multiCodeScanLocation.set(newValue);
    }
    private __isMultiSelected: ObservedPropertySimplePU<boolean>; // Whether a barcode among multiple barcodes is selected.
    get isMultiSelected() {
        return this.__isMultiSelected.get();
    }
    set isMultiSelected(newValue: boolean) {
        this.__isMultiSelected.set(newValue);
    }
    private __multiSelectedIndex: ObservedPropertySimplePU<number>; // Index of the selected barcode.
    get multiSelectedIndex() {
        return this.__multiSelectedIndex.get();
    }
    set multiSelectedIndex(newValue: number) {
        this.__multiSelectedIndex.set(newValue);
    }
    private __singleCodeX: ObservedPropertySimplePU<number>; // X-axis position of a single barcode.
    get singleCodeX() {
        return this.__singleCodeX.get();
    }
    set singleCodeX(newValue: number) {
        this.__singleCodeX.set(newValue);
    }
    private __singleCodeY: ObservedPropertySimplePU<number>; // Y-axis position of a single barcode.
    get singleCodeY() {
        return this.__singleCodeY.get();
    }
    set singleCodeY(newValue: number) {
        this.__singleCodeY.set(newValue);
    }
    private __multiCodeScale: ObservedPropertySimplePU<number>; // Radio button zoom ratio of multiple barcodes.
    get multiCodeScale() {
        return this.__multiCodeScale.get();
    }
    set multiCodeScale(newValue: number) {
        this.__multiCodeScale.set(newValue);
    }
    private __multiCodeOpacity: ObservedPropertySimplePU<number>; // Radio button transparency of multiple barcodes.
    get multiCodeOpacity() {
        return this.__multiCodeOpacity.get();
    }
    set multiCodeOpacity(newValue: number) {
        this.__multiCodeOpacity.set(newValue);
    }
    private __singleCodeScale: ObservedPropertySimplePU<number>;
    get singleCodeScale() {
        return this.__singleCodeScale.get();
    }
    set singleCodeScale(newValue: number) {
        this.__singleCodeScale.set(newValue);
    }
    private __singleCodeOpacity: ObservedPropertySimplePU<number>;
    get singleCodeOpacity() {
        return this.__singleCodeOpacity.get();
    }
    set singleCodeOpacity(newValue: number) {
        this.__singleCodeOpacity.set(newValue);
    }
    private __fadeOutScale: ObservedPropertySimplePU<number>;
    get fadeOutScale() {
        return this.__fadeOutScale.get();
    }
    set fadeOutScale(newValue: number) {
        this.__fadeOutScale.set(newValue);
    }
    private __fadeOutOpacity: ObservedPropertySimplePU<number>;
    get fadeOutOpacity() {
        return this.__fadeOutOpacity.get();
    }
    set fadeOutOpacity(newValue: number) {
        this.__fadeOutOpacity.set(newValue);
    }
    private __isPickerDialogShow: ObservedPropertySimplePU<boolean>;
    get isPickerDialogShow() {
        return this.__isPickerDialogShow.get();
    }
    set isPickerDialogShow(newValue: boolean) {
        this.__isPickerDialogShow.set(newValue);
    }
    private __isShowCode: ObservedPropertySimplePU<boolean>;
    get isShowCode() {
        return this.__isShowCode.get();
    }
    set isShowCode(newValue: boolean) {
        this.__isShowCode.set(newValue);
    }
    private __scanResults: SynchedPropertyNesedObjectPU<ScanResults>;
    get scanResults() {
        return this.__scanResults.get();
    }
    public restartPreviewStream: () => void;
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
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/customScan/view/CommonCodeLayout.ets", line: 175, col: 9 });
                                ViewPU.create(componentCall);
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
    rerender() {
        this.updateDirtyElements();
    }
}
