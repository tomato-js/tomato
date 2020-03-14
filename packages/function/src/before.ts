/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { aop } from "./aop";

/**
 * AOP增强之向前切片
 *
 * 脚本举例
 * ```
 *   import { before } from '@tomato-js/function'
 *   let origin = (str) => console.log(str);
 *   const target = ({args,value}) => console.log('before');
 *   origin = before(origin, target);
 *   origin('current');//before current
 * ```
 *
 * @param origin - 原始函数
 * @param target - 注入的切片函数
 * @returns 新函数
 */
export function before(origin: Function, target: Function) {
  return aop(origin, target, "before");
}
