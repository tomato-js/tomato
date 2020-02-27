export type HTMLElementKey = keyof HTMLElementTagNameMap;

export interface ObjectType<T> {
  [key: string]: T;
}
