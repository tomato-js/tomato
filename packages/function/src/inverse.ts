/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { not } from "@tomato-js/shared";
import { afterReturn } from "./after-return";

/**
 * 反转函数逻辑，返回新函数。之前返回true的情况，新函数会返回false
 *
 * 脚本举例
 * ```
 *   import { inverse } from '@tomato-js/function'
 *   const isTrue = ()=>true;
 *   const isFalse = inverse(isTrue);
 *   isTrue()//true
 *   isFalse()//false
 * ```
 *
 * @param func - 需要逻辑反转的函数
 * @returns 新函数
 */
export function inverse(func: Function) {
  return afterReturn(func, (v: boolean) => not(v));
}
