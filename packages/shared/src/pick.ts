/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
import { ObjectType } from "./types";
import { forEach } from "./for-each";
import { asReg } from "./regexp";

const hasOwnProperty = Object.prototype.hasOwnProperty;

interface ReplaceValueOptions<T> {
  handler?: (k: string, v: T) => any;
}
function parseX<T>(object: ObjectType<T>, keys: string[] = [], options: ReplaceValueOptions<T>) {
  const result: ObjectType<T> = {};
  const { handler } = options;
  forEach(keys, (index, key) => {
    let aliasKey = key;
    let objectValue: any;
    const asMatched = key.match(asReg);
    // handle 'a as c'
    if (asMatched) {
      key = RegExp.$1; //a
      aliasKey = RegExp.$2; //c
    }
    objectValue = deepGet(key, object);
    if (objectValue) {
      result[aliasKey] = handler ? handler.call(object, aliasKey, objectValue) : objectValue;
    }
  });
  return result;
}
/**
 * 获取对象深层次内容
 *
 * 脚本举例
 * ```
 *   import { deepGet } from '@tomato-js/shared'
 *   const obj = {a:b:{c:'d'},aa:'bb'}
 *   const c = deepGet('a.b.c',obj);//'d'
 * ```
 *
 * @param path - 对象寻找路径如a.b.c
 * @param object - 需要解析的对象
 * @returns 找到的内容
 */
export function deepGet(path: string, object: ObjectType<any>): any {
  const index = path.indexOf(".");
  const k = path.slice(0, index);
  const rest = path.slice(index + 1);
  const firstObj = object[k];
  if (index === -1) {
    if (hasOwnProperty.call(object, path)) {
      return object[path];
    }
  } else {
    return deepGet(rest, firstObj);
  }
}
/**
 * 获取对象某些值，组成新对象
 *
 * 脚本举例
 * ```
 *   import { pick } from '@tomato-js/shared'
 *   const obj = {a:b:{c:'d'},aa:'bb',e:'f'}
 *   const obj1 = pick(obj,['aa']);//{aa:'bb'}
 *   const obj2 = pick(obj,['aa','e']);//{aa:'bb',e:'f'}
 *   const obj3 = pick(obj,['aa','e'],(k,v)=>k==='e'?v+1:v);//{aa:'bb',e:'f1'}
 * ```
 *
 * @param object - 需要解析的对象
 * @param keys - 需要获取的key
 * @param hanlder - 批量处理函数
 * @returns 组成的新对象
 */
export function pick<T>(object: ObjectType<T>, keys: string[] = [], handler?: (k: string, v: T) => any) {
  if (object === null) {
    return {};
  }
  const result: ObjectType<T> = {};
  forEach(keys, (index, key) => {
    if (hasOwnProperty.call(object, key)) {
      result[key] = handler ? handler.call(object, key, object[key]) : object[key];
    }
  });
  return result;
}

/**
 * 深度获取对象某些值及更换key名，组成新对象，pick的升级版
 *
 * 脚本举例
 * ```
 *   import { pickX } from '@tomato-js/shared'
 *   const obj = {a:b:{c:'d'},aa:'bb',e:'f'}
 *   const obj1 = pick(obj,['a.b.c as g']);//{g:'d'}
 *   const obj2 = pick(obj,['aa as aaa','e as ee']);//{aaa:'bb',ee:'f'}
 *   const obj3 = pick(obj,['aa as aaa','e as ee'],(k,v)=>k==='ee'?v+1:v);//{aaa:'bb',ee:'f1'}
 * ```
 *
 * @param object - 需要解析的对象
 * @param keys - 需要获取的key
 * @param hanlder - 批量处理函数
 * @returns 组成的新对象
 */
export function pickX<T>(object: ObjectType<T>, keys: string[] = [], handler?: (k: string, v: T) => any) {
  if (object === null) {
    return {};
  }
  return parseX(object, keys, {
    handler
  });
}
