/**
 * @packageDocumentation
 * @module @tomato-js/math
 */
import { ObjectType } from "@tomato-js/shared";

/**
 * 求平均值
 *
 * 脚本举例
 * ```
 *   import { averageBy } from '@tomato-js/math'
 *   averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n);
 * ```
 *
 * @param nums - 一个个传入的值
 * @returns 平均值
 */
export function averageBy(arr: ObjectType<number>[], fn: (value: ObjectType<number>, index: number, array: ObjectType<number>[]) => number) {
  return arr.map(fn).reduce((acc, val) => acc + val, 0) / arr.length;
}
