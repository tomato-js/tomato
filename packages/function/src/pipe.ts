/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { compose } from "./compose";
/**
 * pipe增强函数，相当于f(g(x))，从左到右
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { pipe } from '@tomato-js/function'
 *   const step1 = (x: number) => (x ? 1 : 2);
 *   const step2 = (x: number) => (x === 1 ? 3 : 4);
 *   const step3 = (x: number) => (x === 3 ? 5 : 6);
 *   const getResult = pipe(step1, step2, step3);
 *   const result = getResult(1);//5
 * ```
 *
 * @param args - 多个函数
 * @returns 新函数
 */
export function pipe(...args: any[]) {
  return compose(...args.reverse());
}
