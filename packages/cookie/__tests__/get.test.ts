import * as cookie from "../src";

describe("cookie util", () => {
  beforeEach(() => {});
  describe("get", () => {
    test("get()", () => {
      const result = cookie.get("someCookieName", "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/");
      expect(result).toBe("true");
    });
    test("get()", () => {
      const result = cookie.get("path", "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/");
      expect(result).toBe("/");
    });
  });
});
