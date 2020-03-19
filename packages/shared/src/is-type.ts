/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
const toString = Object.prototype.toString;

export function isType(value: any, type: string): boolean {
  return toString.call(value) === "[object " + type + "]";
}

export function isString(str: any) {
  return isType(str, "String");
}

export function isNumber(str: any) {
  return isType(str, "Number");
}

export function isArray(value: any) {
  return Array.isArray ? Array.isArray(value) : isType(value, "Array");
}

export function isObject(value: any) {
  const type = typeof value;
  return (value !== null && type === "object") || type === "function";
}

export function isFunction(value: any) {
  return isType(value, "Function");
}

/**
 * 是否是Null
 *
 * 脚本举例
 * ```
 *   import { isNull } from '@tomato-js/shared'
 *   const node = isNull(null);//true
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为null
 */
export function isNull(val: any) {
  return val === null;
}

/**
 * 是否是undefined
 *
 * 脚本举例
 * ```
 *   import { isUndefined } from '@tomato-js/shared'
 *   const node = isNull(undefined);//true
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为undefined
 */
export function isUndefined(val: any) {
  return val === undefined;
}

/**
 * 是否为 null 或 undefined 类型
 *
 * 脚本举例
 * ```
 *   import { isNil } from '@tomato-js/shared'
 *   const node = isNil(undefined);//true
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为undefined或null
 */
export function isNil(val: any) {
  return isUndefined(val) || isNull(val);
}
/**
 * 是否为 数字或字符串数字类型
 *
 * 脚本举例
 * ```
 *   import { isNumberLike } from '@tomato-js/shared'
 *   isNumberLike(‘3’);//true
 *   isNumberLike(3);//true
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为数字或字符串数字类型
 */
export function isNumberLike(val: any) {
  return !isNaN(parseFloat(val)) && isFinite(val) && Number(val) == val;
}
