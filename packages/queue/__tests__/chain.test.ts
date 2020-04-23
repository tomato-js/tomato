import { Chain } from "../src/Chain";
import * as queue from "../src/index";
import { multiply } from "../../math/src/multiply";

describe("function util", () => {
  describe("Chain", () => {
    test("Chain class", () => {
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
  describe("chain function", () => {
    test("chain function", () => {
      const result = queue
        .chainer(3)
        .add(4)
        .done();
      expect(result).toBe(7);
    });
    test("chain function 2 same func", () => {
      const result = queue
        .chainer(3)
        .add(4)
        .add(5)
        .done();
      expect(result).toBe(12);
    });
    test("chain function 2 diff func", () => {
      const result = queue
        .chainer(3)
        .add(4)
        .subtract(5)
        .done();
      expect(result).toBe(2);
    });
    test("chain function 3 diff func", () => {
      const result = queue
        .chainer(3)
        .add(4)
        .subtract(5)
        .multiply(10)
        .done();
      expect(result).toBe(20);
    });
    test("chain function 4 diff func", () => {
      const result = queue
        .chainer(3)
        .add(4)
        .subtract(5)
        .multiply(10)
        .divide(4)
        .done();
      expect(result).toBe(5);
    });
    test("chain function 4 diff func and 2 same func", () => {
      const result = queue
        .chainer(3)
        .add(4)
        .subtract(5)
        .multiply(10)
        .divide(4)
        .add(10)
        .subtract(5)
        .done();
      expect(result).toBe(10);
    });
  });
});
