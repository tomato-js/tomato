/**
 * @packageDocumentation
 * @module @tomato-js/element
 */
import { ObjectType, HTMLSelector } from "@tomato-js/shared";
import { HTMLElementKey } from "@tomato-js/shared";
import get from "./get";
import { append } from "./insert";
/**
 * 创建dom节点
 *
 *
 * 脚本举例
 * ```javascript
 *   import { create } from '@tomato-js/element'
 *   // 创建一个div节点，挂到body上
 *   create("div");
 *   // 创建一个p节点，其id为id，挂到id是abc的节点上
 *   create("p","id","abc")
 * ```
 *
 * @param tagName - 创建节点的标签名称
 * @param idName - 创建节点的id
 * @param parent - 挂载的父节点，默认为document.body
 * @returns 创建的dom节点
 */
export default function create(tagName: HTMLElementKey, idName?: string, parent?: HTMLSelector) {
  const element = document.createElement(tagName);
  const TagMap: ObjectType<any> = {
    a: { href: "#", hideFocus: !0 },
    style: { type: "text/css" },
    link: { type: "text/css", rel: "stylesheet" },
    iframe: { frameBorder: 0 },
    script: { defer: !0, type: "text/javascript" }
  };
  const config = TagMap[tagName.toLowerCase()];
  const createdElement: HTMLElement = Object.assign(element, config);
  if (idName) createdElement.id = idName;
  if (!parent) {
    return createdElement;
  }
  const parentNode = get(parent);
  if (parentNode) {
    append(parentNode, createdElement);
  } else {
    append(document.body, createdElement);
  }
  return createdElement;
}
