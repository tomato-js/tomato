/**
 * @packageDocumentation
 * @module @tomato-js/cookie
 */

/**
 * 判断cookie中是否有该值
 *
 * 脚本举例
 * ```
 *   import { has } from '@tomato-js/cookie'
 *   has('name');
 * ```
 *
 * @param name - 需要判断的key
 * @param cookie - 默认为document.cookie
 * @returns 是否存在
 */
export function has(name: string, cookie: string = document.cookie) {
  return new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[-.+*]/g, "\\$&") + "\\s*\\=").test(cookie);
}
