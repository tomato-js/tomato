/**
 * @packageDocumentation
 * @module @tomato-js/cookie
 */
import { has } from "./has";

interface RemoveOptions {
  path: string;
  domain: string;
}
/**
 * 删除cookie中指定key
 *
 * 脚本举例
 * ```
 *   import { remove } from '@tomato-js/cookie'
 *   remove('name');
 * ```
 *
 * @param name - 需要删除的key
 * @param options - 其他参数
 * @param options.path - 例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径
 * @param options.domain - 例如 'example.com'， '.example.com' (包括所有子域名)
 * @returns 是否删除成功
 */
export function remove(
  name: string,
  options: RemoveOptions = {
    path: "/",
    domain: ""
  }
) {
  const { path = "/", domain = "" } = options;
  if (!name || !has(name)) {
    return false;
  }
  document.cookie =
    encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "");
  return true;
}
