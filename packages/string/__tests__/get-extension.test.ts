import * as string from "../src";

describe("string util", () => {
  describe("getExtension", () => {
    test("getExtension()", () => {
      expect(string.getExtension("111.png")).toBe("png");
      expect(string.getExtension("222/333.webp")).toBe("webp");
    });
    test("getExtension() with params", () => {
      expect(string.getExtension("https://edu-image.nosdn.127.net/7d844574f71e424fb6adf9d2cf3c2fd6.jpg?imageView&quality=100&type=webp")).toBe("jpg");
    });
  });
});
