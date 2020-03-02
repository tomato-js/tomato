import * as path from "../src";

describe("merge util", () => {
  describe("merge", () => {
    test("merge() without search", () => {
      const search = path.merge("https://tomato-js.github.io/tomato/index.html?a=b&c=d", "https://www.baidu.com");
      expect(search).toBe("https://www.baidu.com?a=b&c=d");
    });
    test("merge() with search", () => {
      const search = path.merge("https://tomato-js.github.io/tomato/index.html?a=b&c=d", "https://www.baidu.com?a=123&e=f");
      expect(search).toBe("https://www.baidu.com?a=123&c=d&e=f");
    });
  });
});
