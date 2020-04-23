/**
 * @packageDocumentation
 * @module @tomato-js/async
 */
import { isFunction } from "@tomato-js/shared";

/**
 * 有条件的promise链
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 * ```
 *   import { pIf } from '@tomato-js/async'
 *   Promise.resolve([]).then(pIf(condition(), () => "if",()=>"else")).then;
 *   Promise.resolve([]).then(pIf(true, () => "if").then();
 * ```
 *
 * @param condition - 判断条件
 * @param doIf - true时后续逻辑函数
 * @param doElse - false时后续逻辑函数
 * @returns promise
 */

export function pIf<ValueType, DoIfRetureType, DoElseReturnType>(
  condition: boolean | ((value: ValueType) => boolean | PromiseLike<boolean>),
  doIf: (value: ValueType) => DoIfRetureType,
  doElse?: (value: ValueType) => DoElseReturnType | PromiseLike<DoElseReturnType>
) {
  return async function(value: ValueType) {
    function chooseFn(boolean: boolean) {
      return boolean === true ? doIf(value) : doElse ? doElse(value) : value;
    }
    if (isFunction(condition)) {
      const conditionResult = await condition(value);
      return chooseFn(conditionResult);
    }
    return chooseFn(condition);
  };
}
