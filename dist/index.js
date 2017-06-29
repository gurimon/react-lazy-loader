'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * LazyLoad
 * 画像遅延読み込み
 * NOTE: findDOMNodeで現在の位置を取得しているので親要素でposition: xxx;を指定してしまうと位置が取得できないので注意してください。
 *
 * import LazyLoad from 'react-lazy-loader/index'
 * <Lazyload src={ 画像パス }>
 * 　　表示したいコンポーネント
 * </LazyLoad>
 */

var LazyLoad = function (_Component) {
  _inherits(LazyLoad, _Component);

  function LazyLoad(props) {
    _classCallCheck(this, LazyLoad);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LazyLoad).call(this, props));

    _this.state = {
      src: null,
      isLoaded: false
    };
    return _this;
  }

  _createClass(LazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.isLoaded) return;
      var _props = this.props;
      var src = _props.src;
      var defaultSrc = _props.defaultSrc;
      // 要素の位置取得

      var sTop = (0, _reactDom.findDOMNode)(this).offsetTop;
      // 既に読み込まれていたら
      var isChash = _loader2.default.chash.indexOf(src) >= 0;
      if (isChash) return this._onLoad({ src: src });

      _loader2.default.createLoader({
        src: src,
        dSrc: defaultSrc,
        sTop: sTop,
        callback: function callback(src) {
          return _this2._onLoad(src);
        }
      });
    }

    // コンポーネントが削除された場合、遅延読み込みをリセット

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _loader2.default.clearLoader();
    }
  }, {
    key: '_onLoad',
    value: function _onLoad(_ref) {
      var src = _ref.src;

      this.setState({ src: src, isLoaded: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          style: this.props.style,
          className: this.props.className ? 'lazyload ' + this.props.className : 'lazyload',
          onTouchTap: this.props.onClick
        },
        _react2.default.createElement(
          'div',
          {
            className: this.state.isLoaded ? 'lazyload__inner lazyload__inner--show' : 'lazyload__inner'
          },
          this.state.src && this.props.children ? this.props.children : this.state.src ? _react2.default.createElement('img', { src: this.state.src }) : null
        )
      );
    }
  }]);

  return LazyLoad;
}(_react.Component);

;

LazyLoad.propTypes = {
  className: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  src: _react.PropTypes.string,
  defaultSrc: _react.PropTypes.string,
  style: _react.PropTypes.object
};

LazyLoad.defaultProps = {
  className: '',
  onClick: null,
  src: '',
  style: {}
};

exports.default = LazyLoad;