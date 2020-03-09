/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 判断给定的字符串是否是 JSON 字符串
 *
 * 脚本举例
 * ```
 *   import { isJson } from '@tomato-js/string'
 *   isJson('{"name":"brizer","age":20}'); // true
 *   isJson('{"name":"brizer",age:"20"}'); // false
 * ```
 *
 * @param string - 检查的字符串
 * @returns 是否为json格式
 */
export function isJson(string: string) {
  try {
    JSON.parse(string);
    return true;
  } catch (e) {
    return false;
  }
}
