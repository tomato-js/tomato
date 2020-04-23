/**
 * @packageDocumentation
 * @module @tomato-js/queue
 */
import { Chain } from "./Chain";
import { add, subtract, multiply, divide } from "@tomato-js/math";

/**
 * 链式调用
 *
 * 新增于v0.0.17
 *
 * 支持链式调用方法：add,subtract,multiply,divide
 *
 * 脚本举例
 * ```
 *   import { chainer } from '@tomato-js/queue'
 *   const result = chainer(3)
 *     .add(4)
 *     .subtract(5)
 *     .multiply(10)
 *     .divide(4)
 *     .add(10)
 *     .subtract(5)
 *     .done();//10
 * ```
 *
 * @param val - 入口参数
 * @returns 最后返回值
 */
export function chainer(val: unknown) {
  const task = new Chain(val);
  task.register("add", add);
  task.register("subtract", subtract);
  task.register("multiply", multiply);
  task.register("divide", divide);
  return task.start();
}
