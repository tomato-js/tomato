import * as func from "../src";

describe("function util", () => {
  describe("before", () => {
    test("before()", () => {
      let a = "";
      let origin = (str: string) => {
        a = `${a}${str}`;
        return a;
      };
      const target = () => {
        a = `before1_${a}`;
      };
      origin = func.before(origin, target);
      origin("param");
      expect(a).toBe("before1_param");
    });
    test("before() multi times", () => {
      let a = "";
      let origin = (str: string) => {
        a = `${a}${str}`;
        return a;
      };
      const target = () => {
        a = `${a}_before1_`;
      };
      const target2 = () => {
        a = `${a}_before2`;
      };
      origin = func.before(origin, target);
      origin = func.before(origin, target2);
      origin("param");
      expect(a).toBe("_before2_before1_param");
    });
    test("before() without params", () => {
      let a = "";
      let origin = () => {
        return a;
      };
      const target = () => {
        a = `before1_${a}`;
      };
      origin = func.before(origin, target);
      a = origin();
      expect(a).toBe("before1_");
    });
  });
});
