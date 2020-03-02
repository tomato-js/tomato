/**
 * @packageDocumentation
 * @module @tomato-js/path
 */
import parse, { getSearch } from "./parse";
import { substringToChar } from "@tomato-js/shared";
import stringify from "./stringify";
/**
 * 将form和to的queryString进行merge合并到to
 *
 * 脚本举例
 * ```
 *   import { merge } from '@tomato-js/path';
 *   merge("https://tomato-js.github.io?a=b&c=d", "https://www.baidu.com?a=123&e=f");
 *   //https://www.baidu.com?a=123&c=d&e=f
 * ```
 *
 * @param from - 解析的url
 * @param to - 待合并的url
 * @returns 合并后的url
 */
export default function merge(from: string, to: string) {
  const fromSearch = getSearch(from);
  const toSearch = getSearch(to);
  const toOrigin = substringToChar(to, "?") || to;
  const fromQueryObj = parse(fromSearch);
  const toQueryObj = parse(toSearch);
  const finalQueryObj = Object.assign({}, fromQueryObj, toQueryObj);
  const finalSearch = stringify(finalQueryObj);
  return finalSearch ? `${toOrigin}?${finalSearch}` : toOrigin;
}
