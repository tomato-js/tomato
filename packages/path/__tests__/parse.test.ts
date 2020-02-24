import * as path from "../src";

describe("path util", () => {
  const nodeNotExist = null;
  describe("parse", () => {
    test("parse() without queryString", () => {
      const parsed = path.parse("");
      expect(parsed).toBe(null);
    });
    test("parse(https://www.baidu.com?a=123&b=456) with queryString", () => {
      const parsed = path.parse("?a=123&b=456");
      expect(parsed).toStrictEqual({
        a: "123",
        b: "456"
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
});
