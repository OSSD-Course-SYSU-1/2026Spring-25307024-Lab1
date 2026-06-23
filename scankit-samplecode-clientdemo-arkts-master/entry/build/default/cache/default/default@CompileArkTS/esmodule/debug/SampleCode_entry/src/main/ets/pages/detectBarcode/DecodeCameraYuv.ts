if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DecodeCameraYuv_Params {
    mXComponentController?: XComponentController;
    scanLayout?: ScanLayout;
    windowService?: WindowService;
    isUserGrant?: boolean;
    xComponentHeight?: number;
    xComponentWidth?: number;
    previewScreenOffsetX?: number;
    previewScreenOffsetY?: number;
    scanResultPoints?: Array<scanBarcode.ScanCodeRect>;
    cornerPoints?: Array<Array<scanBarcode.Point>>;
    cameraManager?: camera.CameraManager | undefined;
    photoSession?: camera.PhotoSession | undefined;
    cameraInput?: camera.CameraInput | undefined;
    previewOutput?: camera.PreviewOutput | undefined;
    previewOutput2?: camera.PreviewOutput | undefined;
    isDecoding?: boolean;
    adaptRatio?: number;
}
import camera from "@ohos:multimedia.camera";
import type { BusinessError } from "@ohos:base";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { PermissionRequestResult } from "@ohos:abilityAccessCtrl";
import image from "@ohos:multimedia.image";
import display from "@ohos:display";
import { LengthMetrics } from "@ohos:arkui.node";
import detectBarcode from "@hms:core.scan.detectBarcode";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { BreakpointType } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/BreakpointType";
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanLayout";
const TAG: string = 'DecodeCameraYuv';
const CAMERA_1080: number = 1080;
const CAMERA_1920: number = 1920;
class DecodeCameraYuv extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.mXComponentController = new XComponentController();
        this.__scanLayout = new ObservedPropertyObjectPU(ScanLayout.getInstance(), this, "scanLayout");
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.__isUserGrant = new ObservedPropertySimplePU(false, this, "isUserGrant");
        this.__xComponentHeight = new ObservedPropertySimplePU(1, this, "xComponentHeight");
        this.__xComponentWidth = new ObservedPropertySimplePU(1, this, "xComponentWidth");
        this.__previewScreenOffsetX = new ObservedPropertySimplePU(0, this, "previewScreenOffsetX");
        this.__previewScreenOffsetY = new ObservedPropertySimplePU(0, this, "previewScreenOffsetY");
        this.__scanResultPoints = new ObservedPropertyObjectPU([], this, "scanResultPoints");
        this.__cornerPoints = new ObservedPropertyObjectPU([], this, "cornerPoints");
        this.cameraManager = undefined;
        this.photoSession = undefined;
        this.cameraInput = undefined;
        this.previewOutput = undefined;
        this.previewOutput2 = undefined;
        this.isDecoding = false;
        this.adaptRatio = 1.0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DecodeCameraYuv_Params) {
        if (params.mXComponentController !== undefined) {
            this.mXComponentController = params.mXComponentController;
        }
        if (params.scanLayout !== undefined) {
            this.scanLayout = params.scanLayout;
        }
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
        if (params.isUserGrant !== undefined) {
            this.isUserGrant = params.isUserGrant;
        }
        if (params.xComponentHeight !== undefined) {
            this.xComponentHeight = params.xComponentHeight;
        }
        if (params.xComponentWidth !== undefined) {
            this.xComponentWidth = params.xComponentWidth;
        }
        if (params.previewScreenOffsetX !== undefined) {
            this.previewScreenOffsetX = params.previewScreenOffsetX;
        }
        if (params.previewScreenOffsetY !== undefined) {
            this.previewScreenOffsetY = params.previewScreenOffsetY;
        }
        if (params.scanResultPoints !== undefined) {
            this.scanResultPoints = params.scanResultPoints;
        }
        if (params.cornerPoints !== undefined) {
            this.cornerPoints = params.cornerPoints;
        }
        if (params.cameraManager !== undefined) {
            this.cameraManager = params.cameraManager;
        }
        if (params.photoSession !== undefined) {
            this.photoSession = params.photoSession;
        }
        if (params.cameraInput !== undefined) {
            this.cameraInput = params.cameraInput;
        }
        if (params.previewOutput !== undefined) {
            this.previewOutput = params.previewOutput;
        }
        if (params.previewOutput2 !== undefined) {
            this.previewOutput2 = params.previewOutput2;
        }
        if (params.isDecoding !== undefined) {
            this.isDecoding = params.isDecoding;
        }
        if (params.adaptRatio !== undefined) {
            this.adaptRatio = params.adaptRatio;
        }
    }
    updateStateVars(params: DecodeCameraYuv_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scanLayout.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
        this.__isUserGrant.purgeDependencyOnElmtId(rmElmtId);
        this.__xComponentHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__xComponentWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__previewScreenOffsetX.purgeDependencyOnElmtId(rmElmtId);
        this.__previewScreenOffsetY.purgeDependencyOnElmtId(rmElmtId);
        this.__scanResultPoints.purgeDependencyOnElmtId(rmElmtId);
        this.__cornerPoints.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scanLayout.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        this.__isUserGrant.aboutToBeDeleted();
        this.__xComponentHeight.aboutToBeDeleted();
        this.__xComponentWidth.aboutToBeDeleted();
        this.__previewScreenOffsetX.aboutToBeDeleted();
        this.__previewScreenOffsetY.aboutToBeDeleted();
        this.__scanResultPoints.aboutToBeDeleted();
        this.__cornerPoints.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private mXComponentController: XComponentController;
    private __scanLayout: ObservedPropertyObjectPU<ScanLayout>;
    get scanLayout() {
        return this.__scanLayout.get();
    }
    set scanLayout(newValue: ScanLayout) {
        this.__scanLayout.set(newValue);
    }
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    private __isUserGrant: ObservedPropertySimplePU<boolean>;
    get isUserGrant() {
        return this.__isUserGrant.get();
    }
    set isUserGrant(newValue: boolean) {
        this.__isUserGrant.set(newValue);
    }
    private __xComponentHeight: ObservedPropertySimplePU<number>;
    get xComponentHeight() {
        return this.__xComponentHeight.get();
    }
    set xComponentHeight(newValue: number) {
        this.__xComponentHeight.set(newValue);
    }
    private __xComponentWidth: ObservedPropertySimplePU<number>;
    get xComponentWidth() {
        return this.__xComponentWidth.get();
    }
    set xComponentWidth(newValue: number) {
        this.__xComponentWidth.set(newValue);
    }
    private __previewScreenOffsetX: ObservedPropertySimplePU<number>;
    get previewScreenOffsetX() {
        return this.__previewScreenOffsetX.get();
    }
    set previewScreenOffsetX(newValue: number) {
        this.__previewScreenOffsetX.set(newValue);
    }
    private __previewScreenOffsetY: ObservedPropertySimplePU<number>;
    get previewScreenOffsetY() {
        return this.__previewScreenOffsetY.get();
    }
    set previewScreenOffsetY(newValue: number) {
        this.__previewScreenOffsetY.set(newValue);
    }
    private __scanResultPoints: ObservedPropertyObjectPU<Array<scanBarcode.ScanCodeRect>>;
    get scanResultPoints() {
        return this.__scanResultPoints.get();
    }
    set scanResultPoints(newValue: Array<scanBarcode.ScanCodeRect>) {
        this.__scanResultPoints.set(newValue);
    }
    private __cornerPoints: ObservedPropertyObjectPU<Array<Array<scanBarcode.Point>>>;
    get cornerPoints() {
        return this.__cornerPoints.get();
    }
    set cornerPoints(newValue: Array<Array<scanBarcode.Point>>) {
        this.__cornerPoints.set(newValue);
    }
    // CameraKit
    private cameraManager: camera.CameraManager | undefined;
    private photoSession: camera.PhotoSession | undefined;
    private cameraInput: camera.CameraInput | undefined;
    private previewOutput: camera.PreviewOutput | undefined;
    private previewOutput2: camera.PreviewOutput | undefined;
    private isDecoding: boolean;
    private adaptRatio: number;
    async reqPermissionsFromUser(): Promise<void> {
        let permission: boolean = await this.requestPermissionsFromUserFn();
        if (permission) {
            this.isUserGrant = true;
        }
    }
    requestPermissionsFromUserFn(): Promise<boolean> {
        const atManager: abilityAccessCtrl.AtManager = abilityAccessCtrl.createAtManager();
        return new Promise((resolve, reject) => {
            atManager.requestPermissionsFromUser(UIContextSelf.uiContext.getHostContext(), ['ohos.permission.CAMERA'])
                .then((data: PermissionRequestResult) => {
                const grantStatus: Array<number> = data.authResults;
                const PERMISSION_GRANTED: number = 0;
                if (grantStatus.length > 0 && grantStatus[0] === PERMISSION_GRANTED) {
                    // The user has granted the permission.
                    resolve(true);
                }
                else {
                    // If the user refuses to grant the permission, display a message indicating that user authorization is required, and direct the user to set the permission in system settings.
                    reject(false);
                }
            }).catch((error: BusinessError) => {
                Logger.error(TAG, `Failed to requestPermissionsFromUser by atManager. Code: ${error.code}.`);
                reject(false);
            });
        });
    }
    async aboutToAppear() {
        this.setDisplay();
        this.setCameraManager();
    }
    setDisplay() {
        try {
            let displayClass = display.getDefaultDisplaySync();
            if (displayClass) {
                let widthVp: number = UIContextSelf.uiContext.px2vp(displayClass.width);
                let heightVp: number = UIContextSelf.uiContext.px2vp(displayClass.height);
                let ratio: number = CAMERA_1080 / CAMERA_1920;
                this.xComponentHeight = heightVp;
                this.xComponentWidth = heightVp * ratio;
                this.previewScreenOffsetX = (widthVp - this.xComponentWidth) / 2;
                this.previewScreenOffsetY = 0;
                this.adaptRatio = this.xComponentWidth / CAMERA_1080;
            }
        }
        catch (error) {
            Logger.error(TAG, `Failed to getDefaultDisplaySync. Code: ${error?.code}.`);
        }
    }
    aboutToDisappear(): void {
        this.stopCamera();
    }
    async onPageShow(): Promise<void> {
        if (!this.isUserGrant) {
            await this.reqPermissionsFromUser();
        }
        else {
            this.xComponentInit();
        }
    }
    onPageHide(): void {
        this.stopCamera();
    }
    stopCamera() {
        if (this.photoSession) {
            // Stop the current camera session.
            try {
                this.photoSession.stop().catch((error: BusinessError) => {
                    Logger.error(TAG, `Failed to stop photoSession. Code: ${error.code}.`);
                });
            }
            catch (error) {
                let err = error as BusinessError;
                Logger.error(TAG, `Failed to stop photoSession. Code: ${err.code}.`);
            }
            // close CameraInput.
            if (this.cameraInput) {
                try {
                    this.cameraInput.close().catch((error: BusinessError) => {
                        Logger.error(TAG, `Failed to close cameraInput. Code: ${error.code}.`);
                    });
                }
                catch (error) {
                    let err = error as BusinessError;
                    Logger.error(TAG, `Failed to close cameraInput. Code: ${err.code}.`);
                }
            }
            // Release the camera preview stream.
            if (this.previewOutput) {
                try {
                    this.previewOutput.release().catch((error: BusinessError) => {
                        Logger.error(TAG, `Failed to release previewOutput. Code: ${error.code}.`);
                    });
                }
                catch (error) {
                    let err = error as BusinessError;
                    Logger.error(TAG, `Failed to release previewOutput. Code: ${err.code}.`);
                }
            }
            // Release the second camera preview stream.
            if (this.previewOutput2) {
                try {
                    this.previewOutput2.release().catch((error: BusinessError) => {
                        Logger.error(TAG, `Failed to release previewOutput2. Code: ${error.code}.`);
                    });
                }
                catch (error) {
                    let err = error as BusinessError;
                    Logger.error(TAG, `Failed to release previewOutput2. Code: ${err.code}.`);
                }
            }
            // Release the camera session.
            try {
                this.photoSession.release().catch((error: BusinessError) => {
                    Logger.error(TAG, `Failed to release photoSession. Code: ${error.code}.`);
                });
            }
            catch (error) {
                Logger.error(TAG, `Failed to release photoSession. Code: ${error?.code}.`);
            }
            this.photoSession = undefined;
        }
    }
    goBack(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.position({
                x: 0,
                y: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 0, "type": 30000, params: ['scan_back.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Image.width(24);
            Image.height(24);
            Image.objectFit(ImageFit.Contain);
            Image.responseRegion({
                x: '-50%',
                y: '-50%',
                width: '200%',
                height: '200%'
            });
            Image.draggable(false);
            Image.fillColor(Color.Black);
            Image.id('decode_camera_yuv_goBack');
            Image.margin({
                top: LengthMetrics.vp(this.windowService.topAvoidHeight + 8),
                start: LengthMetrics.vp(new BreakpointType(16, 24, 32).getValue(this.scanLayout.widthBreakpoint))
            });
            Image.onClick(async () => {
                UIContextSelf.getRouter().back();
            });
        }, Image);
        Column.pop();
    }
    cameraXComponent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Create XComponent.
            if (this.isUserGrant) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        XComponent.create({
                            id: 'componentId',
                            type: XComponentType.SURFACE,
                            controller: this.mXComponentController
                        }, "com.example.scanSample/SampleCode_entry");
                        XComponent.onLoad(() => {
                            this.xComponentInit();
                        });
                        XComponent.width(this.xComponentWidth);
                        XComponent.height(this.xComponentHeight);
                        XComponent.position({
                            x: this.previewScreenOffsetX,
                            y: this.previewScreenOffsetY
                        });
                    }, XComponent);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.cameraXComponent.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Draw the central point.
            Column.create();
            // Draw the central point.
            Column.width(this.xComponentWidth);
            // Draw the central point.
            Column.height(this.xComponentHeight);
            // Draw the central point.
            Column.position({
                x: this.previewScreenOffsetX,
                y: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.scanResultPoints && this.scanResultPoints.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const rect = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 0, "type": 30000, params: ['scan_selected.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                Image.position({
                                    x: (CAMERA_1080 - rect.bottom + CAMERA_1080 - rect.top) / 2 * this.adaptRatio,
                                    y: (rect.left + rect.right) / 2 * this.adaptRatio
                                });
                                Image.width(40);
                                Image.height(40);
                                Image.markAnchor({ x: 20, y: 20 });
                            }, Image);
                        };
                        this.forEachUpdateFunction(elmtId, this.scanResultPoints, forEachItemGenFunction, (rect: scanBarcode.ScanCodeRect) => rect.left + rect.right + 'rect', false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // Draw the central point.
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Draw QR code corners.
            Column.create();
            // Draw QR code corners.
            Column.width(this.xComponentWidth);
            // Draw QR code corners.
            Column.height(this.xComponentHeight);
            // Draw QR code corners.
            Column.position({
                x: this.previewScreenOffsetX,
                y: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.cornerPoints && this.cornerPoints.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const points = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const point = _item;
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width(8);
                                        Row.height(8);
                                        Row.backgroundColor(Color.Red);
                                        Row.position({ x: (CAMERA_1080 - point.y) * this.adaptRatio, y: point.x * this.adaptRatio });
                                    }, Row);
                                    Row.pop();
                                };
                                this.forEachUpdateFunction(elmtId, points, forEachItemGenFunction, (point: scanBarcode.Point) => point.x + point.y + 'point', false, false);
                            }, ForEach);
                            ForEach.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.cornerPoints, forEachItemGenFunction, (cornerPoint: scanBarcode.Point) => cornerPoint.x + cornerPoint.y + 'cornerPoint', false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // Draw QR code corners.
        Column.pop();
        this.goBack.bind(this)();
        Stack.pop();
    }
    setCameraManager(): void {
        try {
            this.cameraManager = camera.getCameraManager(UIContextSelf.uiContext.getHostContext());
        }
        catch (error) {
            let err = error as BusinessError;
            Logger.error(TAG, `Failed to get cameraManager. Code: ${err.code}.`);
        }
    }
    xComponentInit() {
        this.mXComponentController.setXComponentSurfaceRect({
            surfaceWidth: UIContextSelf.uiContext.vp2px(this.xComponentWidth),
            surfaceHeight: UIContextSelf.uiContext.vp2px(this.xComponentHeight)
        });
        let surfaceId: string = this.mXComponentController.getXComponentSurfaceId();
        try {
            // Create the ImageReceiver object.
            let size: image.Size = {
                width: CAMERA_1080,
                height: CAMERA_1920
            };
            let receiver: image.ImageReceiver = image.createImageReceiver(size, image.ImageFormat.JPEG, 8);
            if (this.cameraManager) {
                this.startPreviewOutput(this.cameraManager, surfaceId, receiver);
            }
        }
        catch (error) {
            Logger.error(TAG, `Failed to create the previewOutput instance. Code: ${error?.code}`);
        }
    }
    async startPreviewOutput(cameraManager: camera.CameraManager, xComponentSurfaceId: string, receiver: image.ImageReceiver): Promise<void> {
        try {
            // Call Camera Kit to obtain supported camera devices.
            let camerasDevices: Array<camera.CameraDevice> = cameraManager.getSupportedCameras();
            // Obtain supported modes.
            let sceneModes: Array<camera.SceneMode> = cameraManager.getSupportedSceneModes(camerasDevices[0]);
            let isSupportPhotoMode: boolean = sceneModes.indexOf(camera.SceneMode.NORMAL_PHOTO) >= 0;
            if (!isSupportPhotoMode) {
                return;
            }
            let cameraProfile: camera.Profile = {
                format: camera.CameraFormat.CAMERA_FORMAT_YUV_420_SP,
                size: {
                    "width": CAMERA_1920,
                    "height": CAMERA_1080
                },
            };
            this.previewOutput = cameraManager.createPreviewOutput(cameraProfile, xComponentSurfaceId);
            let imageReceiverSurfaceId: string = await receiver.getReceivingSurfaceId();
            this.previewOutput2 = cameraManager.createPreviewOutput(cameraProfile, imageReceiverSurfaceId);
            this.cameraInput = cameraManager.createCameraInput(camerasDevices[0]);
            await this.cameraInput.open();
            this.photoSession =
                cameraManager.createSession(camera.SceneMode.NORMAL_PHOTO) as camera.PhotoSession;
            this.photoSession.beginConfig();
            this.photoSession.addInput(this.cameraInput);
            this.photoSession.addOutput(this.previewOutput);
            this.photoSession.addOutput(this.previewOutput2);
            await this.photoSession.commitConfig();
            await this.photoSession.start();
            // Obtain the camera preview stream buffer.
            this.onImageArrival(receiver);
        }
        catch (error) {
            Logger.error(TAG, `Failed to startPreviewOutput. Code: ${error?.code}.`);
        }
    }
    onImageArrival(receiver: image.ImageReceiver): void {
        receiver.on('imageArrival', () => {
            receiver.readNextImage((err: BusinessError, nextImage: image.Image) => {
                Logger.info(TAG, 'Receiver.readNextImage success');
                if (err || nextImage === undefined) {
                    Logger.error(TAG, `receiver.readNextImage failed. Code: ${err.code}`);
                    return;
                }
                nextImage.getComponent(image.ComponentType.JPEG, (err: BusinessError, imgComponent: image.Component) => {
                    if (err || nextImage === undefined) {
                        Logger.error(TAG, 'Failed to getComponent by nextImage.');
                        return;
                    }
                    let width = CAMERA_1920;
                    let height = CAMERA_1080;
                    if (!this.isDecoding && imgComponent && imgComponent.byteBuffer as ArrayBuffer) {
                        // Image decoding preview buffer.
                        // Note: The camera and camera preview are not always in the same orientation.
                        let stride = imgComponent.rowStride;
                        Logger.info(TAG, `getComponent stride:${stride}, width: ${width}`);
                        if (stride == width) {
                            this.decodeImageBuffer(nextImage, imgComponent.byteBuffer, CAMERA_1920, CAMERA_1080);
                        }
                        else {
                            // NV21（YUV_420_SP）
                            const dstBufferSize = width * height * 1.5;
                            const dstArr = new Uint8Array(dstBufferSize);
                            Logger.error(TAG, 'dstBufferSize: ' + dstBufferSize);
                            for (let j = 0; j < height * 1.5; j++) {
                                const srcBuf = new Uint8Array(imgComponent.byteBuffer, j * stride, width);
                                dstArr.set(srcBuf, j * width);
                            }
                            this.decodeImageBuffer(nextImage, dstArr.buffer as ArrayBuffer, CAMERA_1920, CAMERA_1080);
                        }
                    }
                });
            });
        });
    }
    decodeImageBuffer(nextImage: image.Image, buffer: ArrayBuffer, width: number, height: number) {
        try {
            let byteImg: detectBarcode.ByteImage = {
                byteBuffer: buffer,
                width: width,
                height: height,
                format: detectBarcode.ImageFormat.NV21
            };
            let options: scanBarcode.ScanOptions = {
                scanTypes: [scanCore.ScanType.ALL],
                enableMultiMode: true,
                enableAlbum: false
            };
            this.scanResultPoints = [];
            this.cornerPoints = [];
            this.isDecoding = true;
            // Image decoding buffer.
            detectBarcode.decodeImage(byteImg, options).then((res: detectBarcode.DetectResult) => {
                let results: Array<scanBarcode.ScanResult> = res.scanResults;
                results.forEach((result) => {
                    // Code value.
                    let codeType: scanCore.ScanType = result.scanType;
                    Logger.info(TAG, `Scan result: type: ${codeType}`);
                    // Code position.
                    let rect: scanBarcode.ScanCodeRect | undefined = result.scanCodeRect;
                    if (rect) {
                        this.scanResultPoints.push({
                            left: rect.left,
                            top: rect.top,
                            right: rect.right,
                            bottom: rect.bottom
                        });
                    }
                    // QR code corners.
                    let points: Array<scanBarcode.Point> | undefined = result.cornerPoints;
                    if (result.scanType == scanCore.ScanType.QR_CODE && points) {
                        this.cornerPoints.push([]);
                        points.forEach((point) => {
                            this.cornerPoints[this.cornerPoints.length - 1].push(point);
                        });
                    }
                });
                // Zoom in or out.
                if (res && res.zoomValue > 1.0) {
                    this.setCameraZoom(res.zoomValue);
                }
                this.isDecoding = false;
                // Release image data after decoding.
                nextImage.release();
            }).catch((error: BusinessError) => {
                Logger.error(TAG, `Failed to decodeImage. Code: ${error.code}, message: ${error.message}.`);
                this.isDecoding = false;
                nextImage.release();
            });
        }
        catch (error) {
            this.isDecoding = false;
            nextImage.release();
        }
    }
    setCameraZoom(zoomValue: number) {
        // Set the zoom ratio.
        if (this.photoSession) {
            try {
                let zoomRatio: number = this.photoSession.getZoomRatio() * zoomValue;
                if (zoomRatio < 10.0) {
                    this.photoSession.setZoomRatio(zoomRatio);
                }
            }
            catch (error) {
                Logger.error(TAG, `Failed to setCameraZoom. Code: ${error?.code}.`);
            }
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DecodeCameraYuv";
    }
}
registerNamedRoute(() => new DecodeCameraYuv(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/detectBarcode/DecodeCameraYuv", pageFullPath: "entry/src/main/ets/pages/detectBarcode/DecodeCameraYuv", integratedHsp: "false", moduleType: "followWithHap" });
