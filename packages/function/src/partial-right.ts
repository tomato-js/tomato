/**
 * @packageDocumentation
 * @module @tomato-js/function
 */

/**
 * partialRight增强函数偏函数，固定后置参数返回新函数
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { partialRight } from '@tomato-js/function'
 *   function compute(a: number, b: number, c: number, d: number) {
 *       return (a + b * c) / d;
 *   } // f(12, 3, 6, 2) == 15
 *   const f = partialRight(compute,[6,2]);
 *   const result = f(12,3);//15
 * ```
 *
 * @param func - 需要增强的函数
 * @param args - 固定前置参数数组
 * @returns 新函数
 */
export function partialRight(func: Function, args: any[]) {
  return function(...args2: any[]) {
    return func(...args2, ...args);
  };
}
