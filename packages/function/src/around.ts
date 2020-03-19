/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { aop } from "./aop";

/**
 * AOP增强之前后切片
 *
 * 脚本举例
 * ```
 *   import { around } from '@tomato-js/function'
 *   let origin = (str) => console.log(str);
 *   const target = ({args,value}) => console.log('around');
 *   origin = around(origin, target);
 *   origin('current');//around current around
 * ```
 *
 * @param origin - 原始函数
 * @param target - 注入的切片函数
 * @returns 新函数
 */
export function around(origin: Function, target: Function) {
  return aop(origin, target, "around");
}
