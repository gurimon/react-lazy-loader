'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  position: 'absolute',
  width: '25%',
  maxWidth: 200,
  margin: '-13% auto',
  top: '50%',
  left: 0,
  right: 0
};

var LoadingElement = function LoadingElement(props) {
  return _react2.default.createElement(
    'div',
    { style: { position: 'relative', width: '100%', height: '100%' } },
    _react2.default.createElement('img', { style: style, src: './images/loading.gif' })
  );
};

exports.default = LoadingElement;