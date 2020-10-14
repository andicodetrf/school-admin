"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _httpStatusCodes = require("http-status-codes");

var _index = require("../utils/index");

var db = require('../config/db.config');

var Teacher = db.teacher;

var HealthcheckController = _express["default"].Router();

var healthcheckHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var foundTeachers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Teacher.findAll();

          case 3:
            foundTeachers = _context.sent;

            if (!foundTeachers) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.OK).json({
              status: _httpStatusCodes.OK,
              foundTeachers: foundTeachers
            }));

          case 6:
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            (0, _index.errHandler)(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function healthcheckHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

HealthcheckController.get('/healthcheck', healthcheckHandler);
var _default = HealthcheckController;
exports["default"] = _default;