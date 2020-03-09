/**
 * @packageDocumentation
 * @module @tomato-js/array
 */

/**
 * 判断数组内容是否一致
 *
 * 脚本举例
 * ```
 *   import { allEqual } from '@tomato-js/array'
 *   allEqual([3,3,3]);//true
 * ```
 *
 * @param arr - 需要判断的数组
 * @returns 是否内容一致
 */
export function allEqual<T>(arr: T[]) {
  return arr.every(val => val === arr[0]);
}
