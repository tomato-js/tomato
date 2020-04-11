/**
 * @packageDocumentation
 * @module @tomato-js/async
 */
import { pTap } from "./p-tap";

/**
 * promise链参数透传
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 * ```
 *   import { pLog } from '@tomato-js/async'
 *   Promise.resolve('tomato')
 *   	.then(pLog()) // Logs `tomato`
 *   	.then(value => {
 *   		// `value` is still `tomato`
 *   	});
 * ```
 *
 * @param fn - 中间函数
 * @returns promise
 */

export function pLog<ValueType>(logger: (message?: any, ...optionalParams: any[]) => void = console.log) {
  return pTap(function(value: ValueType) {
    logger(value);
  });
}
