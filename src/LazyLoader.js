class LazyLoader {
  constructor(params) {
    const {
      id,
      img,
      src,
      sTop,
      callback
    } = params;

    this.id = id;
    this.img = img;
    this.src = src;
    this.sTop = sTop;
    this.callback = callback;
  }

  static createLazyLoader({ id, src, sTop, callback }) {
    const img = new Image();
    return new LazyLoader({ id, img, src, sTop, callback });
  }

  load() {
    this.img.onload = this.img.onerror = this.img.onabort = () => {
      this.callback({ id: this.id, src: this.src });
    }

    this.img.src = this.src;
  }
}

export default LazyLoader;
