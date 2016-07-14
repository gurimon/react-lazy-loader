'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _loadingElement = require('./loading-element');

var _loadingElement2 = _interopRequireDefault(_loadingElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LazyLoad = _react2.default.createClass({
  displayName: 'LazyLoad',
  getDefaultProps: function getDefaultProps() {
    return {
      isLoad: true,
      src: "",
      defaultSrc: ""
    };
  },
  getInitialState: function getInitialState() {
    return {
      src: null,
      isLoaded: false,
      isError: false
    };
  },
  componentDidMount: function componentDidMount() {
    if (!this.isMounted()) return;
    var src = this.props.src;
    var defaultSrc = this.props.defaultSrc;
    // 要素の位置取得
    var sTop = this.getDOMNode().getBoundingClientRect().top || 0;
    // 既に読み込まれていたら
    var isChash = _loader2.default.chash.indexOf(src) >= 0;
    if (isChash) return this._onLoad({ src: src });

    _loader2.default.createLoader({ src: src, dSrc: defaultSrc, sTop: sTop, callback: this._onLoad });
  },


  // コンポーネントが削除された場合、遅延読み込みをリセット
  componentWillUnmount: function componentWillUnmount() {
    _loader2.default.clearLoader();
  },
  _onLoad: function _onLoad(_ref) {
    var src = _ref.src;

    if (!this.isMounted()) return;
    this.setState({ src: src });
  },
  loadHandler: function loadHandler() {
    if (!this.isMounted()) return;
    this.setState({ isLoaded: true });
  },
  errorHander: function errorHander() {
    if (!this.isMounted()) return;
    this.setState({ isError: true, isLoaded: true });
  },
  render: function render() {
    if (!this.state.src && this.props.isLoad) return _react2.default.createElement(_loadingElement2.default, null);

    return _react2.default.createElement(
      'div',
      { className: 'lazyLoader' },
      !this.state.isError && this.state.src ? _react2.default.createElement('img', { onLoad: this.loadHandler, onError: this.errorHander, src: this.state.src }) : null
    );
  }
});

exports.default = LazyLoad;