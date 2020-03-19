/**
 * @packageDocumentation
 * @module @tomato-js/object
 */
import { ObjectType } from "@tomato-js/shared";

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 获取对象深层次内容
 *
 * 脚本举例
 * ```
 *   import { deepGet } from '@tomato-js/object'
 *   const obj = {a:{b:{c:'d'}},aa:'bb',e:'f'}
 *   const c = deepGet('a.b.c',obj);//'d'
 * ```
 *
 * @param path - 对象寻找路径如a.b.c
 * @param object - 需要解析的对象
 * @returns 找到的内容
 */
export function deepGet(path: string, object: ObjectType<any>): any {
  const index = path.indexOf(".");
  const k = path.slice(0, index);
  const rest = path.slice(index + 1);
  const firstObj = object[k];
  if (index === -1) {
    if (hasOwnProperty.call(object, path)) {
      return object[path];
    }
  } else {
    return deepGet(rest, firstObj);
  }
}
