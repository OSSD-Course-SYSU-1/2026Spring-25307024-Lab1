if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CodeLayout_Params {
    result?: Array<object>;
    uri?: string;
    infoW?: number;
    infoH?: number;
    displayHeight?: number;
    displayWidth?: number;
    layTop?: number;
    layLeft?: number;
    screen?: number;
    codeLocation?: Array<Array<number>>;
    scroller?: Scroller;
    windowService?: WindowService;
}
import display from "@ohos:display";
import type scanBarcode from "@hms:core.scan.scanBarcode";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { DeviceService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/DeviceService";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
const TAG: string = 'CodeLayout';
class CodeLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.result = [];
        this.uri = '';
        this.infoW = 0;
        this.infoH = 0;
        this.__displayHeight = new ObservedPropertySimplePU(1412, this, "displayHeight");
        this.__displayWidth = new ObservedPropertySimplePU(720, this, "displayWidth");
        this.__layTop = new ObservedPropertySimplePU(226, this, "layTop");
        this.__layLeft = new ObservedPropertySimplePU(0, this, "layLeft");
        this.__screen = new ObservedPropertySimplePU(1, this, "screen");
        this.__codeLocation = new ObservedPropertyObjectPU([], this, "codeLocation");
        this.scroller = new Scroller();
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CodeLayout_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.uri !== undefined) {
            this.uri = params.uri;
        }
        if (params.infoW !== undefined) {
            this.infoW = params.infoW;
        }
        if (params.infoH !== undefined) {
            this.infoH = params.infoH;
        }
        if (params.displayHeight !== undefined) {
            this.displayHeight = params.displayHeight;
        }
        if (params.displayWidth !== undefined) {
            this.displayWidth = params.displayWidth;
        }
        if (params.layTop !== undefined) {
            this.layTop = params.layTop;
        }
        if (params.layLeft !== undefined) {
            this.layLeft = params.layLeft;
        }
        if (params.screen !== undefined) {
            this.screen = params.screen;
        }
        if (params.codeLocation !== undefined) {
            this.codeLocation = params.codeLocation;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
    }
    updateStateVars(params: CodeLayout_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__displayHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__displayWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__layTop.purgeDependencyOnElmtId(rmElmtId);
        this.__layLeft.purgeDependencyOnElmtId(rmElmtId);
        this.__screen.purgeDependencyOnElmtId(rmElmtId);
        this.__codeLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__displayHeight.aboutToBeDeleted();
        this.__displayWidth.aboutToBeDeleted();
        this.__layTop.aboutToBeDeleted();
        this.__layLeft.aboutToBeDeleted();
        this.__screen.aboutToBeDeleted();
        this.__codeLocation.aboutToBeDeleted();
        this.__windowService.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private result: Array<object>;
    private uri: string;
    private infoW: number;
    private infoH: number;
    private __displayHeight: ObservedPropertySimplePU<number>;
    get displayHeight() {
        return this.__displayHeight.get();
    }
    set displayHeight(newValue: number) {
        this.__displayHeight.set(newValue);
    }
    private __displayWidth: ObservedPropertySimplePU<number>;
    get displayWidth() {
        return this.__displayWidth.get();
    }
    set displayWidth(newValue: number) {
        this.__displayWidth.set(newValue);
    }
    private __layTop: ObservedPropertySimplePU<number>;
    get layTop() {
        return this.__layTop.get();
    }
    set layTop(newValue: number) {
        this.__layTop.set(newValue);
    }
    private __layLeft: ObservedPropertySimplePU<number>;
    get layLeft() {
        return this.__layLeft.get();
    }
    set layLeft(newValue: number) {
        this.__layLeft.set(newValue);
    }
    private __screen: ObservedPropertySimplePU<number>;
    get screen() {
        return this.__screen.get();
    }
    set screen(newValue: number) {
        this.__screen.set(newValue);
    }
    private __codeLocation: ObservedPropertyObjectPU<Array<Array<number>>>;
    get codeLocation() {
        return this.__codeLocation.get();
    }
    set codeLocation(newValue: Array<Array<number>>) {
        this.__codeLocation.set(newValue);
    }
    public scroller: Scroller;
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    aboutToAppear() {
        this.codeLocation = [];
        this.setDisplay();
        Logger.info(TAG, 'aboutToAppear CodeLayout');
        let params = UIContextSelf.getRouter().getParams() as Record<string, number | string | Array<scanBarcode.ScanResult>>;
        this.result = params.result as Array<scanBarcode.ScanResult>;
        this.uri = params.uri as string;
        this.infoW = params.infoW as number;
        this.infoH = params.infoH as number;
        Logger.info(TAG, `uri: ${this.uri}, infoW: ${this.infoW}, infoH: ${this.infoH}`);
        this.calculate();
        if (DeviceService.isFolding) {
            try {
                display.on('foldDisplayModeChange', async (foldStatus: display.FoldDisplayMode) => {
                    // 1: unfolded 2: folded
                    if (foldStatus === 1 || foldStatus === 2) {
                        setTimeout(() => {
                            this.codeLocation = [];
                            this.setDisplay();
                            this.calculate();
                        }, 300);
                    }
                });
            }
            catch (error) {
                Logger.error(TAG, `Failed to on foldDisplayModeChange. Code: ${error?.code}.`);
            }
        }
    }
    setDisplay(): void {
        Logger.info(TAG, 'setDisplay start');
        let displayClass: display.Display | null = null;
        try {
            displayClass = display.getDefaultDisplaySync();
            Logger.info(TAG, `width: ${displayClass.width}, height: ${displayClass.height}.`);
        }
        catch (error) {
            Logger.error(TAG, `Failed to getDefaultDisplaySync. Code: ${error?.code}.`);
        }
        if (displayClass !== null) {
            displayClass.height = displayClass.height - UIContextSelf.uiContext.vp2px(this.windowService.topAvoidHeight);
            this.displayHeight = Math.round(UIContextSelf.uiContext.px2lpx(displayClass.height));
            this.displayWidth = Math.round(UIContextSelf.uiContext.px2lpx(displayClass.width));
            Logger.info(TAG, `setDisplay,displayWidth: ${this.displayWidth}, displayHeight: ${this.displayHeight}.`);
        }
    }
    calculate() {
        if (this.infoW && this.infoH && this.displayHeight && this.displayWidth) {
            if (this.infoW / this.infoH > this.displayWidth / this.displayHeight) {
                this.screen = this.displayWidth / this.infoW;
                this.layTop = (this.displayHeight - this.displayWidth * this.infoH / this.infoW) / 2;
                this.layLeft = 0;
            }
            else {
                this.layTop = 0;
                this.layLeft = (this.displayWidth - this.displayHeight * this.infoW / this.infoH) / 2;
                this.screen = this.displayHeight / this.infoH;
            }
        }
        for (let i = 0; i < this.result.length; i++) {
            let rx = Math.round(this.result[i]['scanCodeRect']['left'] * this.screen + this.layLeft);
            let ry = Math.round(this.result[i]['scanCodeRect']['top'] * this.screen + this.layTop);
            let rw = Math.round((this.result[i]['scanCodeRect']['right'] - this.result[i]['scanCodeRect']['left']) * this.screen);
            let rh = Math.round((this.result[i]['scanCodeRect']['bottom'] - this.result[i]['scanCodeRect']['top']) * this.screen);
            this.codeLocation.push([rx, ry, rw, rh]);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 0, "type": 30000, params: ['scan_back.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Image.fillColor(Color.Black);
            Image.width(30);
            Image.height(30);
            Image.objectFit(ImageFit.Contain);
            Image.position({ x: 15, y: 0 });
            Image.zIndex(10);
            Image.onClick(() => {
                UIContextSelf.getRouter().back();
            });
            Image.margin({
                top: this.windowService.topAvoidHeight
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                top: this.windowService.topAvoidHeight
            });
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.uri);
            Image.objectFit(ImageFit.Contain);
            Image.width('100%');
            Image.height('100%');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 0, "type": 30000, params: ['scan_selected.svg'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
                    Image.width(40);
                    Image.height(40);
                    Image.markAnchor({ x: 20, y: 20 });
                    Image.position({
                        x: item[0] + item[2] / 2 + 'lpx',
                        y: item[1] + item[3] / 2 + 'lpx',
                    });
                    Image.onClick(() => {
                        UIContextSelf.pushUrl({
                            url: 'pages/resultPage/ResultPage',
                            params: this.result[index]
                        });
                    });
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, this.codeLocation, forEachItemGenFunction, (item: Array<number>, _: number) => item[0] + item[1] + item[2] + item[3] + 'codeLocation', true, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CodeLayout";
    }
}
registerNamedRoute(() => new CodeLayout(undefined, {}), "", { bundleName: "com.example.scanSample", moduleName: "SampleCode_entry", pagePath: "pages/detectBarcode/CommonCodeLayout", pageFullPath: "entry/src/main/ets/pages/detectBarcode/CommonCodeLayout", integratedHsp: "false", moduleType: "followWithHap" });
