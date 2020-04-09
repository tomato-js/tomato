/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
/**
 * 取反
 *
 * 脚本举例
 * ```
 *   import { not } from '@tomato-js/shared'
 *   not(true)//false;
 *   not(false)//true;
 *   not(0)//true;
 *   not(1)//false;
 * ```
 *
 * @param a - 需要取反的值
 * @returns 取反后的值
 */
export function not(a: any) {
  return !a;
}
