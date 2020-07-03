export function isArray(value:any):boolean{
  return value instanceof Array;
}

export function isObject(value:any):boolean{
  return value instanceof Object && !(value instanceof Array);
}

/**
 * 深度遍历对象
 * @param target 目标对象
 * @param callback 处理每个元素的回调函数
 * @param path 当前元素的位置
 */
export function deepEach(target:any, callback:(value:any,path?:string)=>any=(value)=>value, path:string = "$"){
  let _target:any = null;
  if (isObject(target)) {
    const keys = Object.keys(target);
    _target = {};
    keys.forEach(key => {
      _target[key] = deepEach(target[key], callback, path+"."+key);
    });
  } else if (isArray(target)) {
    _target = [];
    target.forEach((item: any, index: number) => {
      _target[index] = deepEach(item, callback, path + `[${index}]`);
    });
  } else {
    return callback(target,path);
  }
  return _target;
}

export function sleep(interval=100){
  return new Promise(resolve => setTimeout(resolve, interval));
}