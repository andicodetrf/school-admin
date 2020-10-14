"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var sequelize = require("sequelize");

module.exports = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var Teacher, errHandler, teacherTest;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // const Teacher = require("../../database/model/teacher.model")
          Teacher = sequelize["import"]("../../database/model/teacher.model"); //create an error handler

          errHandler = function errHandler(err) {
            console.error("Error: ", err);
          }; //its gonna return a promise to us - if a data is created or error


          _context.next = 4;
          return Teacher.create({
            name: "teacherOne",
            email: "t1@gmail.com"
          })["catch"](errHandler);

        case 4:
          teacherTest = _context.sent;
          return _context.abrupt("return", teacherTest);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));