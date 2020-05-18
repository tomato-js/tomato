/**
 * @packageDocumentation
 * @module @tomato-js/async
 */
import { Events } from "@tomato-js/events";

type Options = {
  autoStart?: boolean;
  concurrency?: number;
};

type Task<TaskResultType> = (() => PromiseLike<TaskResultType>) | (() => TaskResultType);

type RunFunction = () => Promise<unknown>;

type QueueItem = {
  run: RunFunction;
};

type Queue = QueueItem[];
/**
 * 函数描述
 *
 * 新增于v0.0.18
 *
 * 脚本举例
 * ```
 *   import { PQueue, sleep } from '@tomato-js/async'
 *   const queue = new PQueue({
 *     autoStart:false, // 是否自动开始执行队列
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
 *   await queue.onIdle(()=>str)//123;
 *   // 通过事件监听
 *   queue.on('idle',()=>str)//123
 * ```
 */
export class PQueue extends Events {
  isPaused: boolean;
  private pendingCount = 0;
  private queue: Queue;
  private concurrency: number;
  constructor(options?: Options) {
    super();
    options = {
      autoStart: true,
      concurrency: Infinity,
      ...options
    } as Options;
    this.isPaused = options.autoStart === false;
    this.concurrency = options.concurrency!;
    this.queue = [];
  }
  private get doesConcurrentAllowAnother(): boolean {
    return this.pendingCount < this.concurrency;
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
      if (this.doesConcurrentAllowAnother) {
        this.emit("active");
        this.dequeue()!();
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
  async add<TaskResultsType>(fn: Task<TaskResultsType>) {
    return new Promise<TaskResultsType>((resolve, reject) => {
      const run = async (): Promise<void> => {
        // 未决的promise数量+1
        this.pendingCount++;
        try {
          // 执行传入的promise
          resolve(await Promise.resolve(fn()));
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
  async addAll<TaskResultsType>(fns: ReadonlyArray<Task<TaskResultsType>>) {
    return Promise.all(fns.map(async fn => this.add(fn)));
  }
  async onIdle() {
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
