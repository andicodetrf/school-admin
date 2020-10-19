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

// const db = require('../config/db.config');
// const Teacher = db.teacher;
var HealthcheckController = _express["default"].Router(); // const healthcheckHandler = async (req, res) => {
//   try{
//     let foundTeachers = await Teacher.findAll()
//     if(foundTeachers){
//       // console.log(foundTeachers)
//       return res.status(OK).json({
//         status: OK,
//         foundTeachers
//       })
//     }
//   } catch (err){
//     errHandler(err)
//   }
// }


var healthcheckHandler = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            return _context.abrupt("return", res.status(_httpStatusCodes.OK).json({
              status: _httpStatusCodes.OK
            }));

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            (0, _index.errHandler)(_context.t0);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 4]]);
  }));

  return function healthcheckHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

HealthcheckController.get('/healthcheck', healthcheckHandler);
var _default = HealthcheckController;
exports["default"] = _default;