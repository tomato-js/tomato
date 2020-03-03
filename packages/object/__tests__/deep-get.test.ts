import * as object from "../src";

describe("object util", () => {
  describe("deep-get", () => {
    test("deepGet({}) normal object", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepGet("a.b.c", obj);
      expect(result).toStrictEqual("d");
    });
  });
});
