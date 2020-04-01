import * as fs from "fs";
import * as async from "../src";

describe("async util", () => {
  const fixture = (callback: Function) =>
    setImmediate(() => {
      callback(null, "brizer");
    });

  const fixture1 = (callback: Function) =>
    setImmediate(() => {
      callback("error", "brizer", "seven");
    });

  const fixture2 = (value: any, callback: Function) =>
    setImmediate(() => {
      callback(null, value);
    });

  const fixture3 = (callback: Function) =>
    setImmediate(() => {
      callback(null, "brizer", "seven");
    });

  class FixtureClass {
    type: string;
    constructor() {
      this.type = "animal";
    }
    says(callback: Function) {
      setImmediate(() => {
        callback(null, this.type);
      });
    }
  }
  describe("promisify", () => {
    test("promisify() return a promise", async () => {
      expect.assertions(1);
      const newF = async.promisify(fixture);
      expect(typeof newF().then).toBe("function");
    });
    test("promisify() with error ", () => {
      const newF = async.promisify(fixture1);
      expect(newF()).rejects.toMatch("error");
    });
    test("promisify() with single value ", async () => {
      const newF = async.promisify(fixture2);
      expect(await newF("brizer")).toBe("brizer");
    });
    test("promisify() with muitl value ", async () => {
      expect.assertions(1);
      const newF = async.promisify(fixture3);
      expect(await newF()).toEqual(["brizer", "seven"]);
    });
    test("promisify() node modules ", async () => {
      expect.assertions(1);
      const newF = async.promisify(fs.readFile);
      expect(JSON.parse((await newF("package.json")) as string).name).toEqual("root");
    });
    test("promisify() work with class and this ", async () => {
      const fixture = new FixtureClass();
      const newF = async.promisify(fixture.says);
      const result = await newF.apply(fixture);
      expect(result).toEqual("animal");
    });
  });
});
