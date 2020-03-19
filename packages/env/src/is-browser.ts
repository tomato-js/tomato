/**
 * @packageDocumentation
 * @module @tomato-js/env
 */
/**
 * 判断是否在浏览器环境
 *
 *
 * 脚本举例
 * ```javascript
 *   import { isBrowser } from '@tomato-js/env'
 *   isBrowser();//true
 * ```
 *
 * @returns 是否存在window上
 */
export const isBrowser = () => ![typeof window, typeof document].includes("undefined");
