/**
 * @packageDocumentation
 * @module @tomato-js/array
 */

/**
 * 在数组中随机生选择 n 个元素生成新的数组
 * 基于Fisher–Yates shuffle 洗牌算法
 *
 * 脚本举例
 * ```
 *   import { sampleSize } from '@tomato-js/array'
 *   sampleSize([1, 2, 3], 2); // [3,1]
 * ```
 *
 * @param arr - 原始数组
 * @param n - 新数组元素个数
 * @returns 随机新数组
 */
export function sampleSize([...arr], n = 1) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
}
