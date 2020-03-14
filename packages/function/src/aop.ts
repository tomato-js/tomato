/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { isFunction } from "@tomato-js/shared";
interface AopEvent {
  args: any[];
  value?: any;
}
type AopType = "before" | "after" | "around" | "afterReturn";
function shouldExecBefore(type: AopType) {
  return ["before", "around"].includes(type);
}
function shouldExecAfter(type: AopType) {
  return ["after", "around"].includes(type);
}
function shouldExecAfterReturn(type: AopType) {
  return ["afterReturn"].includes(type);
}
/**
 * AOP增强底层函数
 *
 * 脚本举例
 * ```
 *   import { aop } from '@tomato-js/function'
 *   let origin = (str) => console.log(str);
 *   const target = ({args,value}) => console.log('around');
 *   origin = aop(origin, target,'around);
 *   origin('current');//around current around
 * ```
 *
 * @param origin - 原始函数
 * @param target - 注入的切片函数
 * @param aopType - 切片方案，支持after/before/around/afterReturn
 * @returns 新函数
 */
export function aop(origin: Function, target: Function, aopType: AopType) {
  if (!isFunction(origin) || !isFunction(target)) {
    throw new TypeError("Expected a function");
  }
  return function(...args: any) {
    const event: AopEvent = { args };
    if (shouldExecBefore(aopType)) target(event);
    event.value = origin.apply(null, event.args);
    if (shouldExecAfter(aopType)) target(event);
    if (shouldExecAfterReturn(aopType)) return target(event.value);
    return event.value;
  };
}
