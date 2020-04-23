/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
/**
 * flip增强函数参数反转
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { flip } from '@tomato-js/function'
 *   const f = function(a: string, b: string, c: string) {
 *     return a + " " + b + " " + c;
 *   };
 *   const g = flip(f);
 *   const result = g("a", "b", "c");//c b a
 * ```
 *
 * @param func - 需要增强的函数
 * @returns 新函数
 */
export function flip(func: Function) {
  return function(...args: any[]) {
    return func(...args.reverse());
  };
}
