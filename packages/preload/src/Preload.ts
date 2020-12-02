/**
 * @packageDocumentation
 * @module @tomato-js/preload
 */
import { Events } from "@tomato-js/events";
import { isNil } from "@tomato-js/shared";
import { ImageLoader } from "./loaders/imgLoader";
import { getExtension } from "@tomato-js/string";

type Options = {};

type Loaders = typeof ImageLoader;

const LOADERS_STRATEGY: { [name: string]: Loaders } = {
  png: ImageLoader,
  jpg: ImageLoader,
  jpeg: ImageLoader,
  webp: ImageLoader,
  gif: ImageLoader
};
/**
 * 预加载类，目前只支持image类型
 *
 * 新增于v0.0.24
 *
 * 脚本举例
 * ```
 *   import { Preload } from '@tomato-js/preload';
 *   const p = new Preload();
 *   p.on('complete',()=>console.log('finished'));
 *   p.add('1.png')
 *   p.add('2.jpg')
 *   p.add('3.webp')
 *   p.load()//开始加载
 *   //加载完成后finished
 * ```
 */
export class Preload extends Events {
  private loaders: {
    [url: string]: ImageLoader;
  };
  private urls: string[];
  private loading: boolean;
  private loadIdx: number;
  private status: {
    [url: string]: boolean;
  };
  constructor(options?: Options) {
    super();

    this.loaders = {};
    this.urls = [];
    this.loading = false;
    this.loadIdx = 0;
    this.status = {};
  }
  private getLoader(url: string) {
    const extension = getExtension(url);
    if (isNil(extension)) return;
    const loader = LOADERS_STRATEGY[extension.toLowerCase()];
    return loader;
  }
  private initLoader(url: string, loader: Loaders) {
    if (!this.loaders[url]) {
      this.loaders[url] = new loader();
      this.urls.push(url);
    }
  }
  private continueLoadQueue() {
    if (this.loadIdx < this.urls.length) {
      const url = this.urls[this.loadIdx];
      const loader = this.loaders[url];
      this.status[url] = false;

      this.loadIdx++;
      loader.once("error", this.onLoadError.bind(this, url));
      loader.once("complete", this.onLoadComplete.bind(this, url));
      loader.load(url);
    } else if (this.checkComplete()) {
      this.emit("complete");
    }
  }
  private checkComplete() {
    let loaded = true;
    for (let url of this.urls) {
      if (!this.status[url]) loaded = false;
    }
    return loaded;
  }
  private onLoadError(url: string, error: string) {
    console.warn("Couldn't load " + url + " received the error: " + error);
    this.status[url] = true;
    this.continueLoadQueue();
  }
  private onLoadComplete(url: string) {
    this.status[url] = true;
    this.continueLoadQueue();
  }
  /**
   * 将资源加入加载列表
   *
   * 新增于v0.0.24
   *
   * 脚本举例
   * ```
   *   import { Preload } from '@tomato-js/preload';
   *   const p = new Preload();
   *   p.on('complete',()=>console.log('finished'));
   *   p.add('1.png')
   *   p.add('2.jpg')
   *   p.add('3.webp')
   *   p.load()//开始加载
   *   //加载完成后finished
   * ```
   */
  public add(url: string) {
    if (isNil(url)) return;
    const loader = this.getLoader(url);
    if (isNil(loader)) return;
    this.initLoader(url, loader);
  }
  /**
   * 将图片资源加入加载列表
   *
   * 新增于v0.0.24
   *
   * 脚本举例
   * ```
   *   import { Preload } from '@tomato-js/preload';
   *   const p = new Preload();
   *   p.on('complete',()=>console.log('finished'));
   *   p.addImage('1.png')
   *   p.addImage('2.jpg')
   *   p.addImage('3.webp')
   *   p.load()//开始加载
   *   //加载完成后finished
   * ```
   */
  public addImage(url: string) {
    if (isNil(url)) return;
    this.initLoader(url, ImageLoader);
  }
  /**
   * 开始加载
   *
   * 新增于v0.0.24
   *
   * 脚本举例
   * ```
   *   import { Preload } from '@tomato-js/preload';
   *   const p = new Preload();
   *   p.on('complete',()=>console.log('finished'));
   *   p.add('1.png')
   *   p.add('2.jpg')
   *   p.add('3.webp')
   *   p.load()//开始加载
   *   //加载完成后finished
   * ```
   */
  public load() {
    if (this.loading) return;
    for (const url of this.urls) {
      this.continueLoadQueue();
    }
  }
}
