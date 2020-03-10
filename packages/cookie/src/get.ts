/**
 * @packageDocumentation
 * @module @tomato-js/cookie
 */

/**
 * 取cookie值
 *
 * 脚本举例
 * ```
 *   import { get } from '@tomato-js/cookie'
 *   get('name');
 * ```
 *
 * @param name - 需要取的key
 * @param cookie - 默认为document.cookie
 * @returns 对应key的value值
 */
export function get(name: string, cookie: string = document.cookie) {
  return (
    decodeURIComponent(
      cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")
    ) || null
  );
}
