import { Events } from "@tomato-js/events";
import * as async from "../src";
const fixture = Symbol("fixture");
describe("async util", () => {
  describe("PQueue", () => {
    test("add return promise", async () => {
      const queue = new async.PQueue();
      const promise = queue.add(async () => fixture);
      expect(queue.size()).toBe(0);
      expect(queue.pending).toBe(1);
      expect(await promise).toBe(fixture);
    });
    test("add multiple times", async () => {
      const queue = new async.PQueue();
      const promise = queue.add(async () => fixture);
      const promise2 = queue.add(async () => {
        await async.sleep(1000);
        return fixture;
      });
      const promise3 = queue.add(async () => fixture);
      expect(queue.pending).toBe(3);
      expect(await promise).toBe(fixture);
      expect(await promise2).toBe(fixture);
      expect(await promise3).toBe(fixture);
    });
    test("add multiple times", async () => {
      const queue = new async.PQueue();
      const promise = queue.add(async () => fixture);
      const promise2 = queue.add(async () => {
        await async.sleep(1000);
        return fixture;
      });
      const promise3 = queue.add(async () => fixture);
      expect(queue.pending).toBe(3);
      expect(await promise).toBe(fixture);
      expect(await promise2).toBe(fixture);
      expect(await promise3).toBe(fixture);
    });
    test("add multiple times with active", async () => {
      const queue = new async.PQueue();
      let i = 0;
      queue.on("active", () => {
        i++;
      });
      const promise = queue.add(async () => fixture);
      const promise2 = queue.add(async () => {
        await async.sleep(1000);
        return fixture;
      });
      const promise3 = queue.add(async () => fixture);
      expect(queue.pending).toBe(3);
      queue.on("idle", () => {
        expect(i).toBe(3);
      });
    });
    test("add multiple times in order", async () => {
      const queue = new async.PQueue();
      let str = "";
      queue.add(() => (str = str + 1));
      queue.add(() => (str = str + 2));
      queue.add(() => (str = str + 3));
      expect(queue.pending).toBe(3);
      expect(str).toBe("123");
    });
    test("add multiple times in order with async fns", async () => {
      const queue = new async.PQueue();
      let str = "";
      queue.add(async () => {
        await async.sleep(20);
        str = str + 1;
      });
      queue.add(async () => {
        await async.sleep(30);
        str = str + 2;
      });
      queue.add(async () => {
        await async.sleep(10);
        str = str + 3;
      });
      expect(queue.pending).toBe(3);
      expect(queue.size()).toBe(0);
      queue.on("idle", () => {
        expect(queue.pending).toBe(0);
        expect(queue.size()).toBe(0);
        expect(str).toBe("312");
      });
    });
    test("add multiple times in order with async fns and concurrency 1", async () => {
      const queue = new async.PQueue({ concurrency: 1 });
      let str = "";
      queue.add(async () => {
        await async.sleep(20);
        str = str + 1;
      });
      queue.add(async () => {
        await async.sleep(30000);
        str = str + 2;
      });
      queue.add(async () => {
        await async.sleep(10);
        str = str + 3;
      });
      expect(queue.pending).toBe(1);
      expect(queue.size()).toBe(2);
      queue.on("idle", () => {
        expect(queue.pending).toBe(0);
        expect(queue.size()).toBe(0);
        expect(str).toBe("123");
      });
    });
    test("add multiple times in order with async fns and concurrency 1 and onIdle", async () => {
      const queue = new async.PQueue({ concurrency: 1 });
      let str = "";
      queue.add(async () => {
        await async.sleep(20);
        str = str + 1;
      });
      queue.add(async () => {
        await async.sleep(30);
        str = str + 2;
      });
      queue.add(async () => {
        await async.sleep(10);
        str = str + 3;
      });
      expect(queue.pending).toBe(1);
      expect(queue.size()).toBe(2);
      await queue.onIdle();
      expect(queue.pending).toBe(0);
      expect(queue.size()).toBe(0);
      expect(str).toBe("123");
    });
    test("addAll()", async () => {
      const queue = new async.PQueue();
      const fn = async (): Promise<symbol> => fixture;

      const promise = queue.addAll([fn, fn, fn]);
      expect(queue.pending).toBe(3);
      expect(await promise).toEqual([fixture, fixture, fixture]);
    });
    test("addAll() with async and sync", async () => {
      const queue = new async.PQueue();
      const functions: Array<() => string | Promise<void> | Promise<unknown>> = [
        () => "sync 1",
        async () => async.sleep(2000),
        () => "sync 2",
        async () => fixture
      ];

      const promise = queue.addAll(functions);
      expect(queue.pending).toBe(4);
      expect(await promise).toEqual(["sync 1", undefined, "sync 2", fixture]);
    });
    test("autoStart false", async () => {
      const queue = new async.PQueue({ autoStart: false });

      queue.add(async () => await async.sleep(20000));
      queue.add(async () => await async.sleep(20000));
      queue.add(async () => await async.sleep(20000));
      queue.add(async () => await async.sleep(20000));
      expect(queue.pending).toBe(0);
      expect(queue.size()).toBe(4);
      expect(queue.isPaused).toBe(true);

      queue.start();
      expect(queue.pending).toBe(4);
      expect(queue.size()).toBe(0);
      expect(queue.isPaused).toBe(false);

      queue.clear();
      expect(queue.pending).toBe(0);
    });
    test("pause()", async () => {
      const queue = new async.PQueue({ autoStart: false });

      queue.add(async () => await async.sleep(20000));
      queue.add(async () => await async.sleep(20000));
      queue.add(async () => await async.sleep(20000));
      queue.add(async () => await async.sleep(20000));
      expect(queue.pending).toBe(0);
      expect(queue.size()).toBe(4);
      expect(queue.isPaused).toBe(true);

      queue.start();
      expect(queue.pending).toBe(4);
      expect(queue.size()).toBe(0);
      expect(queue.isPaused).toBe(false);

      queue.pause();
      expect(queue.pending).toBe(4);
      expect(queue.size()).toBe(0);
      expect(queue.isPaused).toBe(true);
    });
    test("PQueue should be a Events", () => {
      const queue = new async.PQueue();
      expect(queue instanceof Events).toBe(true);
    });
    test(".add() - throttled", async () => {
      const result: number[] = [];
      const queue = new async.PQueue({
        intervalCap: 1,
        interval: 300,
        autoStart: false
      });
      queue.add(async () => result.push(1));
      queue.start();
      await async.sleep(150);
      queue.add(async () => result.push(2));
      expect(result).toEqual([1]);
      await async.sleep(300);
      expect(result).toEqual([1, 2]);
    });
  });
});
