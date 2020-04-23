import * as async from "../src";

describe("async util", () => {
  const fixture = Symbol("fixture");
  describe("pTap", () => {
    test("pTap() ignore tap value", async () => {
      const value = await Promise.resolve(fixture)
        .then(async.pTap(f => 123))
        .then(data => data);
      expect(value).toBe(fixture);
    });
    test("pTap() is called", async () => {
      let num = 1;
      const value = await Promise.resolve(fixture)
        .then(async.pTap(() => num++))
        .then(data => data);
      expect(value).toBe(fixture);
      expect(num).toBe(2);
    });
  });
});
