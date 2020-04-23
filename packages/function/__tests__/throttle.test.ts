import * as func from "../src";

describe("function util", () => {
  describe("function throttle", () => {
    test("throttle(fn,1000)", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const throttleFn = func.throttle(fn, 1000);
      throttleFn();
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalled();
      expect(fn).toHaveBeenCalledTimes(1);

      jest.clearAllTimers();
    });

    test("throttle(fn,1000) twice", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const throttleFn = func.throttle(fn, 1000);
      throttleFn();
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).not.toBeCalled();
      throttleFn();
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("throttle(fn,1000,{isImmediate:true})", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const throttleFn = func.throttle(fn, 1000, { isImmediate: true });

      throttleFn();
      expect(fn).toBeCalled();
      expect(fn).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(500);
      throttleFn();
      expect(fn).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(500);
      expect(fn).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(500);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});
