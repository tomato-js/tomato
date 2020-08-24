/**
 * @packageDocumentation
 * @module @tomato-js/async
 */
import { Events } from "@tomato-js/events";

type Options = {
  autoStart?: boolean;
  concurrency?: number;
  intervalCap?: number;
  interval?: number;
};

type Task<TaskResultType> = (() => PromiseLike<TaskResultType>) | (() => TaskResultType);

type RunFunction = () => Promise<unknown>;

type QueueItem = {
  run: RunFunction;
};

type Queue = QueueItem[];
/**
 * 异步队列
 *
 * 新增于v0.0.18
 *
 * 脚本举例
 * ```
 *   import { PQueue, sleep } from '@tomato-js/async'
 *   const queue = new PQueue({
 *     autoStart:true, // 是否自动开始执行队列
 *     concurrency: 1 //队列执行并发数
 *   });
 *   let str = "";
 *   queue.add(async () => {
 *     await sleep(20);
 *     str = str + 1;
 *   });
 *   queue.add(async () => {
 *     await sleep(30);
 *     str = str + 2;
 *   });
 *   queue.add(async () => {
 *     await sleep(10);
 *     str = str + 3;
 *   });
 *   // 同步方法监听
 *   await queue.onIdle()//str=123;
 *   // 通过事件监听
 *   queue.on('idle',()=>str)//123
 * ```
 */
export class PQueue extends Events {
  isPaused: boolean;
  private pendingCount = 0;
  private intervalCount = 0;
  private queue: Queue;
  private concurrency: number;
  private isIntervalIgnored: boolean;
  private readonly intervalCap: number;
  private readonly interval: number;
  private intervalEnd = 0;
  private intervalId?: ReturnType<typeof setInterval>;
  private timeoutId?: ReturnType<typeof setTimeout>;
  constructor(options?: Options) {
    super();
    options = {
      autoStart: true,
      concurrency: Infinity,
      intervalCap: Infinity,
      interval: 0,
      ...options
    } as Options;
    this.isPaused = options.autoStart === false;
    this.concurrency = options.concurrency!;
    this.queue = [];
    this.isIntervalIgnored = options.intervalCap === Infinity || options.interval === 0;
    this.intervalCap = options.intervalCap as number;
    this.interval = options.interval as number;
  }
  private get doesIntervalAllowAnother(): boolean {
    return this.isIntervalIgnored || this.intervalCount < this.intervalCap;
  }
  private get doesConcurrentAllowAnother(): boolean {
    return this.pendingCount < this.concurrency;
  }
  private isIntervalPaused() {
    const now = Date.now();

    if (this.intervalId === undefined) {
      const delay = this.intervalEnd - now;
      if (delay < 0) {
        // Act as the interval was done
        // We don't need to resume it here because it will be resumed on line 160
        this.intervalCount = 0;
      } else {
        // Act as the interval is pending
        if (this.timeoutId === undefined) {
          this.timeoutId = setTimeout(() => {
            this.onResumeInterval();
          }, delay);
        }

        return true;
      }
    }

    return false;
  }

  private onResumeInterval() {
    this.onInterval();
    this.initializeIntervalIfNeeded();
    this.timeoutId = undefined;
  }

  private initializeIntervalIfNeeded(): void {
    if (this.isIntervalIgnored || this.intervalId !== undefined) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.onInterval();
    }, this.interval);

    this.intervalEnd = Date.now() + this.interval;
  }
  private onInterval() {
    if (this.intervalCount === 0 && this.pendingCount === 0 && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    this.intervalCount = 0;
    this.processQueue();
  }

  private tryToStartAnother() {
    if (this.queue.length === 0) {
      if (this.pendingCount === 0) {
        this.emit("idle");
      }
      return false;
    }
    // 未暂停则继续执行
    if (!this.isPaused) {
      const canInitializeInterval = !this.isIntervalPaused();
      if (this.doesIntervalAllowAnother && this.doesConcurrentAllowAnother) {
        this.emit("active");
        this.dequeue()!();
        // 如果开启了节流
        if (canInitializeInterval) {
          this.initializeIntervalIfNeeded();
        }
        return true;
      }
    }
    return false;
  }
  private next(): void {
    this.pendingCount--;
    this.tryToStartAnother();
  }
  private enqueue({ run }: QueueItem) {
    this.queue.push({ run });
  }
  private dequeue() {
    const item = this.queue.shift();
    return item?.run;
  }
  // while的调用tryToStartAnother，知道其返回false
  private processQueue() {
    while (this.tryToStartAnother()) {}
  }
  start() {
    if (!this.isPaused) {
      return this;
    }
    // 将暂停置为false
    this.isPaused = false;

    this.processQueue();
    return this;
  }
  //设置暂停
  pause() {
    this.isPaused = true;
  }
  add<TaskResultsType>(fn: Task<TaskResultsType>) {
    return new Promise<TaskResultsType>((resolve, reject) => {
      const run = async (): Promise<void> => {
        // 未决的promise数量+1
        this.pendingCount++;
        this.intervalCount++;
        try {
          // 执行传入的promise
          resolve(await fn());
        } catch (error) {
          reject(error);
        }
        //调用next
        this.next();
      };
      //将封装好的函数加入queue
      this.enqueue({ run });
      this.tryToStartAnother();
    });
  }
  addAll<TaskResultsType>(fns: ReadonlyArray<Task<TaskResultsType>>) {
    return Promise.all(fns.map(async fn => this.add(fn)));
  }
  onIdle() {
    return new Promise((resolve, reject) => {
      this.on("idle", () => resolve());
    });
  }
  clear() {
    this.queue = [];
    this.pendingCount = 0;
    return true;
  }
  size() {
    return this.queue.length;
  }
  get pending() {
    return this.pendingCount;
  }
}
