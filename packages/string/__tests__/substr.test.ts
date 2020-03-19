import * as string from "../src";

describe("substr util", () => {
  describe("substringFromChar", () => {
    test("substringFromChar('hello world','a') char is not in string,  return ''", () => {
      const result = string.substringFromChar("hello world", "a");
      expect(result).toBe("");
    });
    test("substringFromChar('hello world','l')", () => {
      const result = string.substringFromChar("hello world", "l");
      expect(result).toBe("lo world");
    });
    test("substringFromChar('hello world','l') with opitons.itself=true", () => {
      const result = string.substringFromChar("hello world", "l", { itself: true });
      expect(result).toBe("llo world");
    });
  });
  describe("substringToChar", () => {
    test("substringToChar('hello world','a') char is not in string,  return ''", () => {
      const result = string.substringToChar("hello world", "a");
      expect(result).toBe("");
    });
    test("substringToChar('hello world','l')", () => {
      const result = string.substringToChar("hello world", "l");
      expect(result).toBe("he");
    });
    test("substringToChar('hello world','l') with opitons.itself=true", () => {
      const result = string.substringToChar("hello world", "l", { itself: true });
      expect(result).toBe("hel");
    });
  });
});
