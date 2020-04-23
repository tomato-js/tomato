/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { isFunction } from "@tomato-js/shared";
/**
 * both增强函数，相当于函数&&
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { both } from '@tomato-js/function'
 *   function isOver18(){};
 *   function isCitizen(){};
 *   const isEligibleToVote = both(isOver18,isCitizen);
 *   isEligibleToVote();
 * ```
 *
 * @param fns - 多个条件函数
 * @returns 新函数
 */
export function both(...fns: Array<boolean>): Function;
export function both(...fns: Array<Function>): Function;
export function both(...fns: Array<Function | boolean>) {
  return function(...args: any[]) {
    return fns.every(fn => {
      return isFunction(fn) ? (args.length > 0 ? (fn as Function)(...args) : (fn as Function)()) : fn;
    });
  };
}
