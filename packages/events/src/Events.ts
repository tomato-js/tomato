import { FunctionType, isFunction } from "@tomato-js/shared";

type Listener = {
  fn: FunctionType;
  context?: unknown;
  once: boolean;
};
export class Events {
  private events: Map<string, Listener>;
  constructor() {
    this.events = new Map();
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
    this.events.set(event, {
      fn,
      context,
      once
    });
  }
  removeListener(event: string) {
    if (!this.events.has(event)) return false;
    this.events.delete(event);
    return true;
  }
  emit(event: string, ...args: unknown[]) {
    if (!this.events.has(event)) return false;
    const listener = this.events.get(event);
    if (listener?.fn) {
      if (listener.once) {
        this.removeListener(event);
      }
      listener.fn.call(listener.context, ...args);
      return true;
    }
    return false;
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
    return this.events.size;
  }
}
