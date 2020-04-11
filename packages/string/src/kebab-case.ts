/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 字符转为短横线命名
 *
 * 新增于v0.0.15
 *
 * 脚本举例
 * ```
 *   import { kebabCase } from '@tomato-js/string'
 *   kebabCase('fooBar'); // foo-bar
 *   kebabCase('foo.bar'); // foo-bar
 *   kebabCase('FooBar'); // foo-bar
 *   kebabCase('--foo  bar__'); // foo-bar
 * ```
 *
 * @param number - 需要转换的阿拉伯数字
 * @returns 转换后的中文字符串
 */
export function kebabCase(input: string) {
  input = input
    //首先去除前后干扰字符和空字符串
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    //给所有除ASCII码以为字符用$占位
    .replace(/[^A-Za-z0-9]+/g, "$")
    //给已有的所有大写前增加$占位
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
    .toLowerCase()
    //将占位的$换成-
    .replace(/\$/g, "-");

  return input;
}
