import * as array from "../src";

describe("array util", () => {
  describe("sampleSize", () => {
    test("sampleSize()", () => {
      const result = array.sampleSize([1, 2, 3, 4], 3);
      expect(result.length).toStrictEqual(3);
    });
  });
});
