import * as element from "../src";

describe("element util", () => {
  const nodeNotExist = null;
  describe("insert", () => {
    beforeEach(() => {
      document.body.innerHTML = "";
      const div = document.createElement("div");
      div.id = "id";
      div.className = "j-id";
      div.innerHTML = "<span>hello world</>";
      document.body.appendChild(div);
    });
    test("append(id,dom)", () => {
      const childNode = document.createElement("p");
      childNode.innerHTML = "it is p";
      element.append("id", childNode);
      const fatherNode: any = element.get("id");
      expect(fatherNode.innerHTML).toBe("<span>hello world</span><p>it is p</p>");
    });
    test("prepend(id,dom)", () => {
      const childNode = document.createElement("p");
      childNode.innerHTML = "it is p";
      element.prepend("id", childNode);
      const fatherNode: any = element.get("id");
      expect(fatherNode.innerHTML).toBe("<p>it is p</p><span>hello world</span>");
    });
    test("insertBefore(id,dom)", () => {
      const beforeNode = document.createElement("p");
      beforeNode.innerHTML = "it is p";
      element.insertBefore("id", beforeNode);
      expect(document.body.innerHTML).toBe('<p>it is p</p><div id="id" class="j-id"><span>hello world</span></div>');
    });
    test("insertAfter(id,dom)", () => {
      const afterNode = document.createElement("p");
      afterNode.innerHTML = "it is p";
      element.insertAfter("id", afterNode);
      expect(document.body.innerHTML).toBe('<div id="id" class="j-id"><span>hello world</span></div><p>it is p</p>');
    });
  });
});
