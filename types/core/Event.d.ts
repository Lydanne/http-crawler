export declare enum EventList {
    START = "start",
    GO_BEFORE = "go:before",
    GO_AFTER = "go:after",
    END = "end",
    ERR = "err"
}
export declare class Event {
    private callbacks;
    on(event: EventList, callback: (...args: any[]) => void): void;
    emit(event: EventList, ...args: any[]): void;
}
//# sourceMappingURL=Event.d.ts.map