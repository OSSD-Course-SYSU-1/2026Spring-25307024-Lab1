import promptAction from "@ohos:promptAction";
import type { BusinessError } from "@ohos:base";
import pasteboard from "@ohos:pasteboard";
export class ShareUtil {
    /**
     * 分享/复制扫码结果
     * @param content 要分享的文本
     */
    static shareText(content: string): void {
        ShareUtil.copyToClipboard(content);
    }
    /**
     * 复制文本到剪贴板
     * @param content 要复制的文本
     */
    private static copyToClipboard(content: string): void {
        try {
            const systemPasteboard = pasteboard.getSystemPasteboard();
            // 直接用字符串 'text/plain'，避免常量名不兼容的问题
            const data: pasteboard.PasteData = pasteboard.createData('text/plain', content);
            systemPasteboard.setData(data);
            promptAction.showToast({ message: '扫码结果已复制，可直接粘贴分享' });
        }
        catch (err) {
            // 明确处理异常
            const error = err as BusinessError;
            promptAction.showToast({ message: `复制失败：${error.message}` });
        }
    }
}
