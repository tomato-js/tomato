/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */

import { isArray, isObject } from "./is-type";
import { ObjectType, Eachable } from "./types";

function forEachArray(elements: any[], func: (k: any, v: any) => any) {
  let rst;
  for (let i = 0, len = elements.length; i < len; i++) {
    rst = func(i, elements[i]);
    if (rst === false) {
      break;
    }
  }
}

function forEachObject(elements: ObjectType<any>, func: (k: any, v: any) => any) {
  let rst;
  for (const k in elements) {
    if (elements.hasOwnProperty(k)) {
      rst = func(k, elements[k]);
      if (rst === false) {
        break;
      }
    }
  }
}
/**
 * 遍历对象或数组
 *
 * 脚本举例
 * ```
 *   import { forEach } from '@tomato-js/shared'
 *   const obj = {
 *     a: 1,
 *     b: 2
 *   };
 *   const obj2 = {};
 *   const arr = [1,2,3,4,5];
 *   forEach(obj, (k, v) => (obj2[v] = k));
 *   forEach(obj, (k, v) => console.log(v));
 * ```
 *
 * @param object - 需要判断的对象
 * @returns 是否为没有属性的空对象如{}
 */
export function forEach(elements: Eachable<any>, func: (k: any, v: any) => any) {
  if (!elements) {
    return;
  }
  if (isArray(elements)) {
    forEachArray(elements as Array<any>, func);
  } else if (isObject(elements)) {
    forEachObject(elements, func);
  }
}
