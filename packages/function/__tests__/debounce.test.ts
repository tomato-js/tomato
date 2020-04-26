import * as func from "../src";

describe("function util", () => {
  describe("function debounce", () => {
    test("debounce(fn,1000)", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const debounceFn = func.debounce(fn, 1000);
      debounceFn();
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalled();
      expect(fn).toHaveBeenCalledTimes(1);

      jest.clearAllTimers();
    });

    test("debounce(fn,1000) execute twice", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const debounceFn = func.debounce(fn, 1000);
      debounceFn();
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).not.toBeCalled();
      debounceFn();
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).not.toBeCalled();
      jest.advanceTimersByTime(500);
      expect(fn).toBeCalled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("debounce(fn,1000,{isImmediate:true}) execute immediately", () => {
      jest.useFakeTimers();

      const fn = jest.fn();
      const debounceFn = func.debounce(fn, 1000, { isImmediate: true });

      debounceFn();
      expect(fn).toBeCalled();
      expect(fn.mock.calls.length).toBe(1);
      jest.advanceTimersByTime(500);
      expect(fn.mock.calls.length).toBe(1);
      jest.advanceTimersByTime(500);
      expect(fn.mock.calls.length).toBe(1);
    });
  });
});
