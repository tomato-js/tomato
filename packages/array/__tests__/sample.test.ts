import * as array from "../src";

describe("array util", () => {
  describe("sample", () => {
    test("sample()", () => {
      const result = array.sample([1, 2, 3, 4]);
      expect([1, 2, 3, 4].includes(result)).toBe(true);
    });
  });
});
