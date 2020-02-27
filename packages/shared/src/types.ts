/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */
export type HTMLElementKey = keyof HTMLElementTagNameMap;

export interface ObjectType<T> {
  [key: string]: T;
}
