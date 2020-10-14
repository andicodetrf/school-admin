"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _router = _interopRequireDefault(require("./router"));

var _globalErrorHandler = _interopRequireDefault(require("./config/globalErrorHandler"));

var App = (0, _express["default"])();
App.use((0, _compression["default"])());
App.use((0, _cors["default"])());
App.use(_bodyParser["default"].json());
App.use(_bodyParser["default"].urlencoded({
  extended: true
}));
App.use('/api', _router["default"]);
App.use(_globalErrorHandler["default"]);
var _default = App;
exports["default"] = _default;