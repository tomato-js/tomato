/**
 * @packageDocumentation
 * @module @tomato-js/array
 */

import { sampleSize } from "./sample-size";

/**
 * 在数组中随机取1个值
 *
 * 脚本举例
 * ```
 *   import { sample } from '@tomato-js/array'
 *   sample([3, 7, 9, 11]); // 9
 * ```
 *
 * @param arr - 原始数组
 * @returns 随机值
 */
export function sample([...arr]) {
  return sampleSize(arr, 1)[0];
}
