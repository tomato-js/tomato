import * as string from "../src";

describe("string util", () => {
  describe("reverse", () => {
    test("reverse()", () => {
      const result = string.reverse("foobar");
      expect(result).toBe("raboof");
    });
  });
});
