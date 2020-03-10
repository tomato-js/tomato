import * as cookie from "../src";

describe("cookie util", () => {
  beforeEach(() => {});
  describe("set", () => {
    test("set() return true", () => {
      cookie.set("someCookieName", "true");
      cookie.set("brizer", "name");
      expect(document.cookie).toBe("someCookieName=true; brizer=name");
    });
    test("remove() success", () => {
      cookie.remove("someCookieName");
      cookie.remove("brizer");
      expect(document.cookie).toBe("");
    });
    test("set() with options", () => {
      const result = cookie.set("brizer", "name", { end: 200000, path: "/", domain: "example.com", secure: true });
      expect(result).toBe(true);
    });
    test("set() with options end in type string", () => {
      const result = cookie.set("brizer", "name", { end: "Fri, 31 Dec 9999 23:59:59 GMT" });
      expect(result).toBe(true);
    });
    test("set() with options end in type date", () => {
      const result = cookie.set("brizer", "name", { end: new Date(2027, 2, 3) });
      expect(result).toBe(true);
    });
    test("set() return false", () => {
      const result = cookie.set("max-age", "123");
      expect(result).toBe(false);
    });
  });
});
