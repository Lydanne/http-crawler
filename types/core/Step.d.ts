import { State } from "./State";
import { AxiosResponse } from "axios";
export declare enum MethodType {
    POST = "post",
    GET = "get"
}
export declare enum DataType {
    JSON = "json",
    FORMDATA = "formdata"
}
export interface Request {
    url: string;
    method: MethodType;
    dataType: DataType;
    params: object;
    data: object;
    header: object;
}
export declare class Step {
    key: string;
    url: string;
    params: object;
    data: object;
    header: object;
    dataType: DataType;
    method: MethodType;
    state: State;
    resultModel: any;
    requests: Request[];
    responses: AxiosResponse[];
    results: any[][];
    mergeResults: any[];
    isMergeResult: boolean;
    prevStep: Step | null;
    constructor(init: Step);
    /**
     * 批量创建步
     * @param steps 多个步
     */
    static batchCreate(steps: Step[]): Step[];
}
//# sourceMappingURL=Step.d.ts.map