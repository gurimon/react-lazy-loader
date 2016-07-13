class LazyLoader {
  constructor(params) {
    const {
      img,
      src,
      sTop,
      callback
    } = params;

    this.img = img;
    this.src = src;
    this.sTop = sTop;
    this.callback = callback;
  }

  static createLazyLoader({ src, sTop, callback }) {
    const img = new Image();
    return new LazyLoader({ img, src, sTop, callback });
  }

  load() {
    this.img.onload = this.img.onerror = this.img.onabort = () => {
      this.callback({ src: this.src });
    }

    this.img.src = this.src;
  }
}

export default LazyLoader;
