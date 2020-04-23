import * as async from "../src";

describe("async util", () => {
  const fixture = () => {
    return new Promise((resolve, reject) => {
      resolve("brizer");
    });
  };
  const fixture2 = () => {
    return new Promise((resolve, reject) => {
      reject("myerror");
    });
  };

  class FixtureClass {
    type: string;
    constructor() {
      this.type = "animal";
    }
    says() {
      return new Promise((resolve, reject) => {
        resolve(this.type);
      });
    }
  }
  describe("callbackify", () => {
    test("callbackify()", () => {
      const newF = async.callbackify(fixture);
      newF((error: any, value: any) => {
        expect(value).toBe("brizer");
      });
    });
    test("callbackify() with error", () => {
      const newF = async.callbackify(fixture2);
      newF((error: any, value: any) => {
        expect(error).toBe("myerror");
      });
    });
    test("callbackify() with this", () => {
      const fixture = new FixtureClass();
      const newF = async.callbackify(fixture.says);
      newF.call(fixture, (error: any, value: any) => {
        expect(value).toBe("animal");
      });
    });
  });
});
