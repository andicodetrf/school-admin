"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _index = require("../utils/index");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var db = require('../config/db.config');

var Teacher = db.teacher;
var Student = db.student;
var Subject = db.subject;
var TClass = db.tclass;
var Teacher_Student = db.teacher_student;
var Teacher_Sub_Class = db.teacher_sub_class;

var Register = _express["default"].Router();

var registerData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var teacherData, studentsData, subjectData, classData, _iterator, _step, _i, studentsName, studentsEmail, _iterator2, _step2, _i2, insertTeacherData, teacherID, i, insertStudentsData, studentID, insertTeacherStudents, insertSubjectData, insertClassData, subjectID, classID, insertTeacherSubClass;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            teacherData = req.body.teacher;
            studentsData = req.body.students; //array

            subjectData = req.body.subject;
            classData = req.body["class"]; // ------- INPUT/REQ BODY VALIDATION --------

            _context.t0 = true;
            _context.next = _context.t0 === !teacherData.name ? 7 : _context.t0 === !teacherData.email ? 8 : _context.t0 === !studentsData ? 9 : _context.t0 === !studentsData.length ? 9 : _context.t0 === !Object.keys(studentsData).length ? 9 : _context.t0 === !subjectData.subjectCode ? 10 : _context.t0 === !subjectData.name ? 11 : _context.t0 === !classData.classCode ? 12 : _context.t0 === !classData.name ? 13 : 14;
            break;

          case 7:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Teacher's name input not found"
            }));

          case 8:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Teacher's email input not found"
            }));

          case 9:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Student's details not found"
            }));

          case 10:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Subject Code not found"
            }));

          case 11:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Subject Name not found"
            }));

          case 12:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Class Code not found"
            }));

          case 13:
            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Class Name not found"
            }));

          case 14:
            //Check if there is name' and 'email' in student object within students array
            _iterator = _createForOfIteratorHelper(studentsData);
            _context.prev = 15;

            _iterator.s();

          case 17:
            if ((_step = _iterator.n()).done) {
              _context.next = 25;
              break;
            }

            _i = _step.value;

            if (_i.name) {
              _context.next = 21;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Student's name not found"
            }));

          case 21:
            if (_i.email) {
              _context.next = 23;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "Error 400: Student's email not found"
            }));

          case 23:
            _context.next = 17;
            break;

          case 25:
            _context.next = 30;
            break;

          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](15);

            _iterator.e(_context.t1);

          case 30:
            _context.prev = 30;

            _iterator.f();

            return _context.finish(30);

          case 33:
            // ------- DATA CLEANING --------
            (0, _index.lowerCaseNameEmail)(teacherData);
            studentsName = [];
            studentsEmail = [];
            _iterator2 = _createForOfIteratorHelper(studentsData);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _i2 = _step2.value;
                studentsName.push(_i2.name.toLowerCase());
                studentsEmail.push(_i2.email.toLowerCase());
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            (0, _index.formatSubjectCode)(subjectData);
            (0, _index.formatClassCode)(classData); // ------- ACCESSING DB FOR DATA CREATION OR LOOKUP --------

            _context.prev = 40;
            _context.next = 43;
            return Teacher.findOrCreate({
              where: {
                email: teacherData.email
              },
              defaults: {
                name: teacherData.name
              } //finds the teacher by email (nonchangeable). if not found, create email and name data.

            });

          case 43:
            insertTeacherData = _context.sent;
            teacherID = insertTeacherData[0].dataValues.id;
            i = 0;

          case 46:
            if (!(i < studentsEmail.length)) {
              _context.next = 57;
              break;
            }

            _context.next = 49;
            return Student.findOrCreate({
              where: {
                email: studentsEmail[i],
                name: studentsName[i]
              }
            });

          case 49:
            insertStudentsData = _context.sent;
            studentID = insertStudentsData[0].dataValues.id;
            _context.next = 53;
            return Teacher_Student.findOrCreate({
              where: {
                teacherId: teacherID,
                studentId: studentID
              }
            });

          case 53:
            insertTeacherStudents = _context.sent;

          case 54:
            i++;
            _context.next = 46;
            break;

          case 57:
            _context.next = 59;
            return Subject.findOrCreate({
              where: {
                subjectCode: subjectData.subjectCode,
                name: subjectData.name
              }
            });

          case 59:
            insertSubjectData = _context.sent;
            _context.next = 62;
            return TClass.findOrCreate({
              where: {
                classCode: classData.classCode,
                name: classData.name
              }
            });

          case 62:
            insertClassData = _context.sent;
            subjectID = insertSubjectData[0].dataValues.id;
            classID = insertClassData[0].dataValues.id;
            _context.next = 67;
            return Teacher_Sub_Class.findOrCreate({
              where: {
                teacherId: teacherID,
                subjectId: subjectID,
                tclassId: classID
              }
            });

          case 67:
            insertTeacherSubClass = _context.sent;
            return _context.abrupt("return", res.status(200).send({
              message: '200: Success'
            }));

          case 71:
            _context.prev = 71;
            _context.t2 = _context["catch"](40);
            (0, _index.errHandler)(_context.t2);

          case 74:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 27, 30, 33], [40, 71]]);
  }));

  return function registerData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

Register.post('/register', registerData);
var _default = Register;
exports["default"] = _default;