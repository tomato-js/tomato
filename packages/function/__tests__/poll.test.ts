import * as func from "../src";

describe("func util", () => {
  describe("poll", () => {
    test("poll() normal fn in async", async () => {
      let i = 0;
      const task = () => i++;
      const { poller } = func.poll({
        fn: task,
        validate: () => i === 3,
        interval: 100
      });
      const data = await poller;
      expect(data).toBe(2);
    });
    test("poll() normal fn in promise", () => {
      let i = 0;
      const task = () => i++;
      const { poller } = func.poll({
        fn: task,
        validate: () => i === 3,
        interval: 100
      });
      return poller.then(data => {
        return expect(data).toBe(2);
      });
    });
    test("poll() promise fn in async", async () => {
      const task = () => Promise.resolve("done");
      const { poller } = func.poll({
        fn: task,
        validate: val => val === "done",
        interval: 100
      });
      const data = await poller;
      expect(data).toBe("done");
    });
    test("poll() promise fn in promise", async () => {
      const task = () => Promise.resolve("done");
      const { poller } = func.poll({
        fn: task,
        validate: val => val === "done",
        interval: 100
      });
      return poller.then(data => {
        return expect(data).toBe("done");
      });
    });
    test("poll() normal fn in async with custom interval and maxAttempts", async () => {
      let i = 0;
      const task = () => i++;
      const { poller } = func.poll({
        fn: task,
        validate: () => i === 3,
        interval: 100,
        maxAttempts: 1
      });
      expect(i).toBe(1);
    });
  });
});
