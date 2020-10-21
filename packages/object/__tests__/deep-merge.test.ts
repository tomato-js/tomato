import * as object from "../src";

describe("object util", () => {
  describe("deepMerge", () => {
    test("deepMerge() inject normal object1", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          aa: {
            about: "me"
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          }
        },
        aa: {
          about: "me"
        }
      });
    });
    test("deepMerge() inject normal object2", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          a: {
            about: "me"
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          },
          about: "me"
        }
      });
    });
    test("deepMerge() inject normal object3", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          a: {
            b: {
              about: "me"
            }
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            about: "me",
            c: "d"
          }
        }
      });
    });
    test("deepMerge() inject normal object4", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          a: {
            b: {
              c: {
                about: "me"
              }
            }
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          }
        }
      });
    });
    test("deepMerge() overwrite normal object1", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          a: "me"
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          }
        }
      });
    });
    test("deepMerge() overwrite normal object2", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          a: {
            b: "me"
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          }
        }
      });
    });
    test("deepMerge() overwrite normal object3", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const result = object.deepMerge(
        {
          a: {
            b: {
              c: [12, 34]
            }
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          }
        }
      });
    });
    test("deepMerge() overwrite normal object4", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          },
          d: [1, 2]
        }
      };
      const result = object.deepMerge(
        {
          a: {
            d: [3, 4]
          }
        },
        obj
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          },
          d: [3, 4, 1, 2]
        }
      });
    });
    test("deepMerge() inject multiple objects", () => {
      const obj = {
        a: {
          b: {
            c: "d"
          }
        }
      };
      const obj2 = {
        a: {
          d: {
            e: "f"
          }
        }
      };
      const result = object.deepMerge(
        {
          aa: {
            about: "me"
          }
        },
        obj,
        obj2
      );
      expect(result).toEqual({
        a: {
          b: {
            c: "d"
          },
          d: {
            e: "f"
          }
        },
        aa: {
          about: "me"
        }
      });
    });
  });
});
