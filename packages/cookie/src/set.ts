/**
 * @packageDocumentation
 * @module @tomato-js/cookie
 */
interface SetOptions {
  /**
   * cookie过期时间，支持毫秒数、时间点和字符串
   */
  end?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
}
/**
 * 设置cookie中指定key和value
 *
 * 脚本举例
 * ```
 *   import { set } from '@tomato-js/cookie'
 *   set('name','brizer');
 * ```
 *
 * @param name - 需要设置的key
 * @param value - 需要设置的值
 * @param options - 其他参数
 * @param options.end - cookie过期时间，支持毫秒数、时间点和字符串
 * @param options.path - 例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径
 * @param options.domain - 例如 'example.com'， '.example.com' (包括所有子域名)
 * @param options.secure - cookie只会被https传输
 * @returns 是否设置成功
 */
export function set(name: string, value: string, options: SetOptions = {}) {
  const { end, domain, path, secure } = options;
  if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
    return false;
  }
  let sExpires = "";
  if (end) {
    switch (end.constructor) {
      case Number:
        sExpires = end === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + end;
        break;
      case String:
        sExpires = "; expires=" + end;
        break;
      case Date:
        sExpires = "; expires=" + (end as Date).toUTCString();
        break;
    }
  }
  document.cookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    sExpires +
    (domain ? "; domain=" + domain : "") +
    (path ? "; path=" + path : "") +
    (secure ? "; secure" : "");
  return true;
}
