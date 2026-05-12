if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DecodeBarcode_Params {
    translateWidth?: number;
    translateHeight?: number;
}
import photoAccessHelper from "@ohos:file.photoAccessHelper";
import fileIo from "@ohos:file.fs";
import image from "@ohos:multimedia.image";
import type { BusinessError } from "@ohos:base";
import { LengthMetrics } from "@ohos:arkui.node";
import detectBarcode from "@hms:core.scan.detectBarcode";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import { CustomButton } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/CommonComponents";
import { checkResults, showError, showMessage } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { StatusBar } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/StatusBar";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
const TAG: string = 'DecodeBarcode';
class DecodeBarcode extends ViewPU {
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
    setInitiallyProvidedValue(params: DecodeBarcode_Params) {
        if (params.translateWidth !== undefined) {
            this.translateWidth = params.translateWidth;
        }
        if (params.translateHeight !== undefined) {
            this.translateHeight = params.translateHeight;
        }
    }
    updateStateVars(params: DecodeBarcode_Params) {
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
            RelativeContainer.backgroundColor('white');
        }, RelativeContainer);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/detectBarcode/DecodeBarcode.ets", line: 38, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "StatusBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
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
            Column.id('columnDecodeBarcode');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomButton(this, {
                        mText: { "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, mOnClick: () => {
                            try {
                                let photoOption = new photoAccessHelper.PhotoSelectOptions();
                                photoOption.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
                                photoOption.maxSelectNumber = 1;
                                photoOption.isEditSupported = false;
                                let photoPicker = new photoAccessHelper.PhotoViewPicker();
                                photoPicker.select(photoOption).then((photoResult) => {
                                    Logger.info(TAG, `photoResult: ${JSON.stringify(photoResult)}.`);
                                    let infoW: number = 0;
                                    let infoH: number = 0;
                                    if (photoResult.photoUris[0].length > 0) {
                                        try {
                                            let file = fileIo.openSync(photoResult.photoUris[0], fileIo.OpenMode.READ_ONLY);
                                            const imageSourceApi = image.createImageSource(file.fd);
                                            try {
                                                fileIo.closeSync(file);
                                            }
                                            catch (error) {
                                                Logger.error(TAG, `Failed to closeSync. Code: ${error?.code}.`);
                                            }
                                            if (imageSourceApi) {
                                                imageSourceApi.getImageInfo(0, (error: BusinessError, imageInfo) => {
                                                    imageSourceApi.release().then(() => {
                                                        Logger.info(TAG, 'Succeeded in releasing the image source instance.');
                                                    }).catch((error: BusinessError) => {
                                                        Logger.error(TAG, `Failed to release the image source instance. Code: ${error.code}.`);
                                                    });
                                                    if (imageInfo == undefined) {
                                                        Logger.error(TAG, `Failed to obtain the image pixel map information. Code: ${error.code}.`);
                                                        // TODO: When an image fails to be obtained, perform compatibility or prompt processing.
                                                        return;
                                                    }
                                                    Logger.info(TAG, `imageInfo: ${JSON.stringify(imageInfo)}.`);
                                                    infoW = imageInfo.size.width;
                                                    infoH = imageInfo.size.height;
                                                });
                                            }
                                        }
                                        catch (error) {
                                            showError(error);
                                            Logger.error(TAG, `Promise options Error. Code: ${error?.code}.`);
                                            return;
                                        }
                                    }
                                    else {
                                        // TODO: TODO: When no code value can be recognized, perform prompt processing.
                                        return;
                                    }
                                    try {
                                        let inputImage: detectBarcode.InputImage = { uri: photoResult.photoUris[0] };
                                        // Define barcode recognition input parameters.
                                        let options: scanBarcode.ScanOptions = {
                                            scanTypes: [scanCore.ScanType.ALL],
                                            enableMultiMode: true,
                                            enableAlbum: true
                                        };
                                        detectBarcode.decode(inputImage, options).then((result: Array<scanBarcode.ScanResult>) => {
                                            if (!checkResults(result)) {
                                                // TODO: When no code value can be recognized, perform prompt processing.
                                                return;
                                            }
                                            if (result && result.length > 0) {
                                                // Image decoding result processing.
                                                UIContextSelf.pushUrl({
                                                    url: 'pages/detectBarcode/CommonCodeLayout',
                                                    params: {
                                                        result: result,
                                                        uri: photoResult.photoUris[0],
                                                        infoW: infoW,
                                                        infoH: infoH
                                                    }
                                                });
                                            }
                                            else {
                                                showMessage({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                            }
                                        }).catch((error: BusinessError) => {
                                            if (photoResult.photoUris[0]) {
                                                showMessage({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                                Logger.error(TAG, `Promise scan error. Code: ${error.code}, message: ${error.message}.`);
                                            }
                                        });
                                    }
                                    catch (error) {
                                        showError(error);
                                        Logger.error(TAG, `error by catch. Code: ${error?.code}, message: ${error?.message}.`);
                                    }
                                }).catch((error: BusinessError) => {
                                    Logger.error(TAG, `Failed to select by photoPicker. Code: ${error.code}.`);
                                });
                            }
                            catch (error) {
                                showError(error);
                                Logger.error(TAG, `Failed to select by photoPicker. Code: ${error?.code}.`);
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/detectBarcode/DecodeBarcode.ets", line: 40, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mText: { "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            mOnClick: () => {
                                try {
                                    let photoOption = new photoAccessHelper.PhotoSelectOptions();
                                    photoOption.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
                                    photoOption.maxSelectNumber = 1;
                                    photoOption.isEditSupported = false;
                                    let photoPicker = new photoAccessHelper.PhotoViewPicker();
                                    photoPicker.select(photoOption).then((photoResult) => {
                                        Logger.info(TAG, `photoResult: ${JSON.stringify(photoResult)}.`);
                                        let infoW: number = 0;
                                        let infoH: number = 0;
                                        if (photoResult.photoUris[0].length > 0) {
                                            try {
                                                let file = fileIo.openSync(photoResult.photoUris[0], fileIo.OpenMode.READ_ONLY);
                                                const imageSourceApi = image.createImageSource(file.fd);
                                                try {
                                                    fileIo.closeSync(file);
                                                }
                                                catch (error) {
                                                    Logger.error(TAG, `Failed to closeSync. Code: ${error?.code}.`);
                                                }
                                                if (imageSourceApi) {
                                                    imageSourceApi.getImageInfo(0, (error: BusinessError, imageInfo) => {
                                                        imageSourceApi.release().then(() => {
                                                            Logger.info(TAG, 'Succeeded in releasing the image source instance.');
                                                        }).catch((error: BusinessError) => {
                                                            Logger.error(TAG, `Failed to release the image source instance. Code: ${error.code}.`);
                                                        });
                                                        if (imageInfo == undefined) {
                                                            Logger.error(TAG, `Failed to obtain the image pixel map information. Code: ${error.code}.`);
                                                            // TODO: When an image fails to be obtained, perform compatibility or prompt processing.
                                                            return;
                                                        }
                                                        Logger.info(TAG, `imageInfo: ${JSON.stringify(imageInfo)}.`);
                                                        infoW = imageInfo.size.width;
                                                        infoH = imageInfo.size.height;
                                                    });
                                                }
                                            }
                                            catch (error) {
                                                showError(error);
                                                Logger.error(TAG, `Promise options Error. Code: ${error?.code}.`);
                                                return;
                                            }
                                        }
                                        else {
                                            // TODO: TODO: When no code value can be recognized, perform prompt processing.
                                            return;
                                        }
                                        try {
                                            let inputImage: detectBarcode.InputImage = { uri: photoResult.photoUris[0] };
                                            // Define barcode recognition input parameters.
                                            let options: scanBarcode.ScanOptions = {
                                                scanTypes: [scanCore.ScanType.ALL],
                                                enableMultiMode: true,
                                                enableAlbum: true
                                            };
                                            detectBarcode.decode(inputImage, options).then((result: Array<scanBarcode.ScanResult>) => {
                                                if (!checkResults(result)) {
                                                    // TODO: When no code value can be recognized, perform prompt processing.
                                                    return;
                                                }
                                                if (result && result.length > 0) {
                                                    // Image decoding result processing.
                                                    UIContextSelf.pushUrl({
                                                        url: 'pages/detectBarcode/CommonCodeLayout',
                                                        params: {
                                                            result: result,
                                                            uri: photoResult.photoUris[0],
                                                            infoW: infoW,
                                                            infoH: infoH
                                                        }
                                                    });
                                                }
                                                else {
                                                    showMessage({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                                }
                                            }).catch((error: BusinessError) => {
                                                if (photoResult.photoUris[0]) {
                                                    showMessage({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                                    Logger.error(TAG, `Promise scan error. Code: ${error.code}, message: ${error.message}.`);
                                                }
                                            });
                                        }
                                        catch (error) {
                                            showError(error);
                                            Logger.error(TAG, `error by catch. Code: ${error?.code}, message: ${error?.message}.`);
                                        }
                                    }).catch((error: BusinessError) => {
                                        Logger.error(TAG, `Failed to select by photoPicker. Code: ${error.code}.`);
                                    });
                                }
                                catch (error) {
                                    showError(error);
                                    Logger.error(TAG, `Failed to select by photoPicker. Code: ${error?.code}.`);
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mText: { "id": 16777256, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomButton" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomButton(this, {
                        mText: { "id": 16777257, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, mOnClick: () => {
                            UIContextSelf.pushUrl({
                                url: 'pages/detectBarcode/DecodeCameraYuv',
                            });
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/detectBarcode/DecodeBarcode.ets", line: 137, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mText: { "id": 16777257, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            mOnClick: () => {
                                UIContextSelf.pushUrl({
                                    url: 'pages/detectBarcode/DecodeCameraYuv',
                                });
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mText: { "id": 16777257, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
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
        return "DecodeBarcode";
    }
}
registerNamedRoute(() => new DecodeBarcode(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/detectBarcode/DecodeBarcode", pageFullPath: "entry/src/main/ets/pages/detectBarcode/DecodeBarcode", integratedHsp: "false", moduleType: "followWithHap" });
