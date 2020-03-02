import * as path from "../src";

describe("path util", () => {
  const nodeNotExist = null;
  describe("parse", () => {
    test("parse() without queryString", () => {
      const parsed = path.parse("");
      expect(parsed).toBe(null);
    });
    test("parse(?a=123&b=456) with queryString", () => {
      const parsed = path.parse("?a=123&b=456");
      expect(parsed).toStrictEqual({
        a: "123",
        b: "456"
      });
    });
    test("parse() some need encode", () => {
      const parsed = path.parse(
        "?queryKey=this%20is%20queryA&url=https%3A%2F%2Ftomato-js.github.io%2Ftomato%2Findex.html&%E4%B8%AD%E6%96%87=%E4%BD%A0%E5%A5%BD"
      );
      expect(parsed).toStrictEqual({
        queryKey: "this+is+queryA",
        url: "https://tomato-js.github.io/tomato/index.html",
        中文: "你好"
      });
    });
    test("parse() some need encode but whit options.encode=false", () => {
      const parsed = path.parse(
        "?queryKey=this%20is%20queryA&url=https%3A%2F%2Ftomato-js.github.io%2Ftomato%2Findex.html&%E4%B8%AD%E6%96%87=%E4%BD%A0%E5%A5%BD",
        {
          encode: false
        }
      );
      expect(parsed).toStrictEqual({
        queryKey: "this+is+queryA",
        "%E4%B8%AD%E6%96%87": "%E4%BD%A0%E5%A5%BD",
        url: "https%3A%2F%2Ftomato-js.github.io%2Ftomato%2Findex.html"
      });
    });
    test("parse(https://www.baidu.com?a=123&b=456) with queryString, but URLSearchParams in not exists", () => {
      delete (window as any).URLSearchParams;
      const parsed = path.parse("?a=123&b=456");
      expect(parsed).toStrictEqual({
        a: "123",
        b: "456"
      });
    });
  });
  describe("getSearch", () => {
    test("getSearch() without search", () => {
      const search = path.getSearch("https://www.baidu.com");
      expect(search).toBe("");
    });
    test("getSearch() with search", () => {
      const search = path.getSearch("https://www.baidu.com?a=b&c=d");
      expect(search).toBe("?a=b&c=d");
    });
  });
});
