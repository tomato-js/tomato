/**
 * @packageDocumentation
 * @module @tomato-js/env
 */
import { isType } from "@tomato-js/shared";
/**
 * 判断是否在Node环境
 *
 *
 * 脚本举例
 * ```javascript
 *   import { isNode } from '@tomato-js/env'
 *   isNode();//false
 * ```
 *
 * @returns 是否存在global上
 */
export const isNode = () => typeof process !== "undefined" && isType(process, "process");
