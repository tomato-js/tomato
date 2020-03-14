/**
 * @packageDocumentation
 * @module @tomato-js/math
 */

/**
 * 求和
 *
 * 脚本举例
 * ```
 *   import { sum } from '@tomato-js/math'
 *   average(...[1,2,3]);//6
 *   average(1,2,3);//6
 * ```
 *
 * @param nums - 一个个传入的值
 * @returns 总和
 */
export function sum(...nums: number[]) {
  return nums.reduce((acc, val) => acc + val, 0);
}
