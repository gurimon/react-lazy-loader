"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LazyLoader = function () {
  function LazyLoader(params) {
    _classCallCheck(this, LazyLoader);

    var id = params.id;
    var img = params.img;
    var src = params.src;
    var sTop = params.sTop;
    var callback = params.callback;


    this.id = id;
    this.img = img;
    this.src = src;
    this.sTop = sTop;
    this.callback = callback;
  }

  _createClass(LazyLoader, [{
    key: "load",
    value: function load() {
      var _this = this;

      this.img.onload = this.img.onerror = this.img.onabort = function () {
        _this.callback({ id: _this.id, src: _this.src });
      };

      this.img.src = this.src;
    }
  }], [{
    key: "createLazyLoader",
    value: function createLazyLoader(_ref) {
      var id = _ref.id;
      var src = _ref.src;
      var sTop = _ref.sTop;
      var callback = _ref.callback;

      var img = new Image();
      return new LazyLoader({ id: id, img: img, src: src, sTop: sTop, callback: callback });
    }
  }]);

  return LazyLoader;
}();

exports.default = LazyLoader;