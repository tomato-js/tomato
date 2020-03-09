/**
 * @packageDocumentation
 * @module @tomato-js/array
 */

/**
 * 统计数组中某个值出现的次数
 *
 * 脚本举例
 * ```
 *   import { countOccurrences } from '@tomato-js/array'
 *   countOccurrences([3,3,2],3);//2
 *   countOccurrences(['3',3,2],'3');//1
 * ```
 *
 * @param arr - 数组
 * @param val - 参考值
 * @returns 出现次数
 */
export function countOccurrences(arr: any[], val: any) {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
}
