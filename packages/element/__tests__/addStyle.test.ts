import * as element from "../src";

describe("element util", () => {
  const nodeNotExist = null;
  describe("addStyle", () => {
    beforeEach(() => {
      document.head.innerHTML = "";
      document.body.innerHTML = "";
      const div = document.createElement("div");
      div.id = "id";
      div.className = "j-id";
      div.innerHTML = "<span>hello world</>";
      document.body.appendChild(div);
    });
    test("addStyle() add style append to head", () => {
      element.addStyle(`body{background:red;}`);
      const htmlNode: any = element.get("html");
      expect(htmlNode.innerHTML).toBe(
        '<head><style type="text/css">body{background:red;}</style></head><body><div id="id" class="j-id"><span>hello world</span></div></body>'
      );
    });
    test("addStyle() add style append to head in multi lines", () => {
      const cssStr = `body{background:red;}
        .class { color:red; }`;
      element.addStyle(cssStr);
      const htmlNode: any = element.get("html");
      expect(htmlNode.innerHTML).toBe(
        '<head><style type="text/css">body{background:red;}.class{color:red;}</style></head><body><div id="id" class="j-id"><span>hello world</span></div></body>'
      );
    });
    test("addStyle() add style append to head in multi lines with \\", () => {
      const cssStr = "\
            body{background:red;}\
            .class { color:red; }\
            ";
      element.addStyle(cssStr);
      const htmlNode: any = element.get("html");
      expect(htmlNode.innerHTML).toBe(
        '<head><style type="text/css">body{background:red;}.class{color:red;}</style></head><body><div id="id" class="j-id"><span>hello world</span></div></body>'
      );
    });
    test("addStyle() add style append to head multi times", () => {
      element.addStyle(`body{background:red;}`);
      element.addStyle(`.class{color:blue;}`);
      const htmlNode: any = element.get("html");
      expect(htmlNode.innerHTML).toBe(
        '<head><style type="text/css">body{background:red;}</style><style type="text/css">.class{color:blue;}</style></head><body><div id="id" class="j-id"><span>hello world</span></div></body>'
      );
    });
    test("addStyle() return created node", () => {
      const createdNode: any = element.addStyle(`body{background:red;}`);
      const htmlNode: any = element.get("html");
      expect(createdNode.innerHTML).toBe("body{background:red;}");
    });
  });
});
