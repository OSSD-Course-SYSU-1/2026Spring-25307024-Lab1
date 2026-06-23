export class ScanRecord {
    id: number;
    content: string;
    type: string;
    time: string;
    constructor(content: string, type: string) {
        this.id = Date.now();
        this.content = content;
        this.type = type;
        this.time = new Date().toLocaleString();
    }
}
