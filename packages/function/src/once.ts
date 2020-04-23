/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
/**
 * 控制函数执行一次
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { once } from '@tomato-js/function'
 *   const isTrue = ()=>conosle.log('true');
 *   const onceExec = once(isTrue);
 *   onceExec()//true
 *   onceExec()
 * ```
 *
 * @param func - 只需执行一次的函数
 * @returns 新函数
 */
export function once<T>(func: () => T) {
  let called = false;
  let ret: T;
  return () => {
    if (!called) {
      ret = func();
      called = true;
    }
    return ret;
  };
}
