import * as string from "../src";

describe("string util", () => {
  describe("jsJson", () => {
    test("isJson() true", () => {
      const result = string.isJson('{"name":"brizer","age":20}');
      expect(result).toBe(true);
    });
    test("isJson() false", () => {
      const result = string.isJson('{"name":"brizer",age:"20"}');
      expect(result).toBe(false);
    });
  });
});
