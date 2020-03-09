/**
 * @packageDocumentation
 * @module @tomato-js/element
 */

/**
 * 平滑的滚动到页面的顶部
 *
 *
 * 脚本举例
 * ```
 *   import { scrollToTop } from '@tomato-js/element'
 *   scrollToTop();
 * ```
 *
 * @returns 是否滚动到底部
 */
export default function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
