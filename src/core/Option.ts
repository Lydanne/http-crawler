export class Option {
  delay: number = 100; //延迟
  errRetry: number = 0; //错误重试次数
  timeout: number = 1000*10; //请求超时时间
  constructor(init: Option) {
    Object.assign(this, init);
  }
}
