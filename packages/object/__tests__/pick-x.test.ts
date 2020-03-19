import * as object from "../src";

describe("pick-x util", () => {
  describe("pickX", () => {
    test("pickX({}) normal object", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj, ["a", "b"]);
      expect(result).toStrictEqual({
        a: "123",
        b: "456"
      });
    });
    test("pickX({}) normal object with not-in keys", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj, ["a", "b", "d"]);
      expect(result).toStrictEqual({
        a: "123",
        b: "456"
      });
    });
    test("pickX({}) normal object with all not-in keys", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj, ["d", "e"]);
      expect(result).toStrictEqual({});
    });
    test("pickX({}) normal object without keys", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj);
      expect(result).toStrictEqual({});
    });
    test("pickX({}) normal object whose value's type is same", () => {
      const obj = {
        a: "123",
        b: 456,
        c: "789"
      };
      const result = object.pickX(obj, ["a", "b"]);
      expect(result).toStrictEqual({
        a: "123",
        b: 456
      });
    });
    test("pickX({}) normal object with handler", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj, ["a", "b"], (key, value) => (key === "b" ? value + 1 : value));
      expect(result).toStrictEqual({
        a: "123",
        b: "4561"
      });
    });
    test("pickX({}) normal object with alias", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj, ["a as c", "b"]);
      expect(result).toStrictEqual({
        c: "123",
        b: "456"
      });
    });
    test("pickX({}) normal object with handler and alist", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pickX(obj, ["a as c", "b"], (key, value) => (key === "c" ? value + 1 : value));
      expect(result).toStrictEqual({
        c: "1231",
        b: "456"
      });
    });
    test("pickX({}) deep object", () => {
      const obj = {
        a: "123",
        b: {
          c: "d"
        }
      };
      const result = object.pickX(obj, ["b.c", "a"]);
      expect(result).toStrictEqual({
        a: "123",
        "b.c": "d"
      });
    });
    test("pickX({}) deep object with alias", () => {
      const obj = {
        a: "123",
        b: {
          c: "d"
        }
      };
      const result = object.pickX(obj, ["b.c as d", "a"]);
      expect(result).toStrictEqual({
        a: "123",
        d: "d"
      });
    });
    test("pickX({}) deep object with alias and  handler", () => {
      const obj = {
        a: "123",
        b: {
          c: "d"
        }
      };
      const result = object.pickX(obj, ["b.c as d", "a"], (key, value) => (key === "d" ? "handler" : value));
      expect(result).toStrictEqual({
        a: "123",
        d: "handler"
      });
    });
  });
});
