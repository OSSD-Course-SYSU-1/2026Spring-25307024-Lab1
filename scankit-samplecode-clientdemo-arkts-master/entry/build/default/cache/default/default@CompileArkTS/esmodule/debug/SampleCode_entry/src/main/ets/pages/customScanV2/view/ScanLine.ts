if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { AnimatorResult } from "@ohos:animator";
import curves from "@native:ohos.curves";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
import { BreakpointConstants } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/constants/BreakpointConstants";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import { ScanLayout } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScanV2/model/ScanLayout";
const TAG: string = 'ScanLineV2';
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
export class ScanLine extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.scanLayout = ScanLayout.getInstance();
        this.linePosition = 0;
        this.allAngle = 180;
        this.lightFactor = 0.075;
        this.factor = 0.025;
        this.reverse = false;
        this.speed = 0.0;
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
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.scanLayout = ScanLayout.getInstance();
        this.linePosition = 0;
        this.allAngle = 180;
        this.lightFactor = 0.075;
        this.factor = 0.025;
        this.reverse = false;
        this.speed = 0.0;
    }
    @Local
    scanLayout: ScanLayout;
    @Local
    linePosition: number;
    @Local
    allAngle: number;
    @Local
    lightFactor: number;
    @Local
    factor: number;
    @Local
    reverse: boolean;
    @Local
    speed: number;
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
