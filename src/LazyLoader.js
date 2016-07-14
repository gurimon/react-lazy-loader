class LazyLoader {
  constructor(params) {
    const {
      img,
      src,
      dSrc,
      sTop,
      callback
    } = params;

    this.img = img;
    this.src = src;
    this.dSrc = dSrc;
    this.sTop = sTop;
    this.callback = callback;
  }

  static createLazyLoader({ src, dSrc, sTop, callback }) {
    const img = new Image();
    return new LazyLoader({ img, src, dSrc, sTop, callback });
  }

  load() {
    this.img.onload = () => {
      this.callback({ src: this.src });
    }

    this.img.onerror = this.img.onabort = () => {
      this.callback({ src: this.dSrc });
    }

    this.img.src = this.src;
  }
}

export default LazyLoader;
