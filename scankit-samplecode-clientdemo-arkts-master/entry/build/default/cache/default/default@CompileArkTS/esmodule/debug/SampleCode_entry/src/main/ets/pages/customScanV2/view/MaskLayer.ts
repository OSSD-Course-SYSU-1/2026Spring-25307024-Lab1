if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
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
export class MaskLayer extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
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
