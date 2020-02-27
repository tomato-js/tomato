/**
 * @packageDocumentation
 * @module @tomato-js/env
 */
/**
 * 判断是否有该全局变量
 *
 *
 * 脚本举例
 * ```javascript
 *   import { isExist } from '@tomato-js/env'
 *   const isGlobalExist = isExist('Cache');//true
 * ```
 *
 * @param apiName - api的名称
 * @returns 是否存在window上
 */
export function isExist(apiName: string) {
  if ((window as any)[apiName] !== undefined) {
    return true;
  } else {
    return false;
  }
}
/**
 * 判断是否有存在URLSearchParams
 *
 * @returns 是否存在window上
 */
export function isURLSearchParamsExist() {
  return isExist("URLSearchParams");
}
