import * as async from "../src";

describe("async util", () => {
  describe("sleep", () => {
    test("sleep()", async () => {
      expect.assertions(1);
      const result = await async.sleep(1000);
      expect(result).toBe(undefined);
    });
    test("sleep() with value", async () => {
      expect.assertions(1);
      const result = await async.sleep(1000, { value: "someString" });
      expect(result).toBe("someString");
    });
  });
});
