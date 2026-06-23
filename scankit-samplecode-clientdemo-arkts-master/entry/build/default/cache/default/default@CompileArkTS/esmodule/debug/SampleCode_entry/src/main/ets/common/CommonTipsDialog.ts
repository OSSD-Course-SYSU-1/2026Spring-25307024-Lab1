if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommonTipsDialog_Params {
    dialogController?: CustomDialogController;
}
import { TipsDialog } from "@ohos:arkui.advanced.Dialog";
import type common from "@ohos:app.ability.common";
import type Want from "@ohos:app.ability.Want";
import type { BusinessError } from "@ohos:base";
import { UIContextSelf } from "@bundle:com.example.scanSample/SampleCode_entry/ets/pages/customScan/model/UIContextSelf";
import Logger from "@bundle:com.example.scanSample/SampleCode_entry/ets/common/Logger";
const TAG: string = 'Common Tips Dialog';
export class CommonTipsDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.dialogController = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommonTipsDialog_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: CommonTipsDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private dialogController?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.dialogController = ctr;
    }
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TipsDialog(this, {
                        title: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                        content: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                        primaryButton: {
                            value: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            action: () => {
                                this.closeDialog();
                            },
                        },
                        secondaryButton: {
                            value: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            action: () => {
                                this.openPermissionsInSystemSettings();
                            }
                        },
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/common/CommonTipsDialog.ets", line: 29, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            content: { "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                            primaryButton: {
                                value: { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                action: () => {
                                    this.closeDialog();
                                },
                            },
                            secondaryButton: {
                                value: { "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.scanSample", "moduleName": "SampleCode_entry" },
                                action: () => {
                                    this.openPermissionsInSystemSettings();
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TipsDialog" });
        }
    }
    closeDialog(): void {
        Logger.info(TAG, 'Start to close dialog.');
        if (this.dialogController) {
            this.dialogController.close();
            Logger.info(TAG, 'Succeeded in closing dialog.');
        }
    }
    openPermissionsInSystemSettings(): void {
        Logger.info(TAG, 'Start to open permissions in system settings.');
        let context = UIContextSelf.getHostContext() as common.UIAbilityContext;
        // Start the MainAbility of com.huawei.hmos.settings and match the URI of application_info_entry.
        let wantInfo: Want = {
            bundleName: 'com.huawei.hmos.settings',
            abilityName: 'com.huawei.hmos.settings.MainAbility',
            uri: 'application_info_entry',
            parameters: {
                settingsParamBundleName: 'com.example.scanSample'
            }
        };
        try {
            context.startAbility(wantInfo).then(() => {
                Logger.info(TAG, 'Succeeded in starting ability.');
            }).catch((error: BusinessError) => {
                Logger.error(TAG, `Failed to start ability by promise. Code: ${error.code}.`);
            });
        }
        catch (error) {
            Logger.error(TAG, `Failed to start ability by catch. Code: ${error?.code}.`);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
