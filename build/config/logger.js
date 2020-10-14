"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _winston = require("winston");

var colorize = _winston.format.colorize,
    combine = _winston.format.combine,
    metadata = _winston.format.metadata,
    timestamp = _winston.format.timestamp,
    printf = _winston.format.printf;
var _process$env$LOG_LEVE = process.env.LOG_LEVEL,
    LOG_LEVEL = _process$env$LOG_LEVE === void 0 ? 'info' : _process$env$LOG_LEVE;
/**
 * this customFormat will format the text and color only ERROR message to red
 */

var customFormat = printf(function (info) {
  var message = "".concat(info.timestamp, "\t[").concat(info.metadata.filename, "]\t").concat(info.level, "\t").concat(info.message);

  if (info.level === 'ERROR' || info.level === 'WARN') {
    return colorize({
      level: true
    }).colorize(info.level.toLowerCase(), message);
  }

  return message;
});
var changeLevelToUpperCase = (0, _winston.format)(function (info) {
  info.level = info.level.toUpperCase();
  return info;
});
var appLogger = (0, _winston.createLogger)({
  level: LOG_LEVEL,
  exitOnError: false,
  format: combine(changeLevelToUpperCase(), metadata(), timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), customFormat),
  transports: [new _winston.transports.Console()]
});

var Logger = /*#__PURE__*/function () {
  function Logger(filename) {
    (0, _classCallCheck2["default"])(this, Logger);
    this.filename = filename;
  }

  (0, _createClass2["default"])(Logger, [{
    key: "error",
    value: function error(message) {
      appLogger.error(message, {
        filename: this.filename
      });
    }
  }, {
    key: "warn",
    value: function warn(message) {
      appLogger.warn(message, {
        filename: this.filename
      });
    }
  }, {
    key: "info",
    value: function info(message) {
      appLogger.info(message, {
        filename: this.filename
      });
    }
  }, {
    key: "verbose",
    value: function verbose(message) {
      appLogger.verbose(message, {
        filename: this.filename
      });
    }
  }, {
    key: "debug",
    value: function debug(message) {
      appLogger.debug(message, {
        filename: this.filename
      });
    }
  }, {
    key: "silly",
    value: function silly(message) {
      appLogger.silly(message, {
        filename: this.filename
      });
    }
  }, {
    key: "log",
    value: function log(level, message) {
      appLogger.log(level, message, {
        filename: this.filename
      });
    }
  }]);
  return Logger;
}();

var _default = Logger;
exports["default"] = _default;