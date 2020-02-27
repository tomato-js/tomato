/**
 * @packageDocumentation
 * @module @tomato-js/shared
 */

export type HTMLSelector = string | HTMLElement;

export type HTMLElementKey = keyof HTMLElementTagNameMap;

export interface ObjectType<T> {
  [key: string]: T;
}
