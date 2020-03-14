/**
 * @packageDocumentation
 * @module @tomato-js/math
 */
import { ObjectType } from "@tomato-js/shared";

/**
 * 求和
 *
 * 脚本举例
 * ```
 *   import { sumBy } from '@tomato-js/math'
 *   sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n);
 * ```
 *
 * @param nums - 一个个传入的值
 * @returns 总和
 */
export function sumBy(arr: ObjectType<number>[], fn: (value: ObjectType<number>, index: number, array: ObjectType<number>[]) => number) {
  return arr.map(fn).reduce((acc, val) => acc + val, 0);
}
