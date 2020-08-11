import * as env from "../src";

describe("env util", () => {
  describe("isNode", () => {
    test("isNode()", () => {
      const result = env.isNode();
      expect(result).toBe(true);
    });
  });
});
