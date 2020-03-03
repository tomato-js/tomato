/**
 * @packageDocumentation
 * @module @tomato-js/object
 */
import { ObjectType } from "@tomato-js/shared";
import { forEach } from "@tomato-js/shared";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 获取对象某些值，组成新对象
 *
 * 脚本举例
 * ```
 *   import { pick } from '@tomato-js/object'
 *   const obj = {a:{b:{c:'d'}},aa:'bb',e:'f'}
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
