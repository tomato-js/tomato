/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
/**
 * curry增强函数
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { curry } from '@tomato-js/function'
 *   function compute(a, b, c, d) {
 *      return (a + b * c) / d;
 *   } // f(12, 3, 6, 2) == 15
 *   const f = curry(compute);
 *   const g = f(12);
 *   const result = g(3, 6, 2);//15
 * ```
 *
 * @param fns - 多个条件函数
 * @returns 新函数
 */
export function curry(fn: any, ...args: any[]) {
  if (args.length >= fn.length) {
    return fn(...args);
  }

  return function(...args2: any[]) {
    return curry(fn, ...args, ...args2);
  };
}
