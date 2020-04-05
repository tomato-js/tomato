import * as object from "../src";

describe("object util", () => {
  describe("lazy", () => {
    test("lazy() should get a lazy property", () => {
      const obj: any = {};
      let count = 0;
      object.lazy(obj, "x", function() {
        count++;
        return 2;
      });

      const x = obj.x;
      expect(x).toBe(2);
      expect(count).toBe(1);

      const x2 = obj.x;
      expect(x2).toBe(2);
      expect(count).toBe(1);
    });
    test("lazy() should set a lazy property", () => {
      const obj: any = {};
      object.lazy(obj, "x", function() {
        return 2;
      });

      obj.x = 3;
      const x = obj.x;
      expect(x).toBe(3);
    });
  });
});
