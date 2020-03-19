import * as env from "../src";

describe("env util", () => {
  describe("isBrowser", () => {
    test("isBrowser()", () => {
      const result = env.isBrowser();
      expect(result).toBe(true);
    });
  });
});
