/**
 * @packageDocumentation
 * @module @tomato-js/element
 */
import { HTMLSelector, isString } from "@tomato-js/shared";
/**
 * 获取dom节点
 *
 *
 * 结构举例
 * ```html
 *   <div id="abc">123</div>
 *   <div class="j-abc">123</div>
 * ```
 *
 * 脚本举例
 * ```javascript
 *   import { get } from '@tomato-js/element'
 *   const node = get('abc');
 *   const node2 = get('.j-abc');
 * ```
 *
 * @param str - id或者是提供给query的字符串
 * @returns 获取到的dom节点
 */
export default function get(str: HTMLSelector) {
  if (!str) {
    return null;
  }
  if (!isString(str)) {
    return str as HTMLElement;
  }
  let node = document.getElementById(str as string);
  if (node === null) {
    node = document.querySelector(str as string);
  }
  return node;
}
