if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MaskLayer_Params {
}
import curves from "@native:ohos.curves";
function __Column__maskStyle(): void {
    Context.animation({
        duration: 350,
        curve: curves.cubicBezierCurve(0.33, 0, 0.67, 1),
        delay: 0,
        iterations: 1,
        playMode: PlayMode.Alternate,
    });
    Column.width('100%');
    Column.height('100%');
    Column.backgroundColor('rgba(0,0,0,0.5)');
    Context.animation(null);
}
export class MaskLayer extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MaskLayer_Params) {
    }
    updateStateVars(params: MaskLayer_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            __Column__maskStyle();
        }, Column);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
