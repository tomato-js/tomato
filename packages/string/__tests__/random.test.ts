import * as string from "../src";

describe("string util", () => {
  describe("random", () => {
    test("random() length is useful", () => {
      const result = string.random(4);
      expect(result.length).toBe(4);
    });
  });
});
