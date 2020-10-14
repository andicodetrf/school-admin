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

var db = require('../config/db.config');

var Teacher = db.teacher;
var Student = db.student;
var Subject = db.subject;
var TClass = db.tclass;

var HealthcheckController = _express["default"].Router();

var errHandler = function errHandler(err) {
  console.error('Error: ', err);
};

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
              _context.next = 7;
              break;
            }

            console.log(foundTeachers);
            return _context.abrupt("return", res.status(200).json(foundTeachers));

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            errHandler(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function healthcheckHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // const healthCheckAdd = async (req, res) => {
//   try{
// //CREATE DATA
// const addTeacher = {
//   name: 'TeacherOne',
//   email: 'T_ONEgmail.com'
// }
// // const addStudentOne = {
// //   name: 'StudentOne',
// //   email: 'St_One@gmail.com'
// // }
// // const addStudentTwo = {
// //   name: 'StudentTwo',
// //   email: 'St_Two@gmail.com'
// // }
// let { name, email } = addTeacher;
// //INSERT INTO TABLE. gonna return a promise
// await Teacher.create({
//   name,
//   email
// })
// await Student.bulkCreate([addStudentOne, addStudentTwo ])
// await Subject.create({
//   subjectName: 'English',
//   subjectCode: 'ENG'
// })
// await TClass.create({
//   className: 'P1-Integrity',
//   classCode: 'P1-I'
// })
// res.redirect('/api/healthcheck')
//   } catch(err){
//     errHandler(err)
//     res.sendStatus(400)
//   }
// }


HealthcheckController.get('/healthcheck', healthcheckHandler); // HealthcheckController.get('/healthcheck/add', healthCheckAdd);

var _default = HealthcheckController;
exports["default"] = _default;