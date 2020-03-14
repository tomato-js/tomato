/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { aop } from "./aop";

/**
 * AOP增强之向后切片并透传返回值
 *
 * 脚本举例
 * ```
 *   import { afterReturn } from '@tomato-js/function'
 *   let origin = (str) => str;
 *   const target = (str) => console.log(str);
 *   origin = afterReturn(origin, target);
 *   origin('current');//current
 * ```
 *
 * @param origin - 原始函数
 * @param target - 注入的切片函数
 * @returns 新函数
 */
export function afterReturn(origin: Function, target: Function) {
  return aop(origin, target, "afterReturn");
}
