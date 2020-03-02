/**
 * @packageDocumentation
 * @module @tomato-js/path
 */
import { isURLSearchParamsExist } from "@tomato-js/env";
import { isEmptyObject, substringFromChar } from "@tomato-js/shared";

interface ParseOptions {
  encode: boolean;
}

function getQueryString(str: string = window.location.search) {
  return str.includes("?") ? str.substring(1) : str;
}
/**
 * 获取url中的search字符串
 *
 * 脚本举例
 * ```
 *   import { getSearch } from '@tomato-js/path';
 *   const search = parse()//默认使用window.location.href;
 *   const search2 = parse("https://www.baidu.com?a=123&e=f")//?a=123&e=f;
 * ```
 *
 * @param url - 待解析的url
 * @returns search字符串
 */
export function getSearch(url: string = window.location.href) {
  return substringFromChar(url, "?", { itself: true });
}

function parseByURLSearchParams(queryString: string, encode: boolean = true) {
  const urlSearchParams: any = new URLSearchParams(queryString);
  let parsedObj: { [key: string]: string } = {};
  parsedObj = parseBySplit(urlSearchParams.toString(), encode);
  return parsedObj;
}

function parseBySplit(queryString: string, encode: boolean = true) {
  const parsedObj: { [key: string]: string } = {};
  const queryArr = queryString.split("&");
  queryArr.forEach(query => {
    if (query.includes("=")) {
      var tmp = query.split("=");
      if (encode) {
        parsedObj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
      } else {
        parsedObj[tmp[0]] = tmp[1];
      }
    }
  });
  return parsedObj;
}
/**
 * 解析search字符串
 *
 * 脚本举例
 * ```
 *   import { parse } from '@tomato-js/path';
 *   const queryObj = parse()//默认使用window.location.search;
 *   const queryObj2 = parse('?a=123&b=456')//{a:'123',b:'456'};
 *   const queryObj3 = parse('a=123&b=456')//{a:'123',b:'456'};
 * ```
 *
 * @param str - 待解析的字符串
 * @param options - 其他解析参数
 * @param options.encode - 是否编码和解码，默认true
 * @returns 解析完成的对象
 */
export default function parse(
  str: string,
  options: ParseOptions = {
    encode: true
  }
) {
  const queryString = getQueryString(str);
  let parsedObj: { [key: string]: string };
  const { encode } = options;
  if (isURLSearchParamsExist()) {
    parsedObj = parseByURLSearchParams(queryString, encode);
  } else {
    parsedObj = parseBySplit(queryString, encode);
  }
  if (isEmptyObject(parsedObj)) return null;
  return parsedObj;
}
