/**
 * @packageDocumentation
 * @module @tomato-js/function
 */

/**
 * 执行多次
 *
 * 脚本举例
 * ```
 *   import { times } from '@tomato-js/function'
 *   times(5,() => Math.pow(2, 10));
 * ```
 *
 * @param n - 执行次数
 * @param fn - 需要执行的函数
 * @param context - 作用域指向
 * @returns 耗时
 */
export function times(n: number, fn: Function, context = undefined) {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
}
