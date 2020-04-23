/**
 * @packageDocumentation
 * @module @tomato-js/queue
 */
import { lazy } from "@tomato-js/object";
import { ObjectType, forEach, isFunction } from "@tomato-js/shared";
/**
 * @ignore
 */
export class Chain {
  value: any;
  isChain: boolean;
  type: string;
  task: ObjectType<Function>;
  [key: string]: any;
  constructor(value: any) {
    this.value = value;
    this.isChain = true;
    this.type = "chain";
    this.task = {};
  }
  initProxy(container: Chain, name: string, resolver: Function) {
    lazy(container, name, function outerResolver(this: any) {
      var fn = resolver.bind(this);
      if (isFunction(fn)) {
        return container.chainify(fn);
      }
      return undefined; // if not a function, ignore
    });
  }
  start() {
    forEach(this.task, (name: string, handler: Function) => {
      this.initProxy(this, name, handler);
    });
    return this;
  }
  done() {
    return this.value;
  }
  register(name: string, resolver: Function) {
    this.task[name] = resolver.bind({});
  }
  valueOf() {
    return this.value;
  }
  toJson() {
    return {
      tomatojs: "Chain",
      value: this.value
    };
  }
  chainify(fn: Function) {
    const value = this.value;
    const tasks = this.task;
    return function(...args: any[]) {
      const newArgs = [value, ...args];
      const chainer = new Chain(fn.apply(fn, newArgs));
      chainer.task = tasks;
      forEach(chainer.task, (name: string, handler: Function) => {
        chainer.initProxy(chainer, name, handler);
      });
      return chainer;
    };
  }
}
