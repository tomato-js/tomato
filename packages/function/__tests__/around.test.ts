import * as func from "../src";

describe("function util", () => {
  describe("around", () => {
    test("around()", () => {
      let a = "";
      let origin = (str: string) => {
        return a;
      };
      const target = (event: any) => {
        a = `${event.args[0]}_around_`;
        return a;
      };
      origin = func.around(origin, target);
      origin("param");
      expect(a).toBe("param_around_");
    });
    test("around() without params", () => {
      let count = 0;
      let origin = () => {};
      const target = () => {
        count++;
      };
      origin = func.around(origin, target);
      origin();
      expect(count).toBe(2);
    });
    test("around() without params multi times", () => {
      let count = 0;
      let origin = () => {};
      const target = () => {
        count++;
      };
      origin = func.around(origin, target);
      origin = func.around(origin, target);
      origin();
      expect(count).toBe(4);
    });
  });
});
