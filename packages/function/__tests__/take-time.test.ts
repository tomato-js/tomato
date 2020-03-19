import mockConsole from "jest-mock-console";
import * as func from "../src";

describe("function util", () => {
  describe("takeTime", () => {
    test("takeTime()", () => {
      const restoreConsole = mockConsole(["time"]);
      func.takeTime(() => Math.pow(2, 10));
      expect(console.time).toHaveBeenCalled();
      restoreConsole();
    });
  });
});
