export class State {
  current: number = 0; //当前步的下标
  startTime: Date = new Date(); //开始时间
  endTime: Date | null = null; //结束时间
}
