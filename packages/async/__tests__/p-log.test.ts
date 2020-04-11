import mockConsole from "jest-mock-console";
import * as async from "../src";

describe("async util", () => {
  const fixture = Symbol("fixture");
  describe("pLog", () => {
    test("pLog()", async () => {
      const restoreConsole = mockConsole();
      const value = await Promise.resolve(fixture).then(async.pLog());
      expect(value).toBe(fixture);
      expect(console.log).toHaveBeenCalled();
      restoreConsole();
    });
    test("pLog() with custom logger", async () => {
      const logger = (value: Symbol) => {
        expect(value).toBe(fixture);
      };
      const value = await Promise.resolve(fixture).then(async.pLog(logger));
      expect(value).toBe(fixture);
    });
    test("pLog() ignore tap value", async () => {
      const value = await Promise.resolve(fixture)
        .then(async.pLog())
        .then(data => data);
      expect(value).toBe(fixture);
    });
  });
});
