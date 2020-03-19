/**
 * @packageDocumentation
 * @module @tomato-js/array
 */
import { isArray } from "@tomato-js/shared";
/**
 * 将多维数组展平成一维数组
 *
 * 脚本举例
 * ```
 *   import { deepFlatten } from '@tomato-js/array'
 *   deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
 * ```
 *
 * @param arr - 多维数组
 * @returns 扁平化后的一维数组
 */
export function deepFlatten(arr: any[]): any {
  return [].concat(...arr.map(v => (isArray(v) ? deepFlatten(v) : v)));
}
