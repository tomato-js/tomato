/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
/**
 * 等待执行，等待
 *
 * 新增于v0.0.18
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
 *
 * @param boolFn - 判断函数
 * @param callback - 等待执行函数
 * @param wait - 判断执行间隔时间
 * @returns
 */
export function waitUntil(boolFn: (...args: any[]) => boolean, callback: Function, wait: number = 500) {
  let timeoutId = setTimeout(function() {
    clearTimeout(timeoutId);
    boolFn() ? callback() : waitUntil(boolFn, callback, wait);
  }, wait);
}
