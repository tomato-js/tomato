import * as func from "../src";

describe("function util", () => {
  describe("waitUntil", () => {
    test("waitUntil()", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      let bool = false;
      const boolFn = () => bool;
      func.waitUntil(boolFn, fn, 1000);
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(fn).not.toBeCalled();
      bool = true;
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalled();
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
