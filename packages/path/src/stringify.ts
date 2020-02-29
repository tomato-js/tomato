/**
 * @packageDocumentation
 * @module @tomato-js/path
 */

import { ObjectType, forEach } from "@tomato-js/shared";

interface StringifyOptions {
  encode: boolean;
}
/**
 * 解析对象为query字符串
 *
 * 脚本举例
 * ```
 *   import { stringify } from '@tomato-js/path';
 *   const queryStr = stringify({
 *     queryKey: "this is queryA"
 *   });
 *   //queryKey=this%20is%20queryA
 * ```
 *
 * @param queryObj - 待解析的对象
 * @param options - 其他解析参数
 * @param options.encode - 是否编码和解码，默认true
 * @returns 解析完成的query字符串
 */
export default function stringify(
  queryObj: ObjectType<string | number>,
  options: StringifyOptions = {
    encode: true
  }
) {
  let queryString: string = "";
  forEach(queryObj, (queryKey, queryValue) => {
    if (options.encode) {
      queryValue = encodeURIComponent(queryValue);
      queryKey = encodeURIComponent(queryKey);
    }
    queryString = queryString ? `${queryString}&${queryKey}=${queryValue}` : `${queryKey}=${queryValue}`;
  });
  return queryString;
}
