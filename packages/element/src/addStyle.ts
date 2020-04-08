/**
 * @packageDocumentation
 * @module @tomato-js/element
 */

import create from "./create";
import { append } from "./insert";
import { blankReg } from "@tomato-js/shared";
/**
 * 增加一段样式到head底部
 *
 *
 * 脚本举例
 * ```
 *   import { addStyle } from '@tomato-js/element'
 *   // 创建一段样式到页面head
 *   addStyle('body{background:red;}');
 *   // 创建一段多行样式到页面head
 *   const cssStr = `body{background:red;}
 *      .class { color:red; }`;
 *   element.addStyle(cssStr);
 *
 * ```
 *
 * @param styleContent - 样式内容
 * @returns 创建的style节点
 */
export default function addStyle(styleContent: string = "") {
  const css = styleContent.replace(blankReg, " ").trim();
  if (!css) return;
  const node = create("style");
  node.textContent = css;
  append(document.head, node);
  return node;
}
