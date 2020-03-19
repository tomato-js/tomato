/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
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
