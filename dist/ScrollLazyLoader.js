'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LazyLoader = require('./LazyLoader');

var _LazyLoader2 = _interopRequireDefault(_LazyLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollLazyLoader = function () {
  function ScrollLazyLoader(params) {
    var _this = this;

    _classCallCheck(this, ScrollLazyLoader);

    var body = params.body;
    var sTop = params.sTop;
    var wHeight = params.wHeight;


    this.body = body;
    this.sTop = sTop;
    this.wHeight = wHeight;
    this.loadPoint = sTop + wHeight;

    this.scrollHandler = function () {
      _this.onScroller();
    };

    this.resizeHandler = function () {
      _this.onResizer();
    };

    this.createHandler = function (params) {
      _this.createLoader(params);
    };

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  _createClass(ScrollLazyLoader, [{
    key: 'onScroller',
    value: function onScroller() {
      var ld = ScrollLazyLoader.lds[0] || null;
      if (!this.body || !ld) return;
      this.sTop = this.body.scrollTop;
      this.loadPoint = this.sTop + this.wHeight;

      this.loader(ld);
    }
  }, {
    key: 'onResizer',
    value: function onResizer() {
      var ld = ScrollLazyLoader.lds[0] || null;
      if (!this.body || !ld) return;
      this.wHeight = this.body.clientHeight;
      this.loadPoint = this.sTop + this.wHeight;

      this.loader(ld);
    }
  }, {
    key: 'createLoader',
    value: function createLoader(params) {
      var ld = _LazyLoader2.default.createLazyLoader(params);
      ScrollLazyLoader.lds.push(ld);

      if (ScrollLazyLoader.lds.length === 1) {
        this.loader(ld);
      }
    }
  }, {
    key: 'loader',
    value: function loader(ld) {
      var _this2 = this;

      if (this.loadPoint < ld.sTop) return;
      if (ScrollLazyLoader.timer) clearTimeout(ScrollLazyLoader.timer);
      ld.load();

      ScrollLazyLoader.timer = setTimeout(function () {
        ScrollLazyLoader.chash.push(ld.src);
        ScrollLazyLoader.lds.shift();
        var _ld = ScrollLazyLoader.lds[0] || null;

        if (_ld) _this2.loader(_ld);
      }, 50);
    }
  }, {
    key: 'clearLoader',
    value: function clearLoader() {
      if (ScrollLazyLoader.timer) clearTimeout(ScrollLazyLoader.timer);
      if (!ScrollLazyLoader.lds.length) return;
      ScrollLazyLoader.lds = [];
    }
  }], [{
    key: 'initiative',
    value: function initiative() {
      var body = document.body || document.documentElement;
      var sTop = body ? body.scrollTop : 0;
      var wHeight = body ? body.clientHeight : 0;
      return new ScrollLazyLoader({ body: body, sTop: sTop, wHeight: wHeight });
    }
  }]);

  return ScrollLazyLoader;
}();

ScrollLazyLoader.timer = null;
ScrollLazyLoader.chash = [];
ScrollLazyLoader.lds = [];

exports.default = ScrollLazyLoader;