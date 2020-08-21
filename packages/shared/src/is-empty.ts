/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
import { isArray, isNil, isObject } from "./is-type";
/**
 * 是否为空对象
 *
 * 脚本举例
 * ```
 *   import { isEmptyObject } from '@tomato-js/shared'
 *   const node = isEmptyObject({});//true
 * ```
 *
 * @param object - 需要判断的对象
 * @returns 是否为没有属性的空对象如{}
 */
export function isEmptyObject(object: any) {
  return !Object.keys(object).length;
}

/**
 * 是否为空数组
 *
 * 新增于v0.0.22
 *
 * 脚本举例
 * ```
 *   import { isEmptyArray } from '@tomato-js/shared';
 *   const node = isEmptyArray([]);//true
 *   const node = isEmptyArray([1]);//false
 * ```
 *
 * @param arr - 需要判断的数组
 * @returns 是否为没有属性的数组比如[]
 */
export function isEmptyArray(arr: any[]) {
  return isArray(arr) && arr.length === 0;
}

/**
 * 是否为空对象或空数组
 *
 * 新增于v0.0.22
 *
 * 脚本举例
 * ```
 *   import { isEmpty } from '@tomato-js/shared'
 *   const node = isEmptyArray([]);//true
 *   const node = isEmptyArray([1]);//false
 * ```
 *
 * @param collection - 需要判断的集合
 * @param containNil - 是否需要算上null或undefined，默认为true
 * @returns 是否为没有属性的空对象如{}，数组如[]，undefined，null
 */
export function isEmpty(collection: any, containNil: boolean = true) {
  if (containNil && isNil(collection)) {
    return true;
  }
  if (isArray(collection)) {
    return isEmptyArray(collection);
  }
  if (isObject(collection)) {
    return isEmptyObject(collection);
  }
  return false;
}
