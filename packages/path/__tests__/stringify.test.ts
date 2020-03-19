import * as path from "../src";

describe("path util", () => {
  const nodeNotExist = null;
  describe("stringify", () => {
    test("stringify({})", () => {
      const parsed = path.stringify({});
      expect(parsed).toBe("");
    });
    test("stringify()", () => {
      const parsed = path.stringify(null as any);
      expect(parsed).toBe("");
    });
    test("stringify({}) some normal object", () => {
      const parsed = path.stringify({
        queryKey: "this is queryA",
        url: "https://tomato-js.github.io/tomato/index.html",
        中文: "你好"
      });
      expect(parsed).toBe("queryKey=this%20is%20queryA&url=https%3A%2F%2Ftomato-js.github.io%2Ftomato%2Findex.html&%E4%B8%AD%E6%96%87=%E4%BD%A0%E5%A5%BD");
    });
    test("stringify({},{encode:false}) some normal object with encode false", () => {
      const parsed = path.stringify(
        {
          queryKey: "this is queryA",
          url: "https://tomato-js.github.io/tomato/index.html",
          中文: "你好"
        },
        { encode: false }
      );
      expect(parsed).toBe("queryKey=this is queryA&url=https://tomato-js.github.io/tomato/index.html&中文=你好");
    });
    test("stringify({}) object with only one key", () => {
      const parsed = path.stringify({
        queryKey: "this is queryA"
      });
      expect(parsed).toBe("queryKey=this%20is%20queryA");
    });
  });
});
