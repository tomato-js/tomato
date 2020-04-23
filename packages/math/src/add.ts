/**
 * @packageDocumentation
 * @module @tomato-js/math
 */
import { curry } from "@tomato-js/function";

/**
 * 两值相加，相当于a+b，带curry
 *
 * 增加于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { add } from '@tomato-js/math'
 *   add(3,4);//7
 *   add(3)(4);//7
 * ```
 *
 * @param num1 - 传入的值
 * @param num2 - 传入的值
 * @returns 结果值
 */
export const add = curry((num1: number, num2: number) => {
  return Number(num1) + Number(num2);
});
