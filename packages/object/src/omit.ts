/**
 * @packageDocumentation
 * @module @tomato-js/object
 */

/**
 * 返回一个去除了某些项的新对象
 *
 * 新增于v0.0.22
 *
 * 脚本举例
 * ```
 *   import { omit } from '@tomato-js/object'
 *   omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd'])
 *   //{ b: 2, c: 3 }
 * ```
 *
 * @param object - 待挑选的对象
 * @param keys - 需要剔除的对象
 * @returns 返回去除了某些项后的新对象
 */
export function omit<T extends {}, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  const set = new Set(keys as string[]);
  const result: any = {};
  for (const [key, value] of Object.entries(object)) {
    if (!set.has(key)) {
      result[key] = value;
    }
  }
  return result;
}
