/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 去除字符串中所有空白
 *
 * 新增于v0.0.19
 *
 * 脚本举例
 * ```
 *   import { trimAll } from '@tomato-js/string'
 * ```
 */
export function trimAll(str: string) {
  return str.replace(/\s+/g, "");
}
