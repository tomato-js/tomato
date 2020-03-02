import * as shared from "../src";

describe("string util", () => {
  describe("substringFromChar", () => {
    test("substringFromChar('hello world','a') char is not in string,  return string", () => {
      const result = shared.substringFromChar("hello world", "a");
      expect(result).toBe("hello world");
    });
    test("substringFromChar('hello world','l')", () => {
      const result = shared.substringFromChar("hello world", "l");
      expect(result).toBe("lo world");
    });
    test("substringFromChar('hello world','l') with opitons.itself=true", () => {
      const result = shared.substringFromChar("hello world", "l", { itself: true });
      expect(result).toBe("llo world");
    });
  });
  describe("substringToChar", () => {
    test("substringToChar('hello world','l')", () => {
      const result = shared.substringToChar("hello world", "l");
      expect(result).toBe("he");
    });
    test("substringToChar('hello world','l') with opitons.itself=true", () => {
      const result = shared.substringToChar("hello world", "l", { itself: true });
      expect(result).toBe("hel");
    });
  });
});
