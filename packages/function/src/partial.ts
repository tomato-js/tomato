/**
 * @packageDocumentation
 * @module @tomato-js/function
 */

/**
 * partial增强函数偏函数，固定前置参数返回新函数
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { partial } from '@tomato-js/function'
 *   function compute(a: number, b: number, c: number, d: number) {
 *       return (a + b * c) / d;
 *   } // f(12, 3, 6, 2) == 15
 *   const f = partial(compute,[12,3]);
 *   const result = f(6,2);//15
 * ```
 *
 * @param func - 需要增强的函数
 * @param args - 固定前置参数数组
 * @returns 新函数
 */
export function partial(func: Function, args: any[]) {
  return function(...args2: any[]) {
    return func(...args, ...args2);
  };
}
