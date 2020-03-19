/**
 * @packageDocumentation
 * @module @tomato-js/object
 */
import { ObjectType, forEach, asReg } from "@tomato-js/shared";
import { deepGet } from "./deep-get";

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
 * 深度获取对象某些值及更换key名，组成新对象，pick的升级版
 *
 * 脚本举例
 * ```
 *   import { pickX } from '@tomato-js/object'
 *   const obj = {a:{b:{c:'d'}},aa:'bb',e:'f'}
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
