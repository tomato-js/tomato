import * as object from "../src";

describe("object util", () => {
  describe("deepFreeze", () => {
    test("deepFreeze", () => {
      const obj2: any = {
        internal: {
          a: null
        }
      };
      object.deepFreeze(obj2);
      const throwThis = () => (obj2.internal.a = "anotherValue");
      expect(throwThis).toThrow();
      expect(Object.isFrozen(obj2)).toBe(true);
      expect(Object.isFrozen(obj2.internal)).toBe(true);
    });
  });
});
