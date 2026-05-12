if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScanLine_Params {
    scanLayout?: ScanLayout;
    linePosition?: number;
    allAngle?: number;
    lightFactor?: number;
    factor?: number;
    reverse?: boolean;
    speed?: number;
    particlePropertyAnimationDown?: ParticlePropertyAnimation<number>;
    particlePropertyAnimationUp?: ParticlePropertyAnimation<number>;
    emitterOptions?: EmitterOptions<ParticleType.POINT>;
    backAnimator?: AnimatorResult;
}
import type { AnimatorResult } from "@ohos:animator";
import curves from "@native:ohos.curves";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/ScanLayout";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
const TAG: string = 'ScanLine';
const SCAN_SHADOW_HEIGHT_RATIO: number = 0.007; // 0.5 * scanline_height/scan_shadow_height = 0.007
function __Image__imageAnimation(speed: number, linePosition: number, allAngle: number): void {
    Image.position({ x: 0, y: -0.5 });
    Image.width('100%');
    Image.height(130);
    Image.scale({ y: Math.max(speed, SCAN_SHADOW_HEIGHT_RATIO) });
    Image.position({
        x: 0,
        y: linePosition + '%'
    });
    Image.rotate({
        x: 1,
        angle: allAngle,
        centerX: 0,
        centerY: 0
    });
}
export class ScanLine extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__scanLayout = new ObservedPropertyObjectPU(ScanLayout.getInstance(), this, "scanLayout");
        this.__linePosition = new ObservedPropertySimplePU(0, this, "linePosition");
        this.__allAngle = new ObservedPropertySimplePU(180, this, "allAngle");
        this.__lightFactor = new ObservedPropertySimplePU(0.075, this, "lightFactor");
        this.__factor = new ObservedPropertySimplePU(0.025, this, "factor");
        this.__reverse = new ObservedPropertySimplePU(false, this, "reverse");
        this.__speed = new ObservedPropertySimplePU(0.0, this, "speed");
        this.particlePropertyAnimationDown = {
            from: 0,
            to: 0.5,
            startMillis: 0,
            endMillis: 200,
            curve: Curve.Smooth
        };
        this.particlePropertyAnimationUp = {
            from: 0.5,
            to: 0,
            startMillis: 300,
            endMillis: 500,
            curve: Curve.Smooth
        };
        this.emitterOptions = {
            particle: {
                type: ParticleType.POINT,
                config: {
                    radius: 2
                },
                count: -1,
                lifetime: 500
            },
            size: ['100%', '100%'],
            emitRate: 60,
            shape: ParticleEmitterShape.RECTANGLE
        };
        this.backAnimator = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScanLine_Params) {
        if (params.scanLayout !== undefined) {
            this.scanLayout = params.scanLayout;
        }
        if (params.linePosition !== undefined) {
            this.linePosition = params.linePosition;
        }
        if (params.allAngle !== undefined) {
            this.allAngle = params.allAngle;
        }
        if (params.lightFactor !== undefined) {
            this.lightFactor = params.lightFactor;
        }
        if (params.factor !== undefined) {
            this.factor = params.factor;
        }
        if (params.reverse !== undefined) {
            this.reverse = params.reverse;
        }
        if (params.speed !== undefined) {
            this.speed = params.speed;
        }
        if (params.particlePropertyAnimationDown !== undefined) {
            this.particlePropertyAnimationDown = params.particlePropertyAnimationDown;
        }
        if (params.particlePropertyAnimationUp !== undefined) {
            this.particlePropertyAnimationUp = params.particlePropertyAnimationUp;
        }
        if (params.emitterOptions !== undefined) {
            this.emitterOptions = params.emitterOptions;
        }
        if (params.backAnimator !== undefined) {
            this.backAnimator = params.backAnimator;
        }
    }
    updateStateVars(params: ScanLine_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scanLayout.purgeDependencyOnElmtId(rmElmtId);
        this.__linePosition.purgeDependencyOnElmtId(rmElmtId);
        this.__allAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__lightFactor.purgeDependencyOnElmtId(rmElmtId);
        this.__factor.purgeDependencyOnElmtId(rmElmtId);
        this.__reverse.purgeDependencyOnElmtId(rmElmtId);
        this.__speed.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scanLayout.aboutToBeDeleted();
        this.__linePosition.aboutToBeDeleted();
        this.__allAngle.aboutToBeDeleted();
        this.__lightFactor.aboutToBeDeleted();
        this.__factor.aboutToBeDeleted();
        this.__reverse.aboutToBeDeleted();
        this.__speed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __scanLayout: ObservedPropertyObjectPU<ScanLayout>;
    get scanLayout() {
        return this.__scanLayout.get();
    }
    set scanLayout(newValue: ScanLayout) {
        this.__scanLayout.set(newValue);
    }
    private __linePosition: ObservedPropertySimplePU<number>;
    get linePosition() {
        return this.__linePosition.get();
    }
    set linePosition(newValue: number) {
        this.__linePosition.set(newValue);
    }
    private __allAngle: ObservedPropertySimplePU<number>;
    get allAngle() {
        return this.__allAngle.get();
    }
    set allAngle(newValue: number) {
        this.__allAngle.set(newValue);
    }
    private __lightFactor: ObservedPropertySimplePU<number>;
    get lightFactor() {
        return this.__lightFactor.get();
    }
    set lightFactor(newValue: number) {
        this.__lightFactor.set(newValue);
    }
    private __factor: ObservedPropertySimplePU<number>;
    get factor() {
        return this.__factor.get();
    }
    set factor(newValue: number) {
        this.__factor.set(newValue);
    }
    private __reverse: ObservedPropertySimplePU<boolean>;
    get reverse() {
        return this.__reverse.get();
    }
    set reverse(newValue: boolean) {
        this.__reverse.set(newValue);
    }
    private __speed: ObservedPropertySimplePU<number>;
    get speed() {
        return this.__speed.get();
    }
    set speed(newValue: number) {
        this.__speed.set(newValue);
    }
    private particlePropertyAnimationDown: ParticlePropertyAnimation<number>;
    private particlePropertyAnimationUp: ParticlePropertyAnimation<number>;
    private emitterOptions: EmitterOptions<ParticleType.POINT>;
    private backAnimator?: AnimatorResult; // Scanning line animation.
    async backAnimatorCreate(): Promise<void> {
        try {
            this.backAnimator = UIContextSelf.uiContext.createAnimator({
                duration: 2000,
                easing: 'smooth',
                delay: 0,
                fill: 'none',
                direction: 'alternate',
                iterations: -1,
                begin: 0,
                end: 100
            }); // Scanning line animation.
        }
        catch (error) {
            Logger.error(TAG, `Failed to create animator. Code: ${error?.code}`);
        }
        if (this.backAnimator) {
            this.backAnimator.onRepeat = () => {
                this.reverse = !this.reverse;
                if (this.reverse) {
                    this.allAngle = 0;
                }
                else {
                    this.allAngle = 180;
                }
            };
            this.backAnimator.onFrame = (value) => {
                value = value / 100;
                if (value < 0.389) {
                    this.speed = curves.cubicBezierCurve(0.4, 0.0, 0.7, 1.0).interpolate(value / 0.389);
                }
                else {
                    this.speed = 1.0 - curves.cubicBezierCurve(0.25, 0.0, 0.4, 1.0).interpolate((value - 0.389) / 0.611);
                }
                this.linePosition = 100 * value;
            };
        }
    }
    async aboutToAppear() {
        try {
            await this.backAnimatorCreate();
            if (this.backAnimator) {
                this.backAnimator.play();
            }
        }
        catch (error) {
            Logger.error(TAG, `Failed to play backAnimator. Code: ${error?.code}`);
        }
    }
    aboutToDisappear() {
        if (this.backAnimator) {
            this.backAnimator.cancel();
        }
        this.backAnimator = undefined;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(this.scanLayout.widthBreakpoint === BreakpointConstants.BREAKPOINT_SM ? '100%' : '50%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 0, "type": 30000, params: ['scan_line.png'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            Image.width('100%');
            Image.height(2);
            Image.position({
                x: 0,
                y: this.linePosition + '%'
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 0, "type": 30000, params: ['scan_shadow.png'], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" });
            __Image__imageAnimation(this.speed, this.linePosition, this.allAngle);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Particle.create({
                particles: [
                    {
                        emitter: this.emitterOptions,
                        scale: {
                            range: [0.4, 1.1],
                            updater: {
                                type: ParticleUpdater.RANDOM,
                                config: [
                                    0.4, 1.1
                                ]
                            }
                        },
                        color: {
                            range: ['#0A8BF5', '#FFFFFF']
                        },
                        opacity: {
                            range: [0, 0.5],
                            updater: {
                                type: ParticleUpdater.CURVE,
                                config: [
                                    this.particlePropertyAnimationDown,
                                    this.particlePropertyAnimationUp
                                ]
                            }
                        }
                    }
                ]
            });
            Particle.width('80%');
            Particle.height('100%');
            Particle.markAnchor({ y: this.allAngle === 180 ? (60 * this.speed) : 0 });
            Particle.maskShape(new Rect({ width: '100%', height: 60 * (this.speed) })
                .position({ y: this.linePosition + '%' })
                .fill(Color.White));
        }, Particle);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
