import { deepEach } from "@app/utils";
import jmespath from "jmespath";
import { parse } from "node-html-parser";
import { HttpCrawler } from "./HttpCrawler";

interface FunctionHanler {
  (...str: string[]): any;
}

/**
 * 指令类
 * 指令格式：{{v-<指令名>[=<参数>]}}
 */
export class Directive {
  _v: string[] = [];
  refer?:HttpCrawler | undefined;
  constructor(init?: Directive) {
    Object.assign(this, init);
  }

  deepTransform (target: any, refer: any = this.refer): any {
    const _target = deepEach(target, (value, path) => {
      if (value.search(/\{\{.*\[\*\].*\}\}/gm) !== -1) {
        this._v.push(path as string);
      }
      return this.transform(value, refer);
    });
    _target['_v'] = this._v;
    return _target;
  }
  /**
   * 执行字符串内的指令函数，并且将指令替换为值
   * @param value 一个字符串
   * @param refer 参考对象
   */
  transform (value: string, refer: any) {
    if (typeof value !== 'string') {
      return value;
    }

    const matchs = this.parser(value);

    if (matchs.length === 0) {
      return value;
    }
    //指令和值的映射对象
    const map = matchs.reduce((perv: any, curr) => {
      
      const res = this[curr.directive](refer, curr.argStr);
      perv[curr.source] = res instanceof Array ? res : [res]
      return perv;
    }, {});

    //获取元素最多的指令结果
    const keys = Object.keys(map);
    let maxKey = keys[0];
    keys.forEach(key => {
      if (map[key].length > map[maxKey].length) {
        maxKey = key;
      }
    })
    const maxLen = map[maxKey] ? map[maxKey].length : 0;

    //将不同长度的元素对齐
    keys.forEach(key => {
      const item = map[key];
      const oldLen = item.length;
      const lastItem = item[oldLen - 1];
      item.length = maxLen;
      item.fill(lastItem, oldLen, maxLen);
    })

    //替换指令为值
    const vals = [];
    for (let i = 0; i < maxLen; i++) {
      let val = value;
      keys.forEach((key: any) => {
        val = val.replace(key, map[key][i]);
      })
      vals.push(val);
    }
    return vals.length === 1 ? vals[0] : vals;
  }

  parser (value: string) {
    const directiveMatch: string[] | null = value.match(/\{\{v-.+?\}\}/gm);

    if (directiveMatch === null) {
      return [];
    }
    return directiveMatch.map((curr: any) => {
      const str = curr.replace(/\{|\}/gm, '');
      const directive = str.substring(0, str.indexOf("="));
      const argStr = str.substring(str.indexOf("=") + 1);
      return { source: curr, directive, argStr };
    });
  }

  /**
   * 获取当前实例
   * @param key JSON查询字符串
   */
  ['v-refer'] (refer:any, key: string): any {
    return jmespath.search(refer, key);
  }

  /**
   * 根据key返回状态的值
   * @param key JSON查询字符串
   */
  ['v-state'] (refer: any, key: string): any {
    return jmespath.search(refer.state, key);
  }

  /**
   * 根据key返回状态的值
   * @param key JSON查询字符串
   */
  ['v-meta'] (refer: any, key: string): any {
    return jmespath.search(refer.meta, key);
  }
  /**
   * 查询上一个step的对象
   * @param key JSON查询字符串
   */
  ['v-prev'] (refer: any, key: string): any {
    return jmespath.search(refer.steps[refer.state.current-1], key);
  }

  /**
   * 查询上一个step的对象的rawResults
   * @param key JSON查询字符串
   */
  ['v-prev-resu-raw'] (refer: any, key: string): any {
    return jmespath.search(refer.steps[refer.state.current-1].rawResults, key);
  }

  /**
   * 查询上一个step的对象的results
   * @param key JSON查询字符串
   */
  ['v-prev-resu'] (refer: any, key: string): any {
    return jmespath.search(refer.steps[refer.state.current-1].results, key);
  }

  /**
   * 查询上一个step的对象的response
   * @param key JSON查询字符串
   */
  ['v-prev-resp'] (refer: any, key: string): any {
    return jmespath.search(refer.steps[refer.state.current-1].responses, key);
  }

  /**
   * 查询当前step的对象
   * @param key JSON查询字符串
   */
  ['v-curr'] (refer:any,key: string): any {
    return jmespath.search(refer.steps[refer.state.current], key);
  }

  /**
   * 获取当前的response
   * @param key JSON查询字符串
   */
  ['v-resp'] (refer:any,key: string): any {
    return jmespath.search(refer.response, key);
  }

  /**
   * 获取当前的response
   * @param key JSON查询字符串
   */
  ['v-resp-html'] (refer:any,key: string): any {

    const [htmlSelector,jsonSelector] = key.split('|');
    const dom = parse(refer.response.data);
    const result = dom.querySelectorAll(htmlSelector);
    return jmespath.search(result, jsonSelector);
  }

  [key: string]: FunctionHanler | any;
}
