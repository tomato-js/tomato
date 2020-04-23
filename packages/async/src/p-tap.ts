/**
 * @packageDocumentation
 * @module @tomato-js/async
 */

/**
 * promise链参数透传
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 * ```
 *   import { pTap } from '@tomato-js/async'
 *   Promise.resolve('tomato')
 *   	.then(pTap(console.log)) // Logs `tomato`
 *   	.then(value => {
 *   		// `value` is still `tomato`
 *   	});
 * ```
 *
 * @param fn - 中间函数
 * @returns promise
 */

export function pTap<ValueType>(fn: (value: ValueType) => unknown) {
  return async function(value: ValueType) {
    await fn(value);
    return value;
  };
}
