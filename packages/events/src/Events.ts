/**
 * @packageDocumentation
 * @module @tomato-js/events
 */
import { FunctionType, isFunction } from "@tomato-js/shared";

type Listener = {
  fn: FunctionType;
  context?: unknown;
  once: boolean;
};
type Listeners = Listener[];
/**
 * Events事件通信类
 *
 * 新增于v0.0.18
 *
 * 脚本举例
 * ```
 *   import { Events } from '@tomato-js/events';
 *   const e = new Events();
 *   e.on('foo',data=>data);
 *   e.once('foo',data=>data);//只监听一次
 *   e.emit('foo','bar')
 *   e.clear('foo')//清除事件
 * ```
 */
export class Events {
  private events: Map<string, Listeners>;
  private eventsCount: number;
  constructor() {
    this.events = new Map();
    this.eventsCount = 0;
  }
  on(event: string, fn: FunctionType, context: unknown = this) {
    return this.addEventListener(event, fn, context, false);
  }
  once(event: string, fn: FunctionType, context: unknown = this) {
    return this.addEventListener(event, fn, context, true);
  }
  addEventListener(event: string, fn: FunctionType, context: unknown, once: boolean) {
    if (!isFunction(fn)) {
      throw new TypeError("The listener must be a function");
    }
    let listeners = this.events.get(event) || [];
    listeners.push({
      fn,
      context,
      once
    });
    this.eventsCount++;
    this.events.set(event, listeners);
  }
  removeListener(event: string) {
    if (!this.events.has(event)) return false;
    const alreadyListeners = this.events.get(event) || [];
    this.events.delete(event);
    this.eventsCount = this.eventsCount - alreadyListeners.length;
    return true;
  }
  emit(event: string, ...args: unknown[]) {
    if (!this.events.has(event)) return false;
    const listeners = this.events.get(event);
    listeners?.map(listener => {
      if (listener?.fn) {
        if (listener.once) {
          this.removeListener(event);
        }
        listener.fn.call(listener.context, ...args);
      }
    });
  }
  listeners(event: string) {
    return this.events.get(event) || [];
  }
  clear(event?: string) {
    if (event) {
      this.removeListener(event);
      return true;
    }
    this.clearAll();
    return true;
  }
  clearAll() {
    this.events.clear();
  }
  size() {
    return this.eventsCount;
  }
}
