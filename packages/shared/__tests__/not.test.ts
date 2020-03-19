import * as shared from "../src";

describe("shared util", () => {
  describe("not", () => {
    test("not()", () => {
      expect(shared.not(true)).toBe(false);
      expect(shared.not(false)).toBe(true);
      expect(shared.not(0)).toBe(true);
      expect(shared.not(1)).toBe(false);
    });
  });
});
