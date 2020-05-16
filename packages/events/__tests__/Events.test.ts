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
      e.on("foo", bar => {
        expect(bar).toBe("bar");
      });
      e.emit("foo", "bar");
    });
    test("emit with context", () => {
      const context = { bar: "baz" };
      const e = new events.Events();
      e.on(
        "foo",
        function(bar) {
          expect(bar).toBe("bar");
          //@ts-ignore
          expect(this).toEqual(context);
        },
        context
      );
      e.emit("foo", "bar");
    });
  });
});
