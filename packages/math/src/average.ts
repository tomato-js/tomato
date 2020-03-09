/**
 * @packageDocumentation
 * @module @tomato-js/math
 */

/**
 * 判断数组内容是否一致
 *
 * 脚本举例
 * ```
 *   import { average } from '@tomato-js/math'
 *   average(...[1,2,3]);//2
 *   average(1,2,3);//2
 * ```
 *
 * @param arr - 需要判断的数组
 * @returns 是否内容一致
 */
export function average(...nums: number[]) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}
