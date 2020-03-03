import * as object from "../src";

describe("pick util", () => {
  describe("pick", () => {
    test("pick({}) normal object", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pick(obj, ["a", "b"]);
      expect(result).toStrictEqual({
        a: "123",
        b: "456"
      });
    });
    test("pick({}) normal object with not-in keys", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pick(obj, ["a", "b", "d"]);
      expect(result).toStrictEqual({
        a: "123",
        b: "456"
      });
    });
    test("pick({}) normal object with all not-in keys", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pick(obj, ["d", "e"]);
      expect(result).toStrictEqual({});
    });
    test("pick({}) normal object without keys", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pick(obj);
      expect(result).toStrictEqual({});
    });
    test("pick({}) normal object whose value's type is same", () => {
      const obj = {
        a: "123",
        b: 456,
        c: "789"
      };
      const result = object.pick(obj, ["a", "b"]);
      expect(result).toStrictEqual({
        a: "123",
        b: 456
      });
    });
    test("pick({}) normal object with handler", () => {
      const obj = {
        a: "123",
        b: "456",
        c: "789"
      };
      const result = object.pick(obj, ["a", "b"], (key, value) => (key === "b" ? value + 1 : value));
      expect(result).toStrictEqual({
        a: "123",
        b: "4561"
      });
    });
  });
});
