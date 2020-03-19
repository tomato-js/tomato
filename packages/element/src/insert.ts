/**
 * @packageDocumentation
 * @module @tomato-js/element
 */

import { ObjectType, HTMLSelector, isString } from "@tomato-js/shared";
import get from "./get";

const directHandler: ObjectType<Function> = {
  top: function(origin: HTMLElement, target: HTMLElement) {
    const firstChild = origin.firstChild;
    origin.insertBefore(target, firstChild);
  },
  bottom: function(origin: HTMLElement, target: HTMLElement) {
    origin.appendChild(target);
  },
  before: function(origin: HTMLElement, target: HTMLElement) {
    const parent = origin.parentNode;
    if (parent) parent.insertBefore(target, origin);
  },
  after: function(origin: HTMLElement, target: HTMLElement) {
    const parent = origin.parentNode;
    if (parent) parent.insertBefore(target, origin.nextSibling);
  }
};
function insert(origin: HTMLSelector, target: HTMLSelector, direct: string = "bottom") {
  const originNode = isString(origin) ? get(origin as string) : origin;
  const targetNode = isString(target) ? get(target as string) : target;
  directHandler[direct](originNode, targetNode);
}

/**
 * 插入节点B到节点A内部的底部
 *
 * 脚本举例
 * ```
 *   import { append } from '@tomato-js/element'
 *   const dom = document.createElement('p');
 *   dom.innerHTML='it is p';
 *   append('abc',dom);
 * ```
 *
 * @param A - 节点A
 * @param B - 节点B
 */

export function append(A: HTMLSelector, B: HTMLSelector) {
  insert(A, B);
}
/**
 * 插入节点B到节点A内部的顶部
 *
 * 脚本举例
 * ```javascript
 *   import { prepend } from '@tomato-js/element'
 *   const dom = document.createElement('p');
 *   dom.innerHTML='it is p';
 *   append('abc',dom);
 * ```
 *
 * @param A - 节点A
 * @param B - 节点B
 */
export function prepend(A: HTMLSelector, B: HTMLSelector) {
  insert(A, B, "top");
}
/**
 * 插入节点B到节点A的上面
 *
 * 脚本举例
 * ```javascript
 *   import { insertBefore } from '@tomato-js/element'
 *   const dom = document.createElement('p');
 *   dom.innerHTML='it is p';
 *   append('abc',dom);
 * ```
 *
 * @param A - 节点A
 * @param B - 节点B
 */
export function insertBefore(A: HTMLSelector, B: HTMLSelector) {
  insert(A, B, "before");
}
/**
 * 插入节点B到节点A的下面
 *
 * 脚本举例
 * ```javascript
 *   import { insertBefore } from '@tomato-js/element'
 *   const dom = document.createElement('p');
 *   dom.innerHTML='it is p';
 *   append('abc',dom);
 * ```
 *
 * @param A - 节点A
 * @param B - 节点B
 */
export function insertAfter(A: HTMLSelector, B: HTMLSelector) {
  insert(A, B, "after");
}
