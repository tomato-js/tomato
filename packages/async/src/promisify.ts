/**
 * @packageDocumentation
 * @module @tomato-js/async
 */
/**
 * 回调函数promise化
 *
 * 新增于v0.0.14
 *
 * 脚本举例
 * ```
 *   import { promisify } from '@tomato-js/async'
 *   promisify(fs.readFile)('package.json').then();
 * ```
 *
 * @param fn - 回调style的函数
 * @returns promise风格函数
 */
export function promisify(fn: Function) {
  return function(this: any, ...args: any) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err: Error, ...values: any) => {
        if (err) {
          return reject(err);
        } else {
          resolve(values.length > 1 ? values : values[0]);
        }
      });
    });
  };
}
