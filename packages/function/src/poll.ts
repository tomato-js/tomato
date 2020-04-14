/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
type pollOptions<fnValueType> = {
  fn: (...args: unknown[]) => fnValueType | PromiseLike<fnValueType>;
  validate: (value: fnValueType) => boolean;
  interval?: number;
  maxAttempts?: number;
};
/**
 * 轮询方法，支持同步和异步
 *
 * 新增于v0.0.16
 *
 * 脚本举例
 * ```
 *   import { poll } from '@tomato-js/function'
 *   const { poller, cancel } = poll({
 *     fn: getUser,
 *     validate: v => v.result === true,
 *     interval: 1000,
 *     maxAttempts: 20
 *   });
 *   //手动取消轮询
 *   setTimeout(() => cancel(), 7000);
 *   //满足validate后的fn后续回调
 *   poller.then(data => {
 *     console.log('poller done')
 *     console.log(data);
 *   });
 * ```
 *
 * @param fn - 轮询函数
 * @param validate - 验证函数，true则返回resolve
 * @param interval - 间隔时间，默认1000毫秒
 * @param maxAttempts - 最大尝试次数，默认10次
 * @returns 轮询对象，提供轮询Promise和cancel取消轮询方法
 */
export function poll<fnValueType>({ fn, validate, interval = 1000, maxAttempts = 10 }: pollOptions<fnValueType>) {
  let attempts = 0;
  let canceled = false;
  const cancel = () => {
    canceled = true;
  };

  const executePoll = async (resolve: (...args: unknown[]) => unknown, reject: (...args: unknown[]) => unknown) => {
    if (canceled) {
      return;
    }
    const result = await fn();
    attempts++;

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      return;
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return { poller: new Promise(executePoll), cancel };
}
