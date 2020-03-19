/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 随机字符串
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { random } from '@tomato-js/string'
 *   random(3); // '2xK'
 * ```
 *
 * @param length - 字符串长度
 * @returns 随机字符串
 */
export function random(length: number) {
  const characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomChar = () => characterSet[Math.floor(Math.random() * characterSet.length)];
  let text = "";
  let idx = 0;
  while (idx < length) {
    text = text + randomChar();
    idx += 1;
  }
  return text;
}
