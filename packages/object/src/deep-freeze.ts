/**
 * @packageDocumentation
 * @module @tomato-js/object
 */
import { forEach, isObject } from "@tomato-js/shared";

/**
 * 函数描述
 *
 * 新增于v0.0.19
 *
 * 脚本举例
 * ```
 *   import { deepFreeze } from '@tomato-js/object'
 *   let obj2 = {
 *     internal: {
 *       a: null
 *     }
 *   };
 *   deepFreeze(obj2);
 *   obj2.internal.a = 'anotherValue'; // fails silently in non-strict mode
 *   obj2.internal.a; // null
 * ```
 */
export function deepFreeze<T extends object>(object: T) {
  forEach(object, (key, value) => {
    if (value && isObject(value)) {
      deepFreeze(value);
    }
  });
  return Object.freeze(object);
}
