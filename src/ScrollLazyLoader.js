import LazyLoader from './LazyLoader';

class ScrollLazyLoader {
  constructor(params) {
    const {
      body,
      sTop,
      wHeight
    } = params;

    this.body = body;
    this.sTop = sTop;
    this.wHeight = wHeight;
    this.loadPoint = sTop + wHeight;

    this.scrollHandler = () => {
      this.onScroller();
    }

    this.resizeHandler = () => {
      this.onResizer();
    }

    this.createHandler = (params) => {
      this.createLoader(params);
    }

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  static initiative() {
    const body = document.body || document.documentElement;
    const sTop = body ? body.scrollTop : 0;
    const wHeight = body ? body.clientHeight : 0;
    return new ScrollLazyLoader({ body, sTop, wHeight });
  }

  onScroller() {
    const ld = ScrollLazyLoader.lds[0] || null;
    if(!this.body || !ld) return;
    this.sTop = this.body.scrollTop;
    this.loadPoint = this.sTop + this.wHeight;

    this.loader(ld);
  }

  onResizer() {
    const ld = ScrollLazyLoader.lds[0] || null;
    if(!this.body || !ld) return;
    this.wHeight = this.body.clientHeight;
    this.loadPoint = this.sTop + this.wHeight;

    this.loader(ld);
  }

  createLoader(params) {
    const ld = LazyLoader.createLazyLoader(params);
    ScrollLazyLoader.lds.push(ld);

    if(ScrollLazyLoader.lds.length === 1) {
      this.loader(ld);
    }
  }

  loader(ld) {
    if(this.loadPoint < ld.sTop) return;
    if(ScrollLazyLoader.timer) clearTimeout(ScrollLazyLoader.timer);
    ld.load();

    ScrollLazyLoader.timer = setTimeout(() => {
      ScrollLazyLoader.chash.push(ld.src);
      ScrollLazyLoader.lds.shift();
      const _ld = ScrollLazyLoader.lds[0] || null;

      if(_ld) this.loader(_ld);
    }, 50);
  }

  clearLoader() {
    if(ScrollLazyLoader.timer) clearTimeout(ScrollLazyLoader.timer);
    if(!ScrollLazyLoader.lds.length) return;
    ScrollLazyLoader.lds = [];
  }
}

ScrollLazyLoader.timer = null;
ScrollLazyLoader.chash = [];
ScrollLazyLoader.lds = [];

export default ScrollLazyLoader;
