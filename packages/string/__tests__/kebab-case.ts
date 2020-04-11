import * as string from "../src";

describe("string util", () => {
  describe("kebabCase", () => {
    test("kebabCase()", () => {
      expect(string.kebabCase("foo-bar")).toBe("foo-bar");
      expect(string.kebabCase("fooBar")).toBe("foo-bar");
      expect(string.kebabCase("FooBar")).toBe("foo-bar");
      expect(string.kebabCase("foo  bar")).toBe("foo-bar");
      expect(string.kebabCase("Foo Bar")).toBe("foo-bar");
      expect(string.kebabCase("foo..bar")).toBe("foo-bar");
      expect(string.kebabCase("foo__bar__")).toBe("foo-bar");
      expect(string.kebabCase("--foo--bar--")).toBe("foo-bar");
      expect(string.kebabCase("fooBarBaz")).toBe("foo-bar-baz");
      expect(string.kebabCase("fooBarBazBazzy")).toBe("foo-bar-baz-bazzy");
      expect(string.kebabCase("fooBar  baz")).toBe("foo-bar-baz");
    });
  });
});
