export declare function isArray(value: any): boolean;
export declare function isObject(value: any): boolean;
/**
 * 深度遍历对象
 * @param target 目标对象
 * @param callback 处理每个元素的回调函数
 * @param path 当前元素的位置
 */
export declare function deepEach(target: any, callback?: (value: any, path?: string) => any, path?: string): any;
export declare function sleep(interval?: number): Promise<unknown>;
//# sourceMappingURL=tools.d.ts.map