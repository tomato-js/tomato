/**
 * @packageDocumentation
 * @module @tomato-js/object
 */
import { isObject, isArray, isFunction } from "@tomato-js/shared";

/**
 * 深拷贝对象、数组、函数
 *
 * 新增于v0.0.14
 *
 * 脚本举例
 * ```
 *   import { deepClone } from '@tomato-js/object'
 *   const obj = { a: 1, b: 2, c: [1, 2, 3, { e: 5, f: [{ g: 1 }, { h: 8 }], i: 9 }]}
 *   const c = deepClone(obj);
 * ```
 *
 * @param value - 被拷贝对象
 * @returns 拷贝对象
 */
export function deepClone(value: any) {
  if (!isObject(value)) {
    return value;
  }
  let result: any;
  const isArr = isArray(value);
  const isFunc = isFunction(value);
  if (isArr) {
    result = value.map((item: any) => deepClone(item));
  } else if (isFunc) {
    result = value.bind({});
  } else {
    result = Object.assign({}, value);
    Object.keys(value).forEach(key => (result[key] = deepClone(value[key])));
  }
  return result;
}
