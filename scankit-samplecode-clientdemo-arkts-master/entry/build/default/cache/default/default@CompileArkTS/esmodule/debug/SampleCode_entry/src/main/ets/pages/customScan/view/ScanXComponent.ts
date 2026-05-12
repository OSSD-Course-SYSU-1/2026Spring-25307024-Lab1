if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanXComponent_Params {
    xComponentService?: XComponentService;
    mXComponentController?: XComponentController;
    startCustomScan?: () => void;
}
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { XComponentService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/XComponentService";
const TAG = 'ScanXComponent';
export class ScanXComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__xComponentService = new ObservedPropertyObjectPU(XComponentService.getInstance(), this, "xComponentService");
        this.mXComponentController = new XComponentController();
        this.startCustomScan = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanXComponent_Params) {
        if (params.xComponentService !== undefined) {
            this.xComponentService = params.xComponentService;
        }
        if (params.mXComponentController !== undefined) {
            this.mXComponentController = params.mXComponentController;
        }
        if (params.startCustomScan !== undefined) {
            this.startCustomScan = params.startCustomScan;
        }
    }
    updateStateVars(params: ScanXComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__xComponentService.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__xComponentService.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __xComponentService: ObservedPropertyObjectPU<XComponentService>;
    get xComponentService() {
        return this.__xComponentService.get();
    }
    set xComponentService(newValue: XComponentService) {
        this.__xComponentService.set(newValue);
    }
    private mXComponentController: XComponentController;
    public startCustomScan: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            XComponent.create({
                id: 'componentId',
                type: XComponentType.SURFACE,
                controller: this.mXComponentController
            }, "com.example.scanSample/SampleCode_entry");
            XComponent.onLoad(async () => {
                this.xComponentService.surfaceId = this.mXComponentController.getXComponentSurfaceId();
                Logger.info(TAG, `Succeeded in loading XComponent, getXComponentSurfaceId: ${this.xComponentService.surfaceId}`);
                this.startCustomScan();
            });
            XComponent.onDestroy(() => {
                this.xComponentService.surfaceId = '';
                Logger.info(TAG, 'Succeeded in destroying XComponent.');
            });
            XComponent.height(this.xComponentService.height);
            XComponent.width(this.xComponentService.width);
            XComponent.position({ x: this.xComponentService.offsetX, y: this.xComponentService.offsetY });
            XComponent.clip(true);
        }, XComponent);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
