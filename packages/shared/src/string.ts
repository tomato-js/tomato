/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */

interface SubstringOptions {
  itself: boolean;
}
/**
 * 截取匹配到的字符后面的内容
 *
 * 脚本举例
 * ```
 *   import { substringFromChar } from '@tomato-js/shared'
 *   const str = substringFromChar('hello world','l');//'lo world'
 * ```
 *
 * @param string - 原来的字符串
 * @param char - 标识字符
 * @param options - 其他参数
 * @param options.itself - 截取的字符串是否包含char本身，默认为false
 * @returns 截取后的字符串
 */
export function substringFromChar(
  string: string,
  char: string,
  options: SubstringOptions = {
    itself: false
  }
) {
  const { itself } = options;
  if (string.indexOf(char) === -1) return "";
  const indexOfChar = itself ? string.indexOf(char) : string.indexOf(char) + 1;
  return string.substring(indexOfChar);
}
/**
 * 截取匹配到的字符前面的内容
 *
 * 脚本举例
 * ```
 *   import { substringToChar } from '@tomato-js/shared'
 *   const str = substringToChar('hello world','l');//'he'
 * ```
 *
 * @param string - 原来的字符串
 * @param char - 标识字符
 * @param options - 其他参数
 * @param options.itself - 截取的字符串是否包含char本身，默认为false
 * @returns 截取后的字符串
 */
export function substringToChar(
  string: string,
  char: string,
  options: SubstringOptions = {
    itself: false
  }
) {
  const { itself } = options;
  if (string.indexOf(char) === -1) return "";
  const indexOfChar = itself ? string.indexOf(char) + 1 : string.indexOf(char);
  return string.substring(0, indexOfChar);
}
