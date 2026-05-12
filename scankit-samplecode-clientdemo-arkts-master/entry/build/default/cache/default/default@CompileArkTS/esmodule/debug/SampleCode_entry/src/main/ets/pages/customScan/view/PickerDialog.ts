if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PickerDialog_Params {
    darkMode?: ConfigurationConstant.ColorMode;
    text?: Resource;
    dialogScale?: number;
    dialogWidth?: number;
    windowService?: WindowService;
    cancel?: () => void;
}
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import curves from "@native:ohos.curves";
import { funcDelayer } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
function __Text__textClass(color: ResourceColor, textAlign: TextAlign): void {
    Text.fontWeight(FontWeight.Regular);
    Text.fontColor(color);
    Text.fontFamily('HarmonyHeiTi');
    Text.textAlign(textAlign);
    Text.lineHeight(22);
    Text.opacity(0.9);
}
function __Column__componentContainer(): void {
    Column.width('100%');
    Column.height('100%');
    Column.padding({ left: 16, right: 16 });
    Column.backgroundColor({ "id": 125829357, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
    Column.justifyContent(FlexAlign.End);
    Column.position({
        x: 0, y: 0
    });
}
function __Column__dialogBoxContainer(color: ResourceColor): void {
    Column.padding({
        left: 16,
        top: 24,
        right: 16,
        bottom: 16
    });
    Column.backgroundColor(color);
    Column.borderRadius({ "id": 125829711, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
}
function __Column__dialogContentContainer(): void {
    Column.margin({
        left: 8,
        right: 8,
        bottom: 8
    });
}
export class PickerDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__darkMode = this.createStorageLink('scanColorMode', ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET, "darkMode");
        this.__text = new SynchedPropertyObjectOneWayPU(params.text, this, "text");
        this.__dialogScale = new SynchedPropertySimpleOneWayPU(params.dialogScale, this, "dialogScale");
        this.__dialogWidth = new ObservedPropertySimplePU(368, this, "dialogWidth");
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.cancel = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PickerDialog_Params) {
        if (params.dialogScale === undefined) {
            this.__dialogScale.set(0.85);
        }
        if (params.dialogWidth !== undefined) {
            this.dialogWidth = params.dialogWidth;
        }
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
    }
    updateStateVars(params: PickerDialog_Params) {
        this.__text.reset(params.text);
        this.__dialogScale.reset(params.dialogScale);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__darkMode.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__dialogScale.purgeDependencyOnElmtId(rmElmtId);
        this.__dialogWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__darkMode.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__dialogScale.aboutToBeDeleted();
        this.__dialogWidth.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __darkMode: ObservedPropertyAbstractPU<ConfigurationConstant.ColorMode>;
    get darkMode() {
        return this.__darkMode.get();
    }
    set darkMode(newValue: ConfigurationConstant.ColorMode) {
        this.__darkMode.set(newValue);
    }
    private __text: SynchedPropertySimpleOneWayPU<Resource>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: Resource) {
        this.__text.set(newValue);
    }
    private __dialogScale: SynchedPropertySimpleOneWayPU<number>;
    get dialogScale() {
        return this.__dialogScale.get();
    }
    set dialogScale(newValue: number) {
        this.__dialogScale.set(newValue);
    }
    private __dialogWidth: ObservedPropertySimplePU<number>;
    get dialogWidth() {
        return this.__dialogWidth.get();
    }
    set dialogWidth(newValue: number) {
        this.__dialogWidth.set(newValue);
    }
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    public cancel: () => void;
    DialogText(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            __Text__textClass(this.darkMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK ? { "id": 125829211, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 125829210, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, TextAlign.Center);
            Text.fontSize({ "id": 125830970, "type": 10002, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.maxFontSize(CommonConstants.SCAN_FONT_SIZE_SCALE_LIMIT_DIALOG_TEXT);
        }, Text);
        Text.pop();
    }
    DialogButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, { buttonStyle: ButtonStyleMode.TEXTUAL });
            Button.width('100%');
            Button.height(40);
            Button.onClick(() => {
                UIContextSelf.uiContext.animateTo({
                    duration: 250,
                    curve: Curve.Friction,
                    delay: 0,
                    iterations: 1,
                    playMode: PlayMode.Alternate,
                }, () => {
                    this.dialogScale = 0.85;
                    funcDelayer(() => {
                        this.cancel();
                    }, 100);
                });
            });
        }, Button);
        Button.pop();
    }
    appearAnimation() {
        UIContextSelf.uiContext.animateTo({
            duration: 250,
            curve: curves.cubicBezierCurve(0.38, 1.33, 0.6, 1),
            delay: 0,
            iterations: 1,
            playMode: PlayMode.Alternate,
        }, () => {
            this.dialogScale = 1;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            __Column__componentContainer();
            Column.onAppear(() => {
                this.appearAnimation();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Column,
                justifyContent: FlexAlign.Center,
                alignItems: ItemAlign.Center
            });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            __Column__dialogBoxContainer(this.darkMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK ? { "id": 125830787, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 125830783, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Column.backgroundBlurStyle(BlurStyle.COMPONENT_THICK, {
                colorMode: this.darkMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK ? ThemeColorMode.DARK :
                    ThemeColorMode.LIGHT,
                adaptiveColor: AdaptiveColor.DEFAULT,
            });
            Column.onAreaChange((_: Area, newArea: Area) => {
                this.dialogWidth = Number(newArea.width);
            });
            Column.scale({ x: this.dialogScale, y: this.dialogScale });
            Column.width(this.windowService.width >= 400 ? 400 : '100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            __Column__dialogContentContainer();
        }, Column);
        this.DialogText.bind(this)();
        Column.pop();
        this.DialogButton.bind(this)();
        Column.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
