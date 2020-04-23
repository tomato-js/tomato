/**
 * @packageDocumentation
 * @module @tomato-js/function
 */
/**
 * compose增强函数，相当于f(g(x))，从右到左
 *
 * 新增于v0.0.12
 *
 * 脚本举例
 * ```
 *   import { compose } from '@tomato-js/function'
 *   const step1 = (x: number) => (x ? 1 : 2);
 *   const step2 = (x: number) => (x === 1 ? 3 : 4);
 *   const step3 = (x: number) => (x === 3 ? 5 : 6);
 *   const getResult = compose(step3, step2, step1);
 *   const result = getResult(1);//5
 * ```
 *
 * @param args - 多个函数
 * @returns 新函数
 */
export function compose(...args: any[]) {
  return function(...args2: any[]) {
    // 需要组合的函数列表
    const [...argsCopy] = args;
    // 递归函数
    function funced(...func: any): any {
      //直到执行列表为空，返回最后的函数结果
      if (argsCopy.length === 0) return func[0];
      //推出最后面一个函数并递归执行
      func = argsCopy.pop()(...func);
      return funced(func);
    }
    return funced(...args2);
  };
}
