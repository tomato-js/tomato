import * as async from "../src";

describe("async util", () => {
  const fixture = Symbol("fixture");
  describe("pIf", () => {
    test("pIf() if with typeof condition is boolean", async () => {
      const value = await Promise.resolve(fixture).then(
        async.pIf(
          true,
          () => "if",
          () => "else"
        )
      );
      expect(value).toBe("if");
    });
    test("pIf() else with typeof condition is boolean", async () => {
      const value = await Promise.resolve(fixture).then(
        async.pIf(
          false,
          () => "if",
          () => "else"
        )
      );
      expect(value).toBe("else");
    });
    test("pIf() only if with typeof condition is boolean", async () => {
      const value = await Promise.resolve(fixture).then(async.pIf(true, () => "if"));
      expect(value).toBe("if");
    });
    test("pIf() only else with typeof condition is boolean", async () => {
      const value = await Promise.resolve(fixture).then(async.pIf(false, () => "if"));
      expect(value).toBe(fixture);
    });
    test("pIf() with typeof condition is Function", async () => {
      const isEmpty = (array: unknown[]) => array.length === 0;
      const valueA = await Promise.resolve([]).then(async.pIf(isEmpty, (array: unknown[]) => array.concat(42)));
      const valueB = await Promise.resolve([1]).then(async.pIf(isEmpty, (array: unknown[]) => array.concat(42)));
      expect(valueA).toEqual([42]);
      expect(valueB).toEqual([1]);
    });
    test("pIf() with typeof condition is async Function", async () => {
      const isEmpty = async (array: unknown[]) => array.length === 0;
      const valueA = await Promise.resolve([]).then(async.pIf(isEmpty, (array: unknown[]) => array.concat(42)));
      const valueB = await Promise.resolve([1]).then(async.pIf(isEmpty, (array: unknown[]) => array.concat(42)));
      expect(valueA).toEqual([42]);
      expect(valueB).toEqual([1]);
    });
    test("pIf() else with typeof condition is boolean and types", async () => {
      const value = await Promise.resolve(fixture).then(
        async.pIf<Symbol, string, string>(
          false,
          () => "if",
          () => "else"
        )
      );
      expect(value).toBe("else");
    });
    test("pIf() with typeof condition is async Function any types", async () => {
      const isEmpty = async (array: unknown[]) => array.length === 0;
      const valueA = await Promise.resolve([]).then(
        async.pIf<number[], number[], undefined>(isEmpty, (array: number[]) => array.concat(42))
      );
      const valueB = await Promise.resolve([1]).then(
        async.pIf<number[], number[], undefined>(isEmpty, (array: number[]) => array.concat(42))
      );
      expect(valueA).toEqual([42]);
      expect(valueB).toEqual([1]);
    });
  });
});
