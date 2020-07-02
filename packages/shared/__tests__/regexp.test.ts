import * as shared from "../src";

describe("shared util", () => {
  describe("regexp", () => {
    test("regexp()", () => {
      expect(shared.integerReg.test("3")).toBe(true);
      expect(shared.integerReg.test("3.22")).toBe(false);
      expect(shared.integerReg.test("word")).toBe(false);

      expect(shared.positiveNumReg.test("3")).toBe(true);
      expect(shared.positiveNumReg.test("-3")).toBe(false);
      expect(shared.positiveNumReg.test("3.22")).toBe(false);
      expect(shared.positiveNumReg.test("word")).toBe(false);

      expect(shared.negativeNumReg.test("3")).toBe(false);
      expect(shared.negativeNumReg.test("-3")).toBe(true);
      expect(shared.negativeNumReg.test("-3.22")).toBe(false);
      expect(shared.negativeNumReg.test("word")).toBe(false);

      expect(shared.chineseReg.test("￥#@")).toBe(false);
      expect(shared.chineseReg.test("中国")).toBe(true);
      expect(shared.chineseReg.test("-3.22")).toBe(false);
      expect(shared.chineseReg.test("word")).toBe(false);

      expect(shared.englishReg.test("￥#@")).toBe(false);
      expect(shared.englishReg.test("中国")).toBe(false);
      expect(shared.englishReg.test("-3.22")).toBe(false);
      expect(shared.englishReg.test("word")).toBe(true);
    });
  });
});
