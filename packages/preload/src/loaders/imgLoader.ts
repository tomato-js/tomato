/**
 * @packageDocumentation
 * @module @tomato-js/preload
 */
import { BaseLoader } from "./baseLoader";
/**
 * ImageLoader类
 *
 * 新增于v0.0.24
 */
export class ImageLoader extends BaseLoader {
  private imageLoaded: boolean;
  constructor() {
    super("image");
    this.imageLoaded = false;
  }
  protected dispatchComplete() {
    if (this.imageLoaded) {
      super.dispatchComplete();
    }
  }
  private createAndLoadImage(url: string) {
    this.content = new Image();
    this.content.onload = this.onImageLoadComplete.bind(this);
    this.content.onerror = this.onImageLoadFail.bind(this);
    this.content.src = url;
  }
  private onImageLoadComplete() {
    this.imageLoaded = true;
    this.dispatchComplete();
  }
  private onImageLoadFail() {
    this.dispatchError("Image failed to load");
  }
  public load(url: string) {
    this.createAndLoadImage(url);
  }
}
