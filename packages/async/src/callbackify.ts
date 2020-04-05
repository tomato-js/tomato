/**
 * @packageDocumentation
 * @module @tomato-js/async
 */
/**
 * promise函数回调化
 *
 * 新增于v0.0.14
 *
 * 脚本举例
 * ```
 *   import { callbackify } from '@tomato-js/async'
 *   const fixture = () => {
 *     return new Promise((resolve, reject) => {
 *       resolve("brizer");
 *     });
 *   };
 *   callbackify(fixture)((err,value)=>value);//brizer
 * ```
 *
 * @param fn - promise函数
 * @returns callback风格函数
 */
export function callbackify(fn: Function) {
  return function(this: any, ...args: any) {
    const shadowArgs = [...args];
    const cb = shadowArgs.pop();
    fn.apply(this, shadowArgs).then(
      (val: any) => cb.call(this, null, val),
      (err: any) => cb.call(this, err)
    );
  };
}
