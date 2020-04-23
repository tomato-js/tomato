/**
 * @packageDocumentation
 * @module @tomato-js/math
 */
import { curry } from "@tomato-js/function";

/**
 * 两值相除，相当于a/b，带curry
 *
 * 增加于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { divide } from '@tomato-js/math'
 *   divide(12,3);//4
 *   divide(12)(3);//4
 * ```
 *
 * @param num1 - 传入的值
 * @param num2 - 传入的值
 * @returns 结果值
 */
export const divide = curry((num1: number, num2: number) => {
  return Number(num1) / Number(num2);
});
