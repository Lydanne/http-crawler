export enum EventList{
  START = 'start', //开始
  GO_BEFORE = 'go:before', // 运行go之前
  GO_AFTER = 'go:after', // 运行go之后
  END = 'end', //结束
  ERR = 'err', //出现错误
}

interface EventHandler {
  (...args: any[]): void;
}

interface EventCallback {
  [key: string]: EventHandler[];
}

export class Event {
  private callbacks: EventCallback = {};
  on (event: EventList, callback: (...args: any[]) => void) {
    if (!this.callbacks[event]){
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }
  emit (event: EventList, ...args: any[]) {
    if (this.callbacks[event]){
      this.callbacks[event].forEach(callback => callback(...args));
    }
  }
}
