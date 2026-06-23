if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import curves from "@native:ohos.curves";
import { funcDelayer } from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Utils";
import { CommonConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/CommonConstants";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { ConfigStorage } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ConfigStorage";
import { WindowServiceV2 } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/WindowService";
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
export class PickerDialog extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.configStorage = ConfigStorage.getInstance();
        this.windowService = WindowServiceV2.getInstance();
        this.dialogWidth = 368;
        this.dialogScale = 0.85;
        this.initParam("text", (params && "text" in params) ? params.text : undefined);
        this.cancel = "cancel" in params ? params.cancel : () => {
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.configStorage = ConfigStorage.getInstance();
        this.windowService = WindowServiceV2.getInstance();
        this.dialogWidth = 368;
        this.dialogScale = 0.85;
        this.resetParam("text", (params && "text" in params) ? params.text : undefined);
        this.cancel = "cancel" in params ? params.cancel : () => {
        };
        this.resetComputed("isColorDarkMode");
    }
    @Local
    configStorage: ConfigStorage;
    @Local
    windowService: WindowServiceV2;
    @Local
    dialogWidth: number;
    @Local
    dialogScale: number;
    @Param
    readonly text: Resource;
    @Event
    cancel: () => void;
    @Computed
    get isColorDarkMode() {
        return this.configStorage.colorMode === ConfigurationConstant.ColorMode.COLOR_MODE_DARK;
    }
    DialogText(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            __Text__textClass(this.isColorDarkMode ? { "id": 125829211, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 125829210, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" }, TextAlign.Center);
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
            __Column__dialogBoxContainer(this.isColorDarkMode ? { "id": 125830787, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" } : { "id": 125830783, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Column.backgroundBlurStyle(BlurStyle.COMPONENT_THICK, {
                colorMode: this.isColorDarkMode ? ThemeColorMode.DARK : ThemeColorMode.LIGHT,
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
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
