/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
import { FunctionType, isNil } from "@tomato-js/shared";

type Options = {
  isImmediate: boolean;
};

/**
 * 函数节流
 *
 * 新增于v0.0.17
 *
 * 脚本举例
 * ```
 *   import { throttle } from '@tomato-js/function'
 *   throttle(() => console.log('throttle'), 1000, { isImmediate: true });
 * ```
 *
 * @param func - 调用函数
 * @param wait - 延迟执行毫秒数
 * @param isImmediate - 是否立即执行，true 表立即执行，false 表非立即执行
 * @returns 新函数
 */
export function throttle<F extends FunctionType>(
  func: F,
  wait: number = 50,
  options: Options = {
    isImmediate: false
  }
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const doLater = function() {
      if (!isNil(timeout)) {
        clearTimeout(timeout);
      }
      timeout = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    };
    if (!isNil(timeout)) return;
    const shouldCallNow = options.isImmediate && isNil(timeout);
    timeout = setTimeout(doLater, wait);
    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
}
