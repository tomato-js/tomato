/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
/**
 * 函数描述
 *
 * 新增于v
 *
 * 脚本举例
 * ```
 *   import { waitUntil } from '@tomato-js/function'
 *   let bool = false;
 *   const boolFn = () => bool;
 *   const callback = () => console.log('waitUnitil')
 *   const changeBool = () => {
 *     setTimeout(() => {
 *       bool = true;
 *   },2000);
 *   }
 *   waitUntil(boolFn, callback, 1000);
 *   changeBool();
 *
 * ```
 */
export function waitUntil(boolFn: (...args: any[]) => boolean, callback: Function, wait: number = 500) {
  setTimeout(function() {
    boolFn() ? callback() : waitUntil(boolFn, callback, wait);
  }, wait);
}
