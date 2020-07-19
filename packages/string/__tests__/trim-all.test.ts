import * as string from "../src";

describe("string util", () => {
  describe("trimAll", () => {
    test("trimAll()", () => {
      const str = `   my name is brizer    `;
      const trimmedStr = string.trimAll(str);
      expect(trimmedStr).toBe(`mynameisbrizer`);
    });
  });
});
