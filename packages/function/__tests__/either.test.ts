import * as func from "../src";

describe("function util", () => {
  describe("either", () => {
    test("either()", () => {
      let a = "";
      let f1 = () => true;
      const f2 = () => false;
      const result = func.either(f1, f2);
      expect(result()).toBe(true);
    });
    test("either() with false", () => {
      let a = "";
      let f1 = () => true;
      const f2 = () => false;
      const result = func.either(f1, f2);
      expect(result()).toBe(true);
    });
    test("either() with multi func", () => {
      let a = "";
      let f1 = () => false;
      const f2 = () => true;
      const f3 = () => false;
      const result = func.either(f1, f2, f3);
      expect(result()).toBe(true);
    });
    test("either() with multi func and params", () => {
      let a = "";
      let f1 = (v: any) => v;
      const f2 = (v: any) => v;
      const result = func.either(f1.bind(null, false), f2.bind(null, true));
      expect(result()).toBe(true);
    });
    test("either() with multi func and params false", () => {
      let a = "";
      let f1 = (v: any) => v;
      const f2 = (v: any) => v;
      const result = func.either(f1.bind(null, false), f2.bind(null, false));
      expect(result()).toBe(false);
    });
    test("either() with boolean true", () => {
      let a = "";
      let f1 = false;
      const f2 = true;
      const result = func.either(f1, f2);
      expect(result()).toBe(true);
    });
    test("either() with boolean false", () => {
      let a = "";
      let f1 = true;
      const f2 = true;
      const f3 = false;
      const result = func.either(f1, f2, f3);
      expect(result()).toBe(true);
    });
  });
});
