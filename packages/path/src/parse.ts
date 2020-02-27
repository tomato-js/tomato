/**
 * @packageDocumentation
 * @module @tomato-js/path
 */
import { isURLSearchParamsExist } from "@tomato-js/env";
import { isEmptyObject } from "@tomato-js/shared";
function getQueryString(str: string = window.location.search) {
  return str.includes("?") ? str.substring(1) : str;
}

function parseByURLSearchParams(queryString: string) {
  const urlSearchParams: any = new URLSearchParams(queryString);
  let parsedObj: { [key: string]: string } = {};
  parsedObj = parseBySplit(urlSearchParams.toString());
  return parsedObj;
}

function parseBySplit(queryString: string) {
  const parsedObj: { [key: string]: string } = {};
  const queryArr = queryString.split("&");
  queryArr.forEach(query => {
    if (query.includes("=")) {
      var tmp = query.split("=");
      parsedObj[tmp[0]] = tmp[1];
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
 * @returns 解析完成的对象
 */
export default function parse(str: string) {
  const queryString = getQueryString(str);
  let parsedObj: { [key: string]: string };
  if (isURLSearchParamsExist()) {
    parsedObj = parseByURLSearchParams(queryString);
  } else {
    parsedObj = parseBySplit(queryString);
  }
  if (isEmptyObject(parsedObj)) return null;
  return parsedObj;
}
