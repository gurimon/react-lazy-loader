'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ScrollLazyLoader = require('./ScrollLazyLoader');

var _ScrollLazyLoader2 = _interopRequireDefault(_ScrollLazyLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sl = _ScrollLazyLoader2.default.initiative();

exports.default = {
  createLoader: sl.createHandler,
  clearLoader: sl.clearLoader,
  chash: _ScrollLazyLoader2.default.chash
};