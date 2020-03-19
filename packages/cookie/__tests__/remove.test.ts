import * as cookie from "../src";

describe("cookie util", () => {
  beforeEach(() => {});
  describe("remove", () => {
    test("remove() return true", () => {
      document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      const result = cookie.remove("someCookieName");
      expect(result).toBe(true);
    });
    test("remove() return false", () => {
      document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      const result = cookie.remove("name");
      expect(result).toBe(false);
    });
  });
});
