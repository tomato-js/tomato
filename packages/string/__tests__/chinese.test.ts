import * as string from "../src";

describe("string util", () => {
  describe("int2Chinese", () => {
    test("int2Chinese() every number have value", () => {
      expect(string.int2Chinese(3232)).toBe("三千二百三十二");
      expect(string.int2Chinese(4332356)).toBe("四百三十三万二千三百五十六");
      expect(string.int2Chinese(412313332356)).toBe("四千一百二十三亿一千三百三十三万二千三百五十六");
    });
    test("int2Chinese() with zero in middle", () => {
      expect(string.int2Chinese(3002)).toBe("三千零二");
      expect(string.int2Chinese(4300356)).toBe("四百三十万零三百五十六");
      expect(string.int2Chinese(412300000356)).toBe("四千一百二十三亿零三百五十六");
    });
    test("int2Chinese() with zero in end", () => {
      expect(string.int2Chinese(1)).toBe("一");
      expect(string.int2Chinese(10)).toBe("十");
      expect(string.int2Chinese(100)).toBe("一百");
      expect(string.int2Chinese(1000)).toBe("一千");
      expect(string.int2Chinese(10000)).toBe("一万");
      expect(string.int2Chinese(100000)).toBe("十万");
      expect(string.int2Chinese(1000000)).toBe("一百万");
      expect(string.int2Chinese(10000000)).toBe("一千万");
    });
    test("int2Chinese() with random number", () => {
      expect(string.int2Chinese(11002506)).toBe("一千一百万零二千五百零六");
      expect(string.int2Chinese(10102506)).toBe("一千零一十万零二千五百零六");
      expect(string.int2Chinese(112506)).toBe("十一万二千五百零六");
      expect(string.int2Chinese(12102506)).toBe("一千二百一十万零二千五百零六");
      expect(string.int2Chinese(100022102506)).toBe("一千亿零二千二百一十万零二千五百零六");
      expect(string.int2Chinese(10021)).toBe("一万零二十一");
      expect(string.int2Chinese(102506)).toBe("十万零二千五百零六");
    });
    test("int2Chinese() with negative number", () => {
      expect(string.int2Chinese(-11002506)).toBe("负一千一百万零二千五百零六");
      expect(string.int2Chinese(-10102506)).toBe("负一千零一十万零二千五百零六");
      expect(string.int2Chinese(-112506)).toBe("负十一万二千五百零六");
      expect(string.int2Chinese(-12102506)).toBe("负一千二百一十万零二千五百零六");
      expect(string.int2Chinese(-100022102506)).toBe("负一千亿零二千二百一十万零二千五百零六");
      expect(string.int2Chinese(-10021)).toBe("负一万零二十一");
      expect(string.int2Chinese(-102506)).toBe("负十万零二千五百零六");
    });
  });
  describe("float2Chinese", () => {
    test("float2Chinese() with random number", () => {
      expect(string.float2Chinese(110025.06)).toBe("点零六");
      expect(string.float2Chinese(101.02506)).toBe("点零二五零六");
      expect(string.float2Chinese(1125.06)).toBe("点零六");
      expect(string.float2Chinese(121.02506)).toBe("点零二五零六");
      expect(string.float2Chinese(10002210.2506)).toBe("点二五零六");
      expect(string.float2Chinese(1.0021)).toBe("点零零二一");
      expect(string.float2Chinese(10250.6)).toBe("点六");
    });
  });
  describe("number2Chinese", () => {
    test("number2Chinese() with random number", () => {
      expect(string.number2Chinese(110025.06)).toBe("十一万零二十五点零六");
      expect(string.number2Chinese(-101.02506)).toBe("负一百零一点零二五零六");
      expect(string.number2Chinese(1125.06)).toBe("一千一百二十五点零六");
      expect(string.number2Chinese(-121.02506)).toBe("负一百二十一点零二五零六");
      expect(string.number2Chinese(10002210.2506)).toBe("一千万零二千二百一十点二五零六");
      expect(string.number2Chinese(-1.0021)).toBe("负一点零零二一");
      expect(string.number2Chinese(10250.6)).toBe("一万零二百五十点六");
    });
  });
});
