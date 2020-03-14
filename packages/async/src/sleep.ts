/**
 * @packageDocumentation
 * @module @tomato-js/async
 */

/**
 * 延迟
 *
 * 脚本举例
 * ```
 *   import { sleep } from '@tomato-js/async'
 *   async function sleepyWork() {
 *     console.log("I'm going to sleep for 1 second.");
 *     await sleep(1000);
 *     console.log('I woke up after 1 second.');
 *   }
 * ```
 *
 * @param ms - 延迟毫秒数
 * @returns 延迟Promise
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
