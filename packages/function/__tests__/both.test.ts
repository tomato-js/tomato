import * as func from "../src";

describe("function util", () => {
  describe("both", () => {
    test("both()", () => {
      let a = "";
      let f1 = () => true;
      const f2 = () => true;
      const result = func.both(f1, f2);
      expect(result()).toBe(true);
    });
    test("both() with false", () => {
      let a = "";
      let f1 = () => true;
      const f2 = () => false;
      const result = func.both(f1, f2);
      expect(result()).toBe(false);
    });
    test("both() with multi func", () => {
      let a = "";
      let f1 = () => true;
      const f2 = () => true;
      const f3 = () => true;
      const result = func.both(f1, f2, f3);
      expect(result()).toBe(true);
    });
    test("both() with multi func and params", () => {
      let a = "";
      let f1 = (v: any) => v;
      const f2 = (v: any) => v;
      const result = func.both(f1.bind(null, true), f2.bind(null, true));
      expect(result()).toBe(true);
    });
    test("both() with multi func and params false", () => {
      let a = "";
      let f1 = (v: any) => v;
      const f2 = (v: any) => v;
      const result = func.both(f1.bind(null, true), f2.bind(null, false));
      expect(result()).toBe(false);
    });
    test("both() with boolean true", () => {
      let a = "";
      let f1 = true;
      const f2 = true;
      const result = func.both(f1, f2);
      expect(result()).toBe(true);
    });
    test("both() with boolean false", () => {
      let a = "";
      let f1 = true;
      const f2 = true;
      const f3 = false;
      const result = func.both(f1, f2, f3);
      expect(result()).toBe(false);
    });
  });
});
