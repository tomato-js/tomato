/**
 * @packageDocumentation
 * @module @tomato-js/array
 */

/**
 * 多数组去重合并
 *
 * 脚本举例
 * ```
 *   import { union } from '@tomato-js/array'
 *   union([3, 7, 9, 11],[2, 3, 4]); // [2,3,4,7,9,11]
 * ```
 *
 * @param arr - 原始数组
 * @returns 去重后数组
 */
function union(a: string[], ...otherList: string[]): string[];
function union(a: number[], ...otherList: number[]): number[];
function union(a: Array<string | number>, ...otherList: Array<string | number>): Array<string | number>;
function union(a: Array<string | number>, ...otherList: Array<string | number>) {
  return Array.from(new Set([...a, ...otherList]));
}

export { union };
