import * as string from "../src";

describe("string util", () => {
  describe("camelCase", () => {
    test("camelCase()", () => {
      expect(string.camelCase("   ")).toBe("");
      expect(string.camelCase("f")).toBe("f");
      expect(string.camelCase("foo")).toBe("foo");
      expect(string.camelCase("foo-bar")).toBe("fooBar");
      expect(string.camelCase("foo-bar-baz")).toBe("fooBarBaz");
      expect(string.camelCase("foo--bar")).toBe("fooBar");
      expect(string.camelCase("--foo--bar")).toBe("fooBar");
      expect(string.camelCase("--foo--bar--")).toBe("fooBar");
      expect(string.camelCase("foo..bar")).toBe("fooBar");
      expect(string.camelCase("foo__bar__")).toBe("fooBar");
      expect(string.camelCase("fooBar")).toBe("fooBar");
      expect(string.camelCase("fooBar--baz")).toBe("fooBarBaz");
      expect(string.camelCase("fooBar  baz")).toBe("fooBarBaz");
      expect(string.camelCase("fooBarBaz-bazzy")).toBe("fooBarBazBazzy");
      expect(string.camelCase("FooBar")).toBe("fooBar");
    });
  });
});
