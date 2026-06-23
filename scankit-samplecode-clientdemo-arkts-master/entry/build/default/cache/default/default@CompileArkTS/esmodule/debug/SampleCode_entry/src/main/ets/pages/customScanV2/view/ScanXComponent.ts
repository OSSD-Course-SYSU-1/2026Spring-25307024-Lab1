if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { XComponentService } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/XComponentService";
const TAG = 'ScanXComponentV2';
export class ScanXComponent extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.xComponentService = XComponentService.getInstance();
        this.mXComponentController = new XComponentController();
        this.startCustomScan = "startCustomScan" in params ? params.startCustomScan : () => {
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.xComponentService = XComponentService.getInstance();
        this.startCustomScan = "startCustomScan" in params ? params.startCustomScan : () => {
        };
    }
    @Local
    xComponentService: XComponentService;
    private mXComponentController: XComponentController;
    @Event
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
                Logger.info(TAG, `Succeeded in loading XComponent, getXComponentSurfaceId: ${this.xComponentService.surfaceId}.`);
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
