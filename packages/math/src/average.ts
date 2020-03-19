/**
 * @packageDocumentation
 * @module @tomato-js/math
 */

/**
 * 求平均值
 *
 * 脚本举例
 * ```
 *   import { average } from '@tomato-js/math'
 *   average(...[1,2,3]);//2
 *   average(1,2,3);//2
 * ```
 *
 * @param nums - 一个个传入的值
 * @returns 平均值
 */
export function average(...nums: number[]) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}
