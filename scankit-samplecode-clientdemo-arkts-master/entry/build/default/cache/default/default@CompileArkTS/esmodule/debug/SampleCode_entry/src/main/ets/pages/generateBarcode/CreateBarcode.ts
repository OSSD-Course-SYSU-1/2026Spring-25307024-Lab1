if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GenerateBarcode_Params {
    pixelMap?: image.PixelMap | undefined;
    codeInputContext?: string;
    codeWidth?: string;
    codeHeight?: string;
    codeType?: scanCore.ScanType;
    codeMargin?: number;
    codeBackgroundColor?: number;
    codePixelMapColor?: number;
    windowService?: WindowService;
    codeLevel?: generateBarcode.ErrorCorrectionLevel;
    pixelMapWidth?: number;
}
import type image from "@ohos:multimedia.image";
import buffer from "@ohos:buffer";
import type { BusinessError } from "@ohos:base";
import scanCore from "@hms:core.scan.scanCore";
import generateBarcode from "@hms:core.scan.generateBarcode";
import { StatusBar } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/StatusBar";
import { CustomLabel, CustomButton } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/CommonComponents";
import { showError, getColorType, getScanTypeVal, getErrorCorrectionLevel, showMessage } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
const TAG: string = 'CreateBarcode';
class ScanConstant {
    static readonly colorItems: Array<SelectOption> = [
        {
            value: 'Black'
        },
        {
            value: 'Blue'
        },
        {
            value: 'Brown'
        },
        {
            value: 'Gray'
        },
        {
            value: 'Green'
        },
        {
            value: 'Orange'
        },
        {
            value: 'Red'
        },
        {
            value: 'White'
        },
        {
            value: 'Yellow'
        }
    ];
    static readonly errorLevelItems: Array<SelectOption> = [
        {
            value: 'LEVEL_L'
        },
        {
            value: 'LEVEL_M'
        },
        {
            value: 'LEVEL_Q'
        },
        {
            value: 'LEVEL_H'
        }
    ];
    static readonly codeTypeItems: Array<SelectOption> = [
        {
            value: 'AZTEC_CODE'
        },
        {
            value: 'CODABAR_CODE'
        },
        {
            value: 'CODE93_CODE'
        },
        {
            value: 'CODE39_CODE'
        },
        {
            value: 'CODE128_CODE'
        },
        {
            value: 'DATAMATRIX_CODE'
        },
        {
            value: 'EAN8_CODE'
        },
        {
            value: 'EAN13_CODE'
        },
        {
            value: 'ITF14_CODE'
        },
        {
            value: 'PDF417_CODE'
        },
        {
            value: 'QR_CODE'
        },
        {
            value: 'UPC_A_CODE'
        },
        {
            value: 'UPC_E_CODE'
        }
    ];
}
function __TextInput__demoTextInput(): void {
    TextInput.caretColor(Color.Blue);
    TextInput.fontSize(14);
    TextInput.width(120);
    TextInput.height(35);
    TextInput.fontWeight(FontWeight.Bold);
    TextInput.layoutWeight(1);
}
function __TextArea__demoTextArea(): void {
    TextArea.height(34);
    TextArea.caretColor(Color.Black);
    TextArea.fontSize(14);
    TextArea.fontWeight(FontWeight.Bold);
    TextArea.fontFamily('sans-serif');
    TextArea.fontStyle(FontStyle.Normal);
    TextArea.fontColor(Color.Black);
}
function __Select__demoSelect(): void {
    Select.font({ size: 14 });
    Select.selectedOptionFont({ size: 14 });
    Select.optionFont({ size: 14 });
    Select.height(34);
    Select.backgroundColor('#eeeeee');
}
function __Row__demoRow(): void {
    Row.margin({ bottom: 10 });
}
function __Flex__FlexRow(): void {
    Flex.margin({ bottom: 10 });
}
class GenerateBarcode extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pixelMap = new ObservedPropertyObjectPU(undefined, this, "pixelMap");
        this.__codeInputContext = new ObservedPropertySimplePU('123', this, "codeInputContext");
        this.__codeWidth = new ObservedPropertySimplePU('800', this, "codeWidth");
        this.__codeHeight = new ObservedPropertySimplePU('800', this, "codeHeight");
        this.__codeType = new ObservedPropertySimplePU(scanCore.ScanType.QR_CODE, this, "codeType");
        this.__codeMargin = new ObservedPropertySimplePU(1, this, "codeMargin");
        this.__codeBackgroundColor = new ObservedPropertySimplePU(0xffffff, this, "codeBackgroundColor");
        this.__codePixelMapColor = new ObservedPropertySimplePU(0x000000, this, "codePixelMapColor");
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.__codeLevel = new ObservedPropertySimplePU(generateBarcode.ErrorCorrectionLevel.LEVEL_H, this, "codeLevel");
        this.__pixelMapWidth = new ObservedPropertySimplePU(300, this, "pixelMapWidth");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GenerateBarcode_Params) {
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.codeInputContext !== undefined) {
            this.codeInputContext = params.codeInputContext;
        }
        if (params.codeWidth !== undefined) {
            this.codeWidth = params.codeWidth;
        }
        if (params.codeHeight !== undefined) {
            this.codeHeight = params.codeHeight;
        }
        if (params.codeType !== undefined) {
            this.codeType = params.codeType;
        }
        if (params.codeMargin !== undefined) {
            this.codeMargin = params.codeMargin;
        }
        if (params.codeBackgroundColor !== undefined) {
            this.codeBackgroundColor = params.codeBackgroundColor;
        }
        if (params.codePixelMapColor !== undefined) {
            this.codePixelMapColor = params.codePixelMapColor;
        }
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
        if (params.codeLevel !== undefined) {
            this.codeLevel = params.codeLevel;
        }
        if (params.pixelMapWidth !== undefined) {
            this.pixelMapWidth = params.pixelMapWidth;
        }
    }
    updateStateVars(params: GenerateBarcode_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pixelMap.purgeDependencyOnElmtId(rmElmtId);
        this.__codeInputContext.purgeDependencyOnElmtId(rmElmtId);
        this.__codeWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__codeHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__codeType.purgeDependencyOnElmtId(rmElmtId);
        this.__codeMargin.purgeDependencyOnElmtId(rmElmtId);
        this.__codeBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
        this.__codePixelMapColor.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
        this.__codeLevel.purgeDependencyOnElmtId(rmElmtId);
        this.__pixelMapWidth.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pixelMap.aboutToBeDeleted();
        this.__codeInputContext.aboutToBeDeleted();
        this.__codeWidth.aboutToBeDeleted();
        this.__codeHeight.aboutToBeDeleted();
        this.__codeType.aboutToBeDeleted();
        this.__codeMargin.aboutToBeDeleted();
        this.__codeBackgroundColor.aboutToBeDeleted();
        this.__codePixelMapColor.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        this.__codeLevel.aboutToBeDeleted();
        this.__pixelMapWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pixelMap: ObservedPropertyObjectPU<image.PixelMap | undefined>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: image.PixelMap | undefined) {
        this.__pixelMap.set(newValue);
    }
    private __codeInputContext: ObservedPropertySimplePU<string>; // Default content of the QR code.
    get codeInputContext() {
        return this.__codeInputContext.get();
    }
    set codeInputContext(newValue: string) {
        this.__codeInputContext.set(newValue);
    }
    private __codeWidth: ObservedPropertySimplePU<string>; // Default barcode width, in px.
    get codeWidth() {
        return this.__codeWidth.get();
    }
    set codeWidth(newValue: string) {
        this.__codeWidth.set(newValue);
    }
    private __codeHeight: ObservedPropertySimplePU<string>; // Default barcode height, in px.
    get codeHeight() {
        return this.__codeHeight.get();
    }
    set codeHeight(newValue: string) {
        this.__codeHeight.set(newValue);
    }
    private __codeType: ObservedPropertySimplePU<scanCore.ScanType>; // Default barcode type, which is QR code.
    get codeType() {
        return this.__codeType.get();
    }
    set codeType(newValue: scanCore.ScanType) {
        this.__codeType.set(newValue);
    }
    private __codeMargin: ObservedPropertySimplePU<number>; // Default barcode margin, in px.
    get codeMargin() {
        return this.__codeMargin.get();
    }
    set codeMargin(newValue: number) {
        this.__codeMargin.set(newValue);
    }
    private __codeBackgroundColor: ObservedPropertySimplePU<number>; // Default background color of the barcode image.
    get codeBackgroundColor() {
        return this.__codeBackgroundColor.get();
    }
    set codeBackgroundColor(newValue: number) {
        this.__codeBackgroundColor.set(newValue);
    }
    private __codePixelMapColor: ObservedPropertySimplePU<number>; // Default color of the barcode image.
    get codePixelMapColor() {
        return this.__codePixelMapColor.get();
    }
    set codePixelMapColor(newValue: number) {
        this.__codePixelMapColor.set(newValue);
    }
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    private __codeLevel: ObservedPropertySimplePU<generateBarcode.ErrorCorrectionLevel>; // Default error correction level of the barcode image.
    get codeLevel() {
        return this.__codeLevel.get();
    }
    set codeLevel(newValue: generateBarcode.ErrorCorrectionLevel) {
        this.__codeLevel.set(newValue);
    }
    private __pixelMapWidth: ObservedPropertySimplePU<number>;
    get pixelMapWidth() {
        return this.__pixelMapWidth.get();
    }
    set pixelMapWidth(newValue: number) {
        this.__pixelMapWidth.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            RelativeContainer.create();
            RelativeContainer.height(60);
        }, RelativeContainer);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StatusBar(this, { title: { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 171, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777269, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "StatusBar" });
        }
        RelativeContainer.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Row,
                wrap: FlexWrap.Wrap,
                alignItems: ItemAlign.Center,
                justifyContent: FlexAlign.Center
            });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Row,
                wrap: FlexWrap.Wrap,
                alignItems: ItemAlign.Center,
                justifyContent: FlexAlign.Center
            });
            Flex.padding(16);
            Flex.height(255);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                wrap: FlexWrap.NoWrap,
            });
            __Flex__FlexRow();
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ left: 5 });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 190, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777249, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: this.codeInputContext });
            __TextArea__demoTextArea();
            TextArea.onChange((value: string) => {
                this.codeInputContext = value;
            });
        }, TextArea);
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                wrap: FlexWrap.NoWrap,
                justifyContent: FlexAlign.SpaceBetween
            });
            __Flex__FlexRow();
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                wrap: FlexWrap.NoWrap,
            });
            Flex.width('48%');
        }, Flex);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 209, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '800' });
            __TextInput__demoTextInput();
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => {
                this.codeWidth = value;
            });
            TextInput.width('100%');
        }, TextInput);
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                wrap: FlexWrap.NoWrap,
            });
            Flex.width('50%');
        }, Flex);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 223, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '800' });
            __TextInput__demoTextInput();
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => {
                this.codeHeight = value;
            });
            TextInput.width('100%');
        }, TextInput);
        Flex.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            __Row__demoRow();
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 236, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777253, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create(ScanConstant.codeTypeItems);
            Select.value('QR_CODE');
            Select.selected(10);
            __Select__demoSelect();
            Select.onSelect((_: number, value?: string) => {
                this.codeType = getScanTypeVal(value);
            });
            Select.width(this.windowService.width <= 480 ? '60%' : '80%');
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            __Row__demoRow();
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 251, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777252, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '1' });
            __TextInput__demoTextInput();
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => {
                this.codeMargin = Number.parseInt(value);
            });
            TextInput.width(this.windowService.width <= 480 ? '60%' : '80%');
        }, TextInput);
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            __Row__demoRow();
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 264, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create(ScanConstant.colorItems);
            Select.selected(0);
            Select.value('Black');
            __Select__demoSelect();
            Select.onSelect((_: number, value?: string) => {
                this.codePixelMapColor = getColorType(value);
            });
            Select.width(this.windowService.width <= 480 ? '60%' : '80%');
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            __Row__demoRow();
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 279, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777247, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create(ScanConstant.colorItems);
            Select.selected(7);
            Select.value('White');
            __Select__demoSelect();
            Select.onSelect((_: number, value?: string) => {
                this.codeBackgroundColor = getColorType(value);
            });
            Select.align(Alignment.Center);
            Select.width(this.windowService.width <= 480 ? '60%' : '80%');
        }, Select);
        Select.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            __Row__demoRow();
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomLabel(this, {
                        text: { "id": 16777250, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 296, col: 15 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777250, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777250, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create(ScanConstant.errorLevelItems);
            Select.align(Alignment.Center);
            Select.width(this.windowService.width <= 480 ? '60%' : '80%');
            Select.selected(3);
            Select.value('LEVEL_H');
            __Select__demoSelect();
            Select.onSelect((_: number, value?: string) => {
                this.codeLevel = getErrorCorrectionLevel(value);
            });
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            __Row__demoRow();
        }, Row);
        Row.pop();
        Row.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(100);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomButton(this, {
                        mText: { "id": 16777270, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, mOnClick: () => {
                            this.pixelMap = undefined;
                            let content = this.codeInputContext;
                            let options: generateBarcode.CreateOptions = {
                                scanType: this.codeType,
                                height: Number(this.codeHeight),
                                width: Number(this.codeWidth),
                                margin: Number(this.codeMargin),
                                level: this.codeLevel,
                                backgroundColor: this.codeBackgroundColor,
                                pixelMapColor: this.codePixelMapColor,
                            };
                            try {
                                generateBarcode.createBarcode(content, options).then((result: image.PixelMap) => {
                                    this.pixelMap = result;
                                    Logger.info(TAG, 'Succeeded in creating barCode.');
                                }).catch((error: BusinessError) => {
                                    showError(error);
                                    Logger.error(TAG, `Failed to create barCode. Code: ${error.code}, message: ${error.message}`);
                                });
                            }
                            catch (error) {
                                showError(error);
                                Logger.error(TAG, `Failed to create barCode. Code: ${error?.code}, message: ${error?.message}`);
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 318, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mText: { "id": 16777270, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            mOnClick: () => {
                                this.pixelMap = undefined;
                                let content = this.codeInputContext;
                                let options: generateBarcode.CreateOptions = {
                                    scanType: this.codeType,
                                    height: Number(this.codeHeight),
                                    width: Number(this.codeWidth),
                                    margin: Number(this.codeMargin),
                                    level: this.codeLevel,
                                    backgroundColor: this.codeBackgroundColor,
                                    pixelMapColor: this.codePixelMapColor,
                                };
                                try {
                                    generateBarcode.createBarcode(content, options).then((result: image.PixelMap) => {
                                        this.pixelMap = result;
                                        Logger.info(TAG, 'Succeeded in creating barCode.');
                                    }).catch((error: BusinessError) => {
                                        showError(error);
                                        Logger.error(TAG, `Failed to create barCode. Code: ${error.code}, message: ${error.message}`);
                                    });
                                }
                                catch (error) {
                                    showError(error);
                                    Logger.error(TAG, `Failed to create barCode. Code: ${error?.code}, message: ${error?.message}`);
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mText: { "id": 16777270, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomButton" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CustomButton(this, {
                        mText: { "id": 16777271, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, mOnClick: () => {
                            this.pixelMap = undefined;
                            let content = this.codeInputContext;
                            let pattern = /^[0-9a-fA-F]+$/;
                            if (content && !pattern.test(content)) {
                                showMessage({ "id": 16777278, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                return;
                            }
                            if (content.length % 2 !== 0) {
                                content = '0' + content;
                            }
                            let contentBuffer: ArrayBuffer = buffer.from(content, 'hex').buffer;
                            let options: generateBarcode.CreateOptions = {
                                scanType: this.codeType,
                                height: Number(this.codeHeight),
                                width: Number(this.codeWidth),
                                margin: Number(this.codeMargin),
                                level: this.codeLevel,
                                backgroundColor: this.codeBackgroundColor,
                                pixelMapColor: this.codePixelMapColor,
                            };
                            try {
                                generateBarcode.createBarcode(contentBuffer, options).then((result: image.PixelMap) => {
                                    this.pixelMap = result;
                                    Logger.info(TAG, 'Succeeded in creating barCode.');
                                }).catch((error: BusinessError) => {
                                    showError(error);
                                    Logger.error(TAG, `Failed to create barCode. Code: ${error.code}, message: ${error.message}`);
                                });
                            }
                            catch (error) {
                                showError(error);
                                Logger.error(TAG, `Failed to create barCode. Code: ${error?.code}, message: ${error?.message}`);
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/generateBarcode/CreateBarcode.ets", line: 347, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            mText: { "id": 16777271, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            mOnClick: () => {
                                this.pixelMap = undefined;
                                let content = this.codeInputContext;
                                let pattern = /^[0-9a-fA-F]+$/;
                                if (content && !pattern.test(content)) {
                                    showMessage({ "id": 16777278, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                                    return;
                                }
                                if (content.length % 2 !== 0) {
                                    content = '0' + content;
                                }
                                let contentBuffer: ArrayBuffer = buffer.from(content, 'hex').buffer;
                                let options: generateBarcode.CreateOptions = {
                                    scanType: this.codeType,
                                    height: Number(this.codeHeight),
                                    width: Number(this.codeWidth),
                                    margin: Number(this.codeMargin),
                                    level: this.codeLevel,
                                    backgroundColor: this.codeBackgroundColor,
                                    pixelMapColor: this.codePixelMapColor,
                                };
                                try {
                                    generateBarcode.createBarcode(contentBuffer, options).then((result: image.PixelMap) => {
                                        this.pixelMap = result;
                                        Logger.info(TAG, 'Succeeded in creating barCode.');
                                    }).catch((error: BusinessError) => {
                                        showError(error);
                                        Logger.error(TAG, `Failed to create barCode. Code: ${error.code}, message: ${error.message}`);
                                    });
                                }
                                catch (error) {
                                    showError(error);
                                    Logger.error(TAG, `Failed to create barCode. Code: ${error?.code}, message: ${error?.message}`);
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        mText: { "id": 16777271, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }
                    });
                }
            }, { name: "CustomButton" });
        }
        Column.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin(10);
            Column.layoutWeight(1);
            Column.onAreaChange((_: Area, newValue: Area) => {
                let min = Math.min(newValue.width as number, newValue.height as number);
                if (min < 320) {
                    this.pixelMapWidth = min - 20;
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.pixelMap) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.pixelMap);
                        Image.width(this.pixelMapWidth);
                        Image.height(this.pixelMapWidth);
                        Image.objectFit(ImageFit.Contain);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GenerateBarcode";
    }
}
registerNamedRoute(() => new GenerateBarcode(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/generateBarcode/CreateBarcode", pageFullPath: "entry/src/main/ets/pages/generateBarcode/CreateBarcode", integratedHsp: "false", moduleType: "followWithHap" });
