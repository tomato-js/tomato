/**
 * @packageDocumentation
 * @module @tomato-js/object
 */
import { ObjectType, isObject, isArray } from "@tomato-js/shared";
/**
 * 对对象进行深层merge
 *
 * 新增于v0.0.24
 *
 * 脚本举例
 * ```
 *   import { deepMerge } from '@tomato-js/object'
 *   deepMerge(
 *     a: { b:{ c: 'd' } },
 *     a: { b:{ e: 'f' } },
 *     a: { g: 'h' }
 *   );
 * //{
 * //  a: {
 * //    b: {
 * //      c: 'd',
 * //      e: 'f'
 * //    }
 * //    g: 'h'
 * //  }
 * //}
 *
 * ```
 */

export function deepMerge(...objects: ObjectType<any>[]) {
  return objects.reduce((prev: ObjectType<any>, obj: ObjectType<any>) => {
    for (const [key, oVal] of Object.entries(obj)) {
      const pVal = prev[key];
      if (isArray(pVal) && isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    }
    return prev;
  }, {});
}
