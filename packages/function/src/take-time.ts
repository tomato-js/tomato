/**
 * @packageDocumentation
 * @module @tomato-js/function
 */

/**
 * 输出函数耗时
 *
 * 脚本举例
 * ```
 *   import { takeTime } from '@tomato-js/function'
 *   takeTime(() => Math.pow(2, 10));
 * ```
 *
 * @param callback - 需要统计的函数
 * @returns 耗时
 */
export function takeTime(callback: Function) {
  console.time("takeTime");
  const r = callback();
  console.timeEnd("takeTime");
  return r;
}
