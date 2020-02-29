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
