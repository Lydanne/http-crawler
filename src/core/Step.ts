import { State } from "./State";
import { AxiosResponse } from "axios";

export enum MethodType {
  POST = 'post',
  GET = 'get'
}
export enum DataType {
  JSON = 'json',
  FORMDATA = 'formdata'
}

export interface Request{
  url:string;
  method:MethodType;
  dataType:DataType;
  params:object;
  data:object;
  header:object;
}

export class Step {
  key: string = 'default'; // 这个会在执行merage方法的时候最为key
  url: string = ''; //请求url
  params: object = {}; //请求GET参数
  data: object = {}; //post参数
  header: object = {}; // 头
  dataType: DataType = DataType.JSON; // Data数据类型
  method: MethodType = MethodType.GET; // 请求方式
  state:State = new State(); // 状态
  resultModel: any = {}; // 结果模型
  requests:Request[] = []; // 请求集合
  responses: AxiosResponse[] = []; //相应集合
  results: any[][] = []; // 源结果
  mergeResults:any[] = []; //合并后的结果
  isMergeResult: boolean = true; // 是否合并结果
  prevStep: Step | null = null; //上一步
  constructor(init: Step) {
    Object.assign(this, init);
  }
  /**
   * 批量创建步
   * @param steps 多个步
   */
  static batchCreate (steps: Step[]): Step[] {
    return steps.map(item => new Step(item));
  }
}
