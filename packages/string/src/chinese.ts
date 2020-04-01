/**
 * @packageDocumentation
 * @module @tomato-js/string
 */
const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const units = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "兆"];
const minus = "负";
const point = "点";

/**
 * 阿拉伯数字转中文字符串
 *
 * 脚本举例
 * ```
 *   import { number2Chinese } from '@tomato-js/string'
 *   number2Chinese(110025.06); // 十一万零二十五点零六
 * ```
 *
 * @param number - 需要转换的阿拉伯数字
 * @returns 转换后的中文字符串
 */
export function number2Chinese(number: number) {
  return int2Chinese(number) + float2Chinese(number);
}
/**
 * @ignore
 */
export function int2Chinese(number: number) {
  const zero = digits[0];
  let str = "";
  let n = Math.floor(Math.abs(number));
  //整数部分小于1
  if (n < 1) {
    if (number < 0) return `${minus}${zero}`;
    return digits[0];
  }
  const shadowUnits = [...units];
  //从末尾开始一一处理数字转中文
  while (n > 0) {
    let u = shadowUnits.shift();
    let d = n % 10;
    str = `${digits[d]}${u}${str}`;
    n = Math.floor(n / 10);
  }
  //针对各边界值进行处理
  const small = units[1] + units[2] + units[3];
  const big = units[4] + units[8] + units[12];
  //处理零十零百零千
  str = str.replace(new RegExp("(" + zero + ")[" + small + "]", "g"), "$1");
  //处理 亿零万 这种
  str = str.replace(new RegExp("([" + big + "])[^" + small + "]+([" + big + "])", "g"), "$1" + zero);
  //处理 十零万 这种
  str = str.replace(new RegExp("([" + small + "])" + zero + "+([" + big + "])", "g"), "$1$2" + zero);
  //处理重复的零，零零
  str = str.replace(new RegExp("(" + digits[0] + ")+", "g"), "$1");
  //处理一十为十
  str = str.replace(new RegExp("^" + digits[1] + units[1]), units[1]);
  //处理已零结尾的情况
  str = str.replace(new RegExp(zero + "+$"), "");

  if (number < 0) {
    return `${minus}${str}`;
  }
  return str;
}
/**
 * @ignore
 */
export function float2Chinese(number: number) {
  let str = "";
  if (number % 1 == 0) return "";
  //将小数部分提取为整数
  let f = parseInt(
    Math.abs(number)
      .toString()
      .replace(/\d+./i, "1")
  );
  //再从末尾逐个处理即可
  while (f > 0) {
    let d = f % 10;
    str = `${digits[d]}${str}`;
    f = Math.floor(f / 10);
  }

  return point + str.replace(new RegExp("^" + digits[1], "i"), "");
}
