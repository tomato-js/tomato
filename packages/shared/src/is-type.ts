/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
import { Falsy } from "./types";

const toString = Object.prototype.toString;

export function isType<T>(value: unknown, type: string): value is T {
  return toString.call(value) === "[object " + type + "]";
}

export function isString(str: unknown): str is string {
  return isType(str, "String");
}

export function isNumber(str: unknown): str is number {
  return isType(str, "Number");
}

export function isArray(value: unknown) {
  return Array.isArray ? Array.isArray(value) : isType(value, "Array");
}

export function isObject(value: unknown) {
  const type = typeof value;
  return (value !== null && type === "object") || type === "function";
}

export function isFunction(value: unknown): value is Function {
  return isType<"Function">(value, "Function") || typeof value === "function";
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
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * 是否是undefined
 *
 * 脚本举例
 * ```
 *   import { isUndefined } from '@tomato-js/shared'
 *   const node = isUndefined(undefined);//true
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为undefined
 */
export function isUndefined(val: unknown): val is undefined {
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
export function isNil(val: unknown): val is undefined | null {
  return isUndefined(val) || isNull(val);
}

/**
 * 是否已定义
 *
 * 新增于v0.0.18
 *
 * 脚本举例
 * ```
 *   import { isDef } from '@tomato-js/shared'
 *   const node = isDef(undefined);//false
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为已定义的值
 */
export function isDef(val: unknown): val is NonNullable<any> {
  return !isUndefined(val) && !isNull(val);
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
export function isNumberLike(val: unknown) {
  return !isNaN(parseFloat(val as string)) && isFinite(val as number) && Number(val) == val;
}
/**
 * 是否为falsy类型
 *
 * 脚本举例
 * ```
 *   import { isFalsy } from '@tomato-js/shared'
 *   isFalsy(1);//false
 *   isFalsy('');//true
 * ```
 *
 * @param val - 需要判断的值
 * @returns 是否为数字或字符串数字类型
 */
export function isFalsy(val: unknown): val is Falsy {
  return !val;
}
