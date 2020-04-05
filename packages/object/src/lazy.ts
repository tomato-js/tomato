import { ObjectType } from "@tomato-js/shared";
/**
 * @packageDocumentation
 * @module @tomato-js/object
 */

/**
 * 给对象增加懒依赖属性
 *
 * 新增于v0.0.14
 *
 * 脚本举例
 * ```
 *    const obj = {};
 *    object.lazy(obj, "x", function() {
 *      return 2;
 *    });
 *    obj.x//2
 * ```
 *
 * @param value - 被拷贝对象
 * @returns 拷贝对象
 */
export function lazy(object: ObjectType<any>, prop: string, valueResolver: Function) {
  let _uninitialized = true;
  let _value: any;
  Object.defineProperty(object, prop, {
    get: function get() {
      //对第一次懒依赖进行值处理
      if (_uninitialized) {
        _value = valueResolver();
        _uninitialized = false;
      }
      return _value;
    },
    set: function set(value) {
      _value = value;
      _uninitialized = false;
    },
    configurable: true,
    enumerable: true
  });
}
