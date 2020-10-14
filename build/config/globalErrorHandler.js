"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _httpStatusCodes = require("http-status-codes");

var _ErrorCodes = _interopRequireDefault(require("../const/ErrorCodes"));

var _ErrorBase = _interopRequireDefault(require("../errors/ErrorBase"));

var globalErrorHandler = function globalErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  } // Handling of body-parser content malformed error


  if (err.type === 'entity.parse.failed') {
    return res.status(_httpStatusCodes.BAD_REQUEST).send({
      errorCode: _ErrorCodes["default"].MALFORMED_JSON_ERROR_CODE,
      message: 'Malformed json'
    });
  }

  if (err instanceof _ErrorBase["default"]) {
    var error = err;
    return res.status(error.getHttpStatusCode()).send({
      errorCode: error.getErrorCode(),
      message: error.getMessage()
    });
  } else {
    return res.status(_httpStatusCodes.INTERNAL_SERVER_ERROR).send({
      errorCode: _ErrorCodes["default"].RUNTIME_ERROR_CODE,
      message: 'Internal Server Error'
    });
  }
};

var _default = globalErrorHandler;
exports["default"] = _default;