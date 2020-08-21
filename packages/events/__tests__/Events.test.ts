import * as events from "../src";

describe("events util", () => {
  describe("Events", () => {
    test("no events to emit return false", () => {
      const e = new events.Events();
      expect(e.emit("foo")).toBe(false);
      expect(e.emit("bar")).toBe(false);
    });
    test("emit without context", () => {
      const e = new events.Events();
      e.on("foo", (bar: any) => {
        expect(bar).toBe("bar");
      });
      e.emit("foo", "bar");
    });
    test("emit with context", () => {
      const context = { bar: "baz" };
      const e = new events.Events();
      e.on(
        "foo",
        function(bar: any) {
          expect(bar).toBe("bar");
          //@ts-ignore
          expect(this).toEqual(context);
        },
        context
      );
      e.emit("foo", "bar");
    });
    test("emits to all listeners", () => {
      const e = new events.Events();
      let str = "";
      e.on("foo", () => {
        str += "1";
      });
      e.on("foo", () => {
        str += "2";
      });
      e.on("foo", () => {
        str += "3";
      });
      e.on("good", () => {
        str += "4";
      });
      e.emit("foo");
      expect(str).toBe("123");
      expect(e.listeners("foo")?.length).toBe(3);
      expect(e.size()).toBe(4);
    });
    test("only emit once for multiple events", () => {
      const e = new events.Events();
      let str = "";
      e.once("foo", () => {
        str += "1";
      });
      e.once("good", () => {
        str += "4";
      });
      e.emit("foo");
      e.emit("foo");
      e.emit("foo");
      e.emit("foo");
      expect(str).toBe("1");
      e.emit("good");
      expect(str).toBe("14");
    });
    test("clear and clearAll", () => {
      const e = new events.Events();
      let str = "";
      e.on("foo", () => {
        str += "1";
      });
      e.on("good", () => {
        str += "4";
      });
      e.clear("foo");
      e.emit("foo");
      e.emit("foo");
      e.emit("foo");
      e.emit("foo");
      expect(str).toBe("");
      e.clear();
      e.emit("good");
      expect(str).toBe("");
    });
    test("clear only the listeners matching the specified listener", () => {
      const e = new events.Events();
      function foo() {}
      function bar() {}
      function baz() {}

      e.on("foo", foo);
      e.on("bar", bar);
      e.on("bar", baz);

      e.clear("foo", foo);
      expect(e.listeners("foo")).toEqual([]);
      expect(e.size()).toEqual(2);
      e.clear("bar", bar);
      expect(e.size()).toEqual(1);
      expect(e.listeners("bar")).toEqual([baz]);
    });
  });
});
