/**
 * @packageDocumentation
 * @module @tomato-js/preload
 */
import { Events } from "@tomato-js/events";
/**
 * Loader基类
 *
 * 新增于v0.0.24
 */
export class BaseLoader extends Events {
  protected content: HTMLImageElement | null;
  constructor(loadType: string) {
    super();
    this.content = null;
  }
  protected dispatchComplete() {
    this.emit("complete", this.content);
  }
  protected dispatchError(msg: string) {
    this.emit("error", msg);
  }
}
