import hilog from "@ohos:hilog";
class Logger {
    private domain: number = 0x00001;
    private prefix: string = 'Scan SampleCode';
    private format: string = '%{public}s %{public}s';
    debug(...args: string[]): void {
        hilog.debug(this.domain, this.prefix, this.format, args);
    }
    info(...args: string[]): void {
        hilog.info(this.domain, this.prefix, this.format, args);
    }
    warn(...args: string[]): void {
        hilog.warn(this.domain, this.prefix, this.format, args);
    }
    error(...args: string[]): void {
        hilog.error(this.domain, this.prefix, this.format, args);
    }
}
export default new Logger();
