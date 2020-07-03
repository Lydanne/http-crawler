import { AxiosResponse } from 'axios';
import { State } from "./State";
import { Meta } from "./Meta";
import { Option } from "./Option";
import { Step, Request } from "./Step";
import { EventList } from './Event';
export interface HttpCrawlerConfig {
    directive?: any;
    meta?: any;
    option?: any;
    steps: any[];
}
export declare class HttpCrawler {
    private directive;
    private meta;
    private option;
    private state;
    private steps;
    private event;
    constructor(config: HttpCrawlerConfig);
    /**
     * 完成所有步
     * @param meta 元数据
     */
    run(meta?: Meta): Promise<any[]>;
    /**
     * 走一步
     * @param meta 元数据，可以通过指令来访问
     */
    go(meta?: Meta): Promise<any[]>;
    /**
     * 发送请求
     * @param req 进行网络请求
     */
    request(req: Request): Promise<AxiosResponse>;
    /**
     * 通过对象内_v的数组实现分离填充成数组
     * @param transformValue 使用transformValue方法处理后的对象
     */
    splitFull(transformValue: any): any[];
    /**
     * 合并所有步的结果
     */
    mergeResult(): any[];
    /**
     * 重置
     */
    reset(): void;
    /**
     * 获取当前步
     */
    get $step(): Step;
    /**
     * 获取所有步
     */
    get $steps(): Step[];
    /**
     * 获取元数据
     */
    get $meta(): Meta;
    /**
     * 获取状态
     */
    get $state(): State;
    /**
     * 获取配置
     */
    get $option(): Option;
    /**
     * 监听事件
     * @param event 监听事件，如：start、end、err、go:before、go:after
     * @param callback 回调函数
     */
    on(event: EventList, callback: (...args: any[]) => void): void;
    static http: import("axios").AxiosStatic;
}
//# sourceMappingURL=HttpCrawler.d.ts.map