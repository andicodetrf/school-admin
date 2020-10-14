"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv/config");

var _database = _interopRequireDefault(require("./config/database"));

var _logger = _interopRequireDefault(require("./config/logger"));

var _app = _interopRequireDefault(require("./app"));

var MAX_RETRY = 20;
var LOG = new _logger["default"]('server.js');
var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 3000 : _process$env$PORT;

var startApplication = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(retryCount) {
    var nextRetryCount;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _database["default"].authenticate();

          case 3:
            _app["default"].listen(PORT, function () {
              LOG.info("Application started at http://localhost:".concat(PORT));
            });

            _context2.next = 14;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            LOG.error(_context2.t0);
            nextRetryCount = retryCount - 1;

            if (!(nextRetryCount > 0)) {
              _context2.next = 13;
              break;
            }

            setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return startApplication(nextRetryCount);

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), 3000);
            return _context2.abrupt("return");

          case 13:
            LOG.error('Unable to start application');

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 6]]);
  }));

  return function startApplication(_x) {
    return _ref.apply(this, arguments);
  };
}();

startApplication(MAX_RETRY);