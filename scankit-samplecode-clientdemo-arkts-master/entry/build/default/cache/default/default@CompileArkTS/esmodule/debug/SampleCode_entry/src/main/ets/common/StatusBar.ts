if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatusBar_Params {
    windowService?: WindowService;
    title?: string | Resource;
    isBackToHome?: boolean;
}
import { LengthMetrics } from "@ohos:arkui.node";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { WindowService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/WindowService";
export class StatusBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__windowService = new ObservedPropertyObjectPU(WindowService.getInstance(), this, "windowService");
        this.__title = new SynchedPropertyObjectOneWayPU(params.title, this, "title");
        this.__isBackToHome = new SynchedPropertySimpleOneWayPU(params.isBackToHome, this, "isBackToHome");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatusBar_Params) {
        if (params.windowService !== undefined) {
            this.windowService = params.windowService;
        }
        if (params.title === undefined) {
            this.__title.set('');
        }
        if (params.isBackToHome === undefined) {
            this.__isBackToHome.set(false);
        }
    }
    updateStateVars(params: StatusBar_Params) {
        this.__title.reset(params.title);
        this.__isBackToHome.reset(params.isBackToHome);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__windowService.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__isBackToHome.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__windowService.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__isBackToHome.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __windowService: ObservedPropertyObjectPU<WindowService>;
    get windowService() {
        return this.__windowService.get();
    }
    set windowService(newValue: WindowService) {
        this.__windowService.set(newValue);
    }
    private __title: SynchedPropertySimpleOneWayPU<string | Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string | Resource) {
        this.__title.set(newValue);
    }
    private __isBackToHome: SynchedPropertySimpleOneWayPU<boolean>;
    get isBackToHome() {
        return this.__isBackToHome.get();
    }
    set isBackToHome(newValue: boolean) {
        this.__isBackToHome.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ start: LengthMetrics.vp(16) });
            Row.zIndex(10);
            Row.position({ start: LengthMetrics.vp(15) });
            Row.onClick(async () => {
                if (this.isBackToHome) {
                    UIContextSelf.getRouter().clear();
                    UIContextSelf.replaceUrl({
                        url: 'pages/Index'
                    });
                }
                else {
                    UIContextSelf.getRouter().back();
                }
            });
            Row.height(56 + this.windowService.topAvoidHeight);
            Row.width('100%');
            Row.alignRules({
                top: { anchor: '__container__', align: VerticalAlign.Top },
                left: { anchor: '__container__', align: HorizontalAlign.Start }
            });
            Row.id('statusBar');
        }, Row);
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
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(20);
            Text.fontColor({ "id": 125831025, "type": 10001, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Text.margin({ start: LengthMetrics.vp(15) });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
