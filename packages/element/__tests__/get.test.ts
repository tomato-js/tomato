import * as element from "../src";

describe("element util", () => {
  const nodeNotExist = null;
  describe("get", () => {
    beforeAll(() => {
      const div = document.createElement("div");
      div.id = "id";
      div.className = "j-id";
      div.innerText = "hello world";
      document.body.appendChild(div);
    });
    test("get(null)", () => {
      const none = element.get("null");
      expect(none).toBe(null);
    });
    test("get(id) by id", () => {
      const node: any = element.get("id");
      expect(node.innerText).toBe("hello world");
    });
    test("get(class) by classname", () => {
      const node: any = element.get(".j-id");
      expect(node.innerText).toBe("hello world");
    });
  });
});
