/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 字符转为驼峰命名
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 * ```
 *   import { camelCase } from '@tomato-js/string'
 *   camelCase('foo-bar'); // fooBar
 *   camelCase('foo.bar'); // fooBar
 *   camelCase('FooBar'); // fooBar
 *   camelCase('--foo  bar__'); // fooBar
 * ```
 *
 * @param number - 需要转换的阿拉伯数字
 * @returns 转换后的中文字符串
 */
export function camelCase(input: string) {
  input = input
    //首先去除前后干扰字符和空字符串
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    //给所有除ASCII码以为字符用$占位
    .replace(/[^A-Za-z0-9]+/g, "$")
    //给已有的所有大写前增加$占位
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    //将占位的后一字符大写
    .replace(/(\$)(\w)/g, (m, a, b) => b.toUpperCase());

  return input;
}
