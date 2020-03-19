import * as func from "../src";

describe("function util", () => {
  describe("after", () => {
    test("after()", () => {
      let a = "";
      let origin = (str: string) => {
        a = str;
        return a;
      };
      const target = (event: any) => {
        a = `after1_${event.value}`;
      };
      origin = func.after(origin, target);
      origin("param");
      expect(a).toBe("after1_param");
    });
    test("after() multi times", () => {
      let a = "";
      let origin = (str: string) => {
        a = str;
        return a;
      };
      const target = (event: any) => {
        a = `${event.value}_after1_`;
        return a;
      };
      const target2 = (event: any) => {
        a = `${event.value}_after2`;
      };
      origin = func.after(origin, target);
      origin = func.after(origin, target2);
      origin("param");
      expect(a).toBe("param_after2");
    });
    test("after() without params", () => {
      let a = "";
      let origin = () => {
        return a;
      };
      const target = () => {
        a = `after1_${a}`;
        return a;
      };
      origin = func.after(origin, target);
      a = origin();
      expect(a).toBe("");
    });
  });
});
