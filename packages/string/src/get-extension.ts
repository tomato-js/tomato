/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
/**
 * 获取文件后缀名
 *
 * 新增于v0.0.24
 *
 * 脚本举例
 * ```
 *   import { getExtension } from '@tomato-js/string'
 *   getExtension('myimg/1.png');
 *   //png
 * ```
 */
export function getExtension(fileName: string) {
  const extension = fileName.split(".").pop();
  if (!extension) return;
  if (extension.includes("?")) {
    return extension.split("?").shift();
  }
  return extension;
}
