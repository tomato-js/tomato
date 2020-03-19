/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { isFunction } from "@tomato-js/shared";
import { curry } from "./curry";
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
export function both(...fns: Array<boolean>): () => boolean;
export function both(...fns: Array<Function>): () => boolean;
export function both(...fns: Array<Function | boolean>) {
  return function() {
    return fns.every(fn => {
      return isFunction(fn) ? (fn as () => boolean)() : fn;
    });
  };
}
