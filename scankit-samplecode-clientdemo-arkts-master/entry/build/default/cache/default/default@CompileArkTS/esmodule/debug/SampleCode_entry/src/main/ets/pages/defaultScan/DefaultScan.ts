if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DefaultScan_Params {
    translateWidth?: number;
    translateHeight?: number;
}
import { LengthMetrics } from "@ohos:arkui.node";
import type { BusinessError } from "@ohos:base";
import scanBarcode from "@hms:core.scan.scanBarcode";
import scanCore from "@hms:core.scan.scanCore";
import { CustomButton } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/CommonComponents";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { StatusBar } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/StatusBar";
import { showError } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
const TAG = 'Default Scan';
class DefaultScan extends ViewPU {
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
    setInitiallyProvidedValue(params: DefaultScan_Params) {
        if (params.translateWidth !== undefined) {
            this.translateWidth = params.translateWidth;
        }
        if (params.translateHeight !== undefined) {
            this.translateHeight = params.translateHeight;
        }
    }
    updateStateVars(params: DefaultScan_Params) {
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
                    let componentCall = new StatusBar(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/defaultScan/DefaultScan.ets", line: 35, col: 7 });
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
            Column.id('columnDefaultScan');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomButton(this, {
                        mText: { "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, mOnClick: () => {
                            try {
                                scanBarcode.startScanForResult(UIContextSelf.getHostContext(), {
                                    scanTypes: [scanCore.ScanType.ALL],
                                    enableMultiMode: true,
                                    enableAlbum: true
                                }).then((result: scanBarcode.ScanResult) => {
                                    Logger.info(TAG, `Promise scan result: ${JSON.stringify(result)}`);
                                    UIContextSelf.pushUrl({
                                        url: 'pages/resultPage/ResultPage',
                                        params: {
                                            originalValue: result.originalValue,
                                            scanType: result.scanType,
                                            isGS1: result.isGS1,
                                            source: result.source
                                        }
                                    });
                                }).catch((error: BusinessError) => {
                                    if (error.code === scanCore.ScanErrorCode.SCAN_SERVICE_CANCELED) {
                                        Logger.info(TAG, 'Disabling the Scanning Service.');
                                    }
                                    else {
                                        Logger.error(TAG, `Failed to start the scanning service. Code: ${error.code}, message: ${error.message}.`);
                                        showError(error);
                                    }
                                });
                            }
                            catch (error) {
                                Logger.error(TAG, `Failed to start the scanning service. Code: ${error?.code}, message: ${error?.message}.`);
                                showError(error);
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/defaultScan/DefaultScan.ets", line: 37, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mText: { "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            mOnClick: () => {
                                try {
                                    scanBarcode.startScanForResult(UIContextSelf.getHostContext(), {
                                        scanTypes: [scanCore.ScanType.ALL],
                                        enableMultiMode: true,
                                        enableAlbum: true
                                    }).then((result: scanBarcode.ScanResult) => {
                                        Logger.info(TAG, `Promise scan result: ${JSON.stringify(result)}`);
                                        UIContextSelf.pushUrl({
                                            url: 'pages/resultPage/ResultPage',
                                            params: {
                                                originalValue: result.originalValue,
                                                scanType: result.scanType,
                                                isGS1: result.isGS1,
                                                source: result.source
                                            }
                                        });
                                    }).catch((error: BusinessError) => {
                                        if (error.code === scanCore.ScanErrorCode.SCAN_SERVICE_CANCELED) {
                                            Logger.info(TAG, 'Disabling the Scanning Service.');
                                        }
                                        else {
                                            Logger.error(TAG, `Failed to start the scanning service. Code: ${error.code}, message: ${error.message}.`);
                                            showError(error);
                                        }
                                    });
                                }
                                catch (error) {
                                    Logger.error(TAG, `Failed to start the scanning service. Code: ${error?.code}, message: ${error?.message}.`);
                                    showError(error);
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mText: { "id": 16777265, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
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
        return "DefaultScan";
    }
}
registerNamedRoute(() => new DefaultScan(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/defaultScan/DefaultScan", pageFullPath: "entry/src/main/ets/pages/defaultScan/DefaultScan", integratedHsp: "false", moduleType: "followWithHap" });
