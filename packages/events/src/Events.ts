/**
 * @packageDocumentation
 * @module @tomato-js/events
 */
import { FunctionType, isFunction, isNil, map } from "@tomato-js/shared";

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
  /**
   * 注册事件
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.on('foo', foo);
   *   e.on('bar', bar);
   *   e.on('bar', baz);
   * ```
   *
   * @param event - 事件名称
   * @param fn - 事件回调函数
   * @returns 无
   */
  public on(event: string, fn: FunctionType, context: unknown = this) {
    return this.addEventListener(event, fn, context, false);
  }
  /**
   * 注册事件，只响应一次
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.once('foo', foo);
   *   e.once('bar', bar);
   *   e.once('bar', baz);
   * ```
   *
   * @param event - 事件名称
   * @param fn - 事件回调函数
   * @returns 无
   */
  public once(event: string, fn: FunctionType, context: unknown = this) {
    return this.addEventListener(event, fn, context, true);
  }
  private addEventListener(event: string, fn: FunctionType, context: unknown, once: boolean) {
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
  private removeListener(event: string, fn?: FunctionType) {
    if (!this.events.has(event)) return false;
    const alreadyListeners = this.events.get(event) || [];
    let newListeners = [];
    if (isNil(fn)) {
      this.events.delete(event);
      this.eventsCount = this.eventsCount - alreadyListeners.length;
    } else {
      newListeners = alreadyListeners.filter((listener: Listener) => {
        return listener.fn !== fn;
      });
      if (newListeners.length === 0) {
        this.events.delete(event);
        this.eventsCount = this.eventsCount - alreadyListeners.length;
      } else {
        this.events.set(event, newListeners);
        this.eventsCount = this.eventsCount - (alreadyListeners.length - newListeners.length);
      }
    }

    return true;
  }
  /**
   * 触发事件
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.on('foo', foo);
   *   e.on('bar', bar);
   *   e.on('bar', baz);
   *   e.emit('bar');
   * ```
   *
   * @param event - 事件名称
   * @param args - 透传剩余参数
   * @returns 无
   */
  public emit(event: string, ...args: unknown[]) {
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
  /**
   * 获取事件函数列表
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.on('foo', foo);
   *   e.on('bar', bar);
   *   e.on('bar', baz);
   *   e.listeners('bar')
   *   //[bar,baz]
   * ```
   *
   * @param event - 事件名称
   * @returns 执行函数列表
   */
  public listeners(event: string) {
    const listeners = this.events.get(event) || [];
    return map(listeners, (index: number, listener: Listener) => listener.fn);
  }
  /**
   * 清除事件
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.on('foo', foo);
   *   e.on('bar', bar);
   *   e.on('bar', baz);
   *   e.clear('foo');//清除一个key上所有事件回调
   *   e.clear('bar',bar);//清除一个key上指定事件回调
   *   e.clear();//清除所有key所有事件回调
   * ```
   *
   * @param event - 事件名称
   * @param fn - 事件回调函数
   * @returns 无
   */
  public clear(event?: string, fn?: FunctionType) {
    if (event) {
      this.removeListener(event, fn);
      return true;
    }
    this.clearAll();
    return true;
  }
  /**
   * 清除所有事件
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.on('foo', foo);
   *   e.on('bar', bar);
   *   e.on('bar', baz);
   *   e.clearAll();//清除所有key所有事件回调
   * ```
   *
   * @param event - 事件名称
   * @param fn - 事件回调函数
   * @returns 无
   */
  public clearAll() {
    this.events.clear();
  }
  /**
   * 获取事件回调总数
   *
   * 新增于v0.0.18
   *
   * 脚本举例
   * ```
   *   import { Events } from '@tomato-js/events'
   *   const e = new Events();
   *   function foo() {}
   *   function bar() {}
   *   function baz() {}
   *   e.on('foo', foo);
   *   e.on('bar', bar);
   *   e.on('bar', baz);
   *   e.size()
   *   //3
   * ```
   *
   * @returns 事件回调总数
   */
  public size() {
    return this.eventsCount;
  }
}
