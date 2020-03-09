/**
 * @packageDocumentation
 * @module @tomato-js/element
 */

/**
 * 判断页面是否滚动到底部
 *
 *
 * 脚本举例
 * ```
 *   import { bottomVisible } from '@tomato-js/element'
 *   bottomVisible();//true
 * ```
 *
 * @returns 是否滚动到底部
 */
export default function bottomVisible() {
  return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
}
