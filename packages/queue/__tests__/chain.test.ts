import { Chain } from "../src/Chain";

describe("function util", () => {
  describe("chain", () => {
    test("chain() add", () => {
      const task = new Chain(3);
      task.register("add", (v: any) => v + 1);
      task.register("multi", (v: any) => v * 3);
      const result = task
        .start()
        .add()
        .multi()
        .done();
      const result2 = task
        .start()
        .add()
        .multi()
        .multi()
        .done();
      const result3 = task
        .start()
        .add()
        .add()
        .add()
        .multi()
        .done();
      expect(result).toBe(12);
      expect(result2).toBe(36);
      expect(result3).toBe(18);
    });
  });
});
