export class Meta {
  [key: string]: number | string | boolean;
  name: string = ''; // 名称
  version: number = 0; // 版本
  constructor(init: Meta) {
    Object.assign(this, init);
  }
}
