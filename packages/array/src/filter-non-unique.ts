/**
 * @packageDocumentation
 * @module @tomato-js/array
 */
/**
 * 数组去重
 *
 * 脚本举例
 * ```
 *   import { filterNonUnique } from '@tomato-js/array'
 *   filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
 * ```
 *
 * @param arr - 数组
 * @returns 去重后的数组
 */
export function filterNonUnique(arr: any[]) {
  return [...new Set(arr)];
}
