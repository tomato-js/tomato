/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 字符串反转
 *
 * 脚本举例
 * ```
 *   import { reverse } from '@tomato-js/string'
 *   reverse('foobar'); // 'raboof'
 * ```
 *
 * @param string - 需要反转的字符串
 * @returns 反转后的字符串
 */
export function reverse(string: string) {
  return [...string].reverse().join("");
}
