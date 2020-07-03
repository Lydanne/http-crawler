import { HttpCrawler } from "./HttpCrawler";
interface FunctionHanler {
    (...str: string[]): any;
}
/**
 * 指令类
 * 指令格式：{{v-<指令名>[=<参数>]}}
 */
export declare class Directive {
    _v: string[];
    refer?: HttpCrawler | undefined;
    constructor(init?: Directive);
    deepTransform(target: any, refer?: any): any;
    /**
     * 执行字符串内的指令函数，并且将指令替换为值
     * @param value 一个字符串
     * @param refer 参考对象
     */
    transform(value: string, refer: any): string | string[];
    parser(value: string): {
        source: any;
        directive: any;
        argStr: any;
    }[];
    /**
     * 获取当前实例
     * @param key JSON查询字符串
     */
    ['v-refer'](refer: any, key: string): any;
    /**
     * 根据key返回状态的值
     * @param key JSON查询字符串
     */
    ['v-state'](refer: any, key: string): any;
    /**
     * 根据key返回状态的值
     * @param key JSON查询字符串
     */
    ['v-meta'](refer: any, key: string): any;
    /**
     * 查询上一个step的对象
     * @param key JSON查询字符串
     */
    ['v-prev'](refer: any, key: string): any;
    /**
     * 查询上一个step的对象的mergeResults
     * @param key JSON查询字符串
     */
    ['v-prev-mres'](refer: any, key: string): any;
    /**
     * 查询上一个step的对象的results
     * @param key JSON查询字符串
     */
    ['v-prev-res'](refer: any, key: string): any;
    /**
     * 查询上一个step的对象的response
     * @param key JSON查询字符串
     */
    ['v-prev-responses'](refer: any, key: string): any;
    /**
     * 查询当前step的对象
     * @param key JSON查询字符串
     */
    ['v-current'](refer: any, key: string): any;
    /**
     * 获取当前的response
     * @param key JSON查询字符串
     */
    ['v-response'](refer: any, key: string): any;
    /**
     * 获取当前的response
     * @param key JSON查询字符串
     */
    ['v-response-html'](refer: any, key: string): any;
    [key: string]: FunctionHanler | any;
}
export {};
//# sourceMappingURL=Directive.d.ts.map