import * as element from "../src";

describe("element util", () => {
  describe("scrollToTop", () => {
    test("scrollToTop()", () => {
      element.scrollToTop();
      expect(document.body.scrollTop).toBe(0);
    });
  });
});
