/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { aop } from "./aop";

/**
 * AOP增强之向后切片
 *
 * 脚本举例
 * ```
 *   import { after } from '@tomato-js/function'
 *   let origin = (str) => console.log(str);
 *   const target = ({args,value}) => console.log('after');
 *   origin = after(origin, target);
 *   origin('current');//current after
 * ```
 *
 * @param origin - 原始函数
 * @param target - 注入的切片函数
 * @returns 新函数
 */
export function after(origin: Function, target: Function) {
  return aop(origin, target, "after");
}
