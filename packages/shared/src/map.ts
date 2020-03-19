/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
import { isArray, isObject } from "./is-type";
import { ObjectType, Eachable } from "./types";
import { forEach } from "./for-each";

function mapArray(elements: any[], func: (k: any, v: any) => any) {
  const arr: any[] = [];
  forEach(elements, (key: any, value: any) => {
    arr.push(func(key, value));
  });
  return arr;
}

function mapObject(elements: ObjectType<any>, func: (k: any, v: any) => any) {
  const obj: ObjectType<any> = {};
  forEach(elements, (key: any, value: any) => {
    obj[key] = func(key, value);
  });
  return obj;
}
/**
 * 遍历对象或数组，返回新对象或数组
 *
 * 脚本举例
 * ```
 *   import { map } from '@tomato-js/shared'
 *   const obj = {
 *     a: 1,
 *     b: 2
 *   };
 *   const obj2 = {};
 *   const arr = [1,2,3,4,5];
 *   map(obj, (k, v) => (obj2[v] = k));
 *   map(arr, (k, v) => v=v+1);//[2,3,4,5,6]
 * ```
 *
 * @param elements - 需要遍历的值
 * @param func - 执行函数
 */
export function map(elements: Eachable<any>, func: (k: any, v: any) => any) {
  if (!elements) {
    return;
  }
  if (isArray(elements)) {
    return mapArray(elements as Array<any>, func);
  } else if (isObject(elements)) {
    return mapObject(elements, func);
  }
}
