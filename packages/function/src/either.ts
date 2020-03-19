/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { isFunction } from "@tomato-js/shared";
/**
 * either增强函数，相当于函数||
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { either } from '@tomato-js/function'
 *   function isOver18(){};
 *   function isCitizen(){};
 *   const isEligibleToVote = either(isOver18,isCitizen);
 *   isEligibleToVote()
 * ```
 *
 * @param fns - 多个条件函数
 * @returns 新函数
 */
export function either(...fns: Array<boolean>): () => boolean;
export function either(...fns: Array<() => boolean>): () => boolean;
export function either(...fns: Array<(() => boolean) | boolean>) {
  return function() {
    return fns.some(fn => {
      return isFunction(fn) ? (fn as () => boolean)() : fn;
    });
  };
}
