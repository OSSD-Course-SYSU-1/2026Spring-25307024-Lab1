if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CustomLabel_Params {
    text?: string | Resource;
}
interface CustomButton_Params {
    mText?: string | Resource;
    windowService?: WindowService;
    mHeight?: number;
    mOnClick?: () => void;
}
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
function __Text__labelText(): void {
    Text.fontSize(14);
    Text.fontColor(0x000000);
    Text.textAlign(TextAlign.Start);
}
function __Button__buttonScanStyle(): void {
    Button.backgroundColor({ "id": 125829510, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Button.fontColor({ "id": 125829231, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Button.align(Alignment.Center);
    Button.type(ButtonType.Capsule);
    Button.margin({ bottom: 10 });
}
export class CustomButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mText = new SynchedPropertyObjectOneWayPU(params.mText, this, "mText");
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.mHeight = 40;
        this.mOnClick = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomButton_Params) {
        if (params.mText === undefined) {
            this.__mText.set('');
        }
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.mOnClick !== undefined) {
            this.mOnClick = params.mOnClick;
        }
    }
    updateStateVars(params: CustomButton_Params) {
        this.__mText.reset(params.mText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mText.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mText.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mText: SynchedPropertySimpleOneWayPU<string | Resource>;
    get mText() {
        return this.__mText.get();
    }
    set mText(newValue: string | Resource) {
        this.__mText.set(newValue);
    }
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    private mHeight: number;
    public mOnClick: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.windowService.width <= 480) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.margin({ right: 16, left: 16 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.mText);
                        Button.height(this.mHeight);
                        __Button__buttonScanStyle();
                        Button.width('100%');
                        Button.onClick(this.mOnClick);
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.mText);
                        Button.height(this.mHeight);
                        __Button__buttonScanStyle();
                        Button.width(448);
                        Button.onClick(this.mOnClick);
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class CustomLabel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__text = new SynchedPropertyObjectOneWayPU(params.text, this, "text");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomLabel_Params) {
        if (params.text === undefined) {
            this.__text.set('');
        }
    }
    updateStateVars(params: CustomLabel_Params) {
        this.__text.reset(params.text);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__text.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __text: SynchedPropertySimpleOneWayPU<string | Resource>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string | Resource) {
        this.__text.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.height(34);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            __Text__labelText();
            Text.width(65);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
