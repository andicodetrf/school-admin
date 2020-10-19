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

var _httpStatusCodes = require("http-status-codes");

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
var Student_Class = db.student_class;

var Register = _express["default"].Router();

var registerData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, teacherData, studentsData, subjectData, classData, _iterator, _step, _i2, studentsName, studentsEmail, _iterator2, _step2, _i3, insertTeacherData, teacherID, i, insertStudentsData, studentID, insertSubjectData, insertClassData, subjectID, classID, insertTeacherSubClass, _i, findStudent, _studentID;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, teacherData = _req$body.teacher, studentsData = _req$body.students, subjectData = _req$body.subject, classData = _req$body["class"]; // ------- INPUT/REQ BODY VALIDATION --------

            _context.t0 = true;
            _context.next = _context.t0 === !teacherData ? 4 : _context.t0 === !teacherData.name ? 5 : _context.t0 === !teacherData.email ? 6 : _context.t0 === !studentsData ? 7 : _context.t0 === !studentsData.length ? 7 : _context.t0 === !Object.keys(studentsData).length ? 7 : _context.t0 === !subjectData ? 8 : _context.t0 === !subjectData.subjectCode ? 9 : _context.t0 === !subjectData.name ? 10 : _context.t0 === !classData ? 11 : _context.t0 === !classData.classCode ? 12 : _context.t0 === !classData.name ? 13 : 14;
            break;

          case 4:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher input not found. Require teacher with name and email"
            }));

          case 5:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's name input not found"
            }));

          case 6:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's email input not found"
            }));

          case 7:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Require at least one student (name and email) for registration"
            }));

          case 8:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject input not found. Require subject with subjectCode and name"
            }));

          case 9:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject Code input not found"
            }));

          case 10:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject Name input not found"
            }));

          case 11:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Class input not found. Require class with classCode and name"
            }));

          case 12:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Class Code input not found"
            }));

          case 13:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Class Name not found"
            }));

          case 14:
            if ((0, _index.validateStringField)(teacherData.name)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's name must be alphabet only"
            }));

          case 16:
            if ((0, _index.validateEmailField)(teacherData.email)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's email must be in email format"
            }));

          case 18:
            //Check if there is 'name' and 'email' in student. Validate name and email format
            _iterator = _createForOfIteratorHelper(studentsData);
            _context.prev = 19;

            _iterator.s();

          case 21:
            if ((_step = _iterator.n()).done) {
              _context.next = 33;
              break;
            }

            _i2 = _step.value;

            if (_i2.name) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's name input not found"
            }));

          case 25:
            if (_i2.email) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's email input not found"
            }));

          case 27:
            if ((0, _index.validateStringField)(_i2.name)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's name must be alphabet only"
            }));

          case 29:
            if ((0, _index.validateEmailField)(_i2.email)) {
              _context.next = 31;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's email must be in email format"
            }));

          case 31:
            _context.next = 21;
            break;

          case 33:
            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](19);

            _iterator.e(_context.t1);

          case 38:
            _context.prev = 38;

            _iterator.f();

            return _context.finish(38);

          case 41:
            if ((0, _index.validateUniqueCodeName)(subjectData)) {
              _context.next = 43;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject Name and Subject Code cannot be the same"
            }));

          case 43:
            if ((0, _index.validateUniqueCodeName)(classData)) {
              _context.next = 45;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Class Name and Class Code cannot be the same"
            }));

          case 45:
            // ------- DATA CLEANING --------
            //lowercase names and emails for teacher & students
            (0, _index.lowerCaseNameEmail)(teacherData);
            studentsName = [];
            studentsEmail = [];
            _iterator2 = _createForOfIteratorHelper(studentsData);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _i3 = _step2.value;
                studentsName.push(_i3.name.toLowerCase());
                studentsEmail.push(_i3.email.toLowerCase());
              } //capitalize subject and class names, uppercase subject & class codes

            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            (0, _index.formatSubjectCode)(subjectData);
            (0, _index.formatClassCode)(classData); // ------- ACCESSING DB FOR DATA CREATION OR LOOKUP --------

            _context.prev = 52;
            _context.next = 55;
            return Teacher.findOrCreate({
              where: {
                email: teacherData.email
              },
              defaults: {
                name: teacherData.name
              } //finds the teacher by email (nonchangeable). if not found, create email and name from defaults data.

            });

          case 55:
            insertTeacherData = _context.sent;
            teacherID = insertTeacherData[0].dataValues.id; //create relationship between Teachers and Students

            i = 0;

          case 58:
            if (!(i < studentsEmail.length)) {
              _context.next = 68;
              break;
            }

            _context.next = 61;
            return Student.findOrCreate({
              where: {
                email: studentsEmail[i]
              },
              defaults: {
                name: studentsName[i]
              }
            });

          case 61:
            insertStudentsData = _context.sent;
            studentID = insertStudentsData[0].dataValues.id;
            _context.next = 65;
            return Teacher_Student.findOrCreate({
              where: {
                teacherId: teacherID,
                studentId: studentID
              }
            });

          case 65:
            i++;
            _context.next = 58;
            break;

          case 68:
            _context.next = 70;
            return Subject.findOrCreate({
              where: {
                subjectCode: subjectData.subjectCode
              },
              defaults: {
                name: subjectData.name
              }
            });

          case 70:
            insertSubjectData = _context.sent;
            _context.next = 73;
            return TClass.findOrCreate({
              where: {
                classCode: classData.classCode
              },
              defaults: {
                name: classData.name
              }
            });

          case 73:
            insertClassData = _context.sent;
            subjectID = insertSubjectData[0].dataValues.id;
            classID = insertClassData[0].dataValues.id; //create relationship between Teachers, Subjects and Classes

            _context.next = 78;
            return Teacher_Sub_Class.findOrCreate({
              where: {
                teacherId: teacherID,
                subjectId: subjectID,
                tclassId: classID
              }
            });

          case 78:
            insertTeacherSubClass = _context.sent;
            _i = 0;

          case 80:
            if (!(_i < studentsEmail.length)) {
              _context.next = 90;
              break;
            }

            _context.next = 83;
            return Student.findAll({
              where: {
                email: studentsEmail[_i]
              }
            });

          case 83:
            findStudent = _context.sent;
            _studentID = findStudent[0].dataValues.id;
            _context.next = 87;
            return Student_Class.findOrCreate({
              where: {
                studentId: _studentID,
                tclassId: classID
              }
            });

          case 87:
            _i++;
            _context.next = 80;
            break;

          case 90:
            if (insertTeacherSubClass[0]._options.isNewRecord) {
              _context.next = 92;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.OK).json({
              status: _httpStatusCodes.OK,
              message: 'Record is already in the system'
            }));

          case 92:
            return _context.abrupt("return", res.sendStatus(_httpStatusCodes.NO_CONTENT));

          case 95:
            _context.prev = 95;
            _context.t2 = _context["catch"](52);
            (0, _index.errHandler)(_context.t2);

          case 98:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[19, 35, 38, 41], [52, 95]]);
  }));

  return function registerData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

Register.post('/register', registerData);
var _default = Register;
exports["default"] = _default;