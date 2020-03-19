/**
 * @packageDocumentation
 * @module @tomato-js/array
 */
import { isArray } from "@tomato-js/shared";

/**
 * 在数组中寻找指定值
 *
 * 脚本举例
 * ```
 *   import { find } from '@tomato-js/array'
 *   find([1, 2, 3], v=>v/2===0); // 2
 * ```
 *
 * @param arr - 原始数组
 * @param n - 新数组元素个数
 * @returns 随机新数组
 */
export function find(arr: any[], func: Function) {
  if (!isArray(arr)) return null;
  let idx = 0;
  const len = arr.length;
  while (idx < len) {
    if (func(arr[idx])) {
      return arr[idx];
    }
    idx += 1;
  }
}
