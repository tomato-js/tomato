import * as cookie from "../src";

describe("cookie util", () => {
  beforeEach(() => {});
  describe("has", () => {
    test("has() return true", () => {
      const result = cookie.has("someCookieName", "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/");
      expect(result).toBe(true);
    });
    test("has() return false", () => {
      const result = cookie.has("name", "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/");
      expect(result).toBe(false);
    });
  });
});
