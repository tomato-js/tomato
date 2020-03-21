/**
 * @packageDocumentation
 * @module @tomato-js/math
 */
import { curry } from "@tomato-js/function";

/**
 * 两值相乘，相当于a*b，带curry
 *
 * 增加于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { multiply } from '@tomato-js/math'
 *   multiply(4,3);//12
 *   multiply(4)(3);//12
 * ```
 *
 * @param num1 - 传入的值
 * @param num2 - 传入的值
 * @returns 结果值
 */
export const multiply = curry((num1: number, num2: number) => {
  return Number(num1) * Number(num2);
});
