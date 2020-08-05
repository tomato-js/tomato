import { getIns, request, get, post } from "../src/index";

describe("request util", () => {
  describe("request", () => {
    test("simple get should be get success", async () => {
      const { data } = await get("https://www.fastmock.site/mock/8332447d5c4fec921524386191213068/test/api/get.json");
      expect(data).toEqual({ hello: "world" });
    });
    test("simple post should be post success", async () => {
      const { data } = await post("https://www.fastmock.site/mock/8332447d5c4fec921524386191213068/test/api/post.json", {
        data: {
          potions: "xixi"
        }
      });
      expect(data).toEqual({ hello: "world" });
    });
    test("interceptors should work success", async () => {
      const myRequest = getIns({
        responseInterceptors: [
          {
            onFulfilled: response => {
              response.data.hello = "me";
              return response;
            },
            onRejected: error => {
              return Promise.reject(error);
            }
          }
        ]
      });
      const response = await myRequest.post("https://www.fastmock.site/mock/8332447d5c4fec921524386191213068/test/api/post.json", {
        option: "lala"
      });
      expect(response.data).toEqual({ hello: "me" });
    });
    test("complex request with methods", async () => {
      const { data } = await request({
        method: "get",
        url: "https://www.fastmock.site/mock/8332447d5c4fec921524386191213068/test/api/get.json"
      });
      expect(data).toEqual({ hello: "world" });
    });
  });
});
