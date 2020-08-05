/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */

export type HTMLSelector = string | HTMLElement;

export type HTMLElementKey = keyof HTMLElementTagNameMap;

export type Eachable<T> = T[] | ObjectType<T>;

export type FunctionType<T = any, U = any> = (...args: T[]) => U;

export type Falsy = false | "" | 0 | null | undefined;

export type NonUndefined<A> = A extends undefined ? never : A;

export type Methods = "get" | "post" | "put" | "delete" | "head" | "options" | "patch";
/**
 * 获取类型中value为函数的key
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { FunctionKeys } from "@tomato-js/shared"
 *  type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};
 *  type Keys = FunctionKeys<MixedProps>;
 *  //"setName | someFn"
 * ```
 */
export type FunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

/**
 * 获取类型中value不为函数的key
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { NonFunctionKeys } from "@tomato-js/shared"
 *  type MixedProps = {name: string; setName: (name: string) => void; someKeys?: string; someFn?: (...args: any) => any;};
 *  type Keys = NonFunctionKeys<MixedProps>;
 *  //"name"
 * ```
 */
export type NonFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? never : K;
}[keyof T];

/**
 * 获取必填项的key
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { RequiredKeys } from "@tomato-js/shared"
 *  type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };
 *  type Keys = RequiredKeys<Props>;
 *  //"req" | "reqUndef"
 * ```
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * 获取可选项的key
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { OptionalKeys } from "@tomato-js/shared"
 *  type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };
 *  type Keys = OptionalKeys<Props>;
 *  //"opt" | "optUndef"
 * ```
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * 构建可选的新类型
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { Optional } from "@tomato-js/shared"
 *  type Props = { req: number; reqUndef: number | undefined; opt?: string; optUndef?: number | undefined; };
 *  type OptionalType = Optional<Props>;
 *  //{ req?: number; reqUndef?: number | undefined; opt?: string; optUndef?: number | undefined; };
 *  type OptionalType2 = Optional<Props,'req'|'reqUndef'>;
 *  //{ req?: number; reqUndef?: number | undefined;};
 * ```
 */
export type Optional<T extends object, K extends keyof T = keyof T> = Partial<Pick<T, K>>;

/**
 * 两个类型取交集
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { Intersection } from "@tomato-js/shared"
 *  type Props = { name: string; age: number; visible: boolean };
 *  type DefaultProps = { age: number };
 *  type newProps = Intersection<Props, DefaultProps>;
 *  //{ age: number };
 * ```
 */
export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;
/**
 * 两个类型取Diff
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { Diff } from "@tomato-js/shared"
 *  type Props = { name: string; age: number; visible: boolean };
 *  type DefaultProps = { age: number };
 *  type newProps = Diff<Props, DefaultProps>;
 *  //{ name: string; visible: boolean };
 * ```
 */
export type Diff<T extends object, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * 取出类型的keys
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { $Keys } from "@tomato-js/shared"
 *  type Props = { name: string; age: number; visible: boolean };
 *  type newProps = $Keys<Props>;
 *  //'name'|'age'|'visible'
 * ```
 */
export type $Keys<T extends object> = keyof T;

/**
 * 取出类型的values
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 *
 * ```
 *  import { $Values } from "@tomato-js/shared"
 *  type Props = { name: string; age: number; visible: boolean };
 *  type newProps = $Values<Props>;
 *  //string|number|boolean
 * ```
 */
export type $Values<T extends object> = T[keyof T];

export interface ObjectType<T> {
  [key: string]: T;
}
