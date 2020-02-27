import * as element from "../src";

describe("element util", () => {
  const nodeNotExist = null;
  describe("create", () => {
    beforeAll(() => {
      const div = document.createElement("div");
      div.id = "id";
      div.className = "j-id";
      div.innerText = "hello world";
      document.body.appendChild(div);
    });
    test("create(p)", () => {
      const none = element.create("p");
      none.innerHTML = "I am p";
      expect(none.innerHTML).toBe("I am p");
    });
    test("create(p,id) create p with id", () => {
      const none = element.create("p", "j-id-p", "body");
      none.innerHTML = "I am p";
      const testNode: any = element.get("j-id-p");
      expect(testNode.innerHTML).toBe("I am p");
    });
    test("create(style,id,dom) create style with id and into special dom", () => {
      const none = element.create("style", "j-id-style", "id");
      const testNode: any = element.get("#id #j-id-style");
      expect(testNode.type).toBe("text/css");
    });
    test("create(script,id) create style with id", () => {
      const none = element.create("script", "j-id-script", "id");
      const testNode: any = element.get("#j-id-script");
      expect(testNode.type).toBe("text/javascript");
    });
  });
});
