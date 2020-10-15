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

var Register = _express["default"].Router();

var registerData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, teacherData, studentsData, subjectData, classData, _iterator, _step, _i, studentsName, studentsEmail, _iterator2, _step2, _i2, insertTeacherData, teacherID, i, insertStudentsData, studentID, insertTeacherStudents, insertSubjectData, insertClassData, subjectID, classID, insertTeacherSubClass;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, teacherData = _req$body.teacher, studentsData = _req$body.students, subjectData = _req$body.subject, classData = _req$body["class"]; // ------- INPUT/REQ BODY VALIDATION --------

            _context.t0 = true;
            _context.next = _context.t0 === !teacherData.name ? 4 : _context.t0 === !teacherData.email ? 5 : _context.t0 === !studentsData ? 6 : _context.t0 === !studentsData.length ? 6 : _context.t0 === !Object.keys(studentsData).length ? 6 : _context.t0 === !subjectData.subjectCode ? 7 : _context.t0 === !subjectData.name ? 8 : _context.t0 === !classData.classCode ? 9 : _context.t0 === !classData.name ? 10 : 11;
            break;

          case 4:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's name input not found"
            }));

          case 5:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's email input not found"
            }));

          case 6:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Require at least one student (name and email) for registration"
            }));

          case 7:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject Code input not found"
            }));

          case 8:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject Name input not found"
            }));

          case 9:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Class Code input not found"
            }));

          case 10:
            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Error 400: Class Name not found"
            }));

          case 11:
            if ((0, _index.validateStringField)(teacherData.name)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's name must be alphabet only"
            }));

          case 13:
            if ((0, _index.validateEmailField)(teacherData.email)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Teacher's email must be in email format"
            }));

          case 15:
            //Check if there is 'name' and 'email' in student. Validate name and email format
            _iterator = _createForOfIteratorHelper(studentsData);
            _context.prev = 16;

            _iterator.s();

          case 18:
            if ((_step = _iterator.n()).done) {
              _context.next = 30;
              break;
            }

            _i = _step.value;

            if (_i.name) {
              _context.next = 22;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's name input not found"
            }));

          case 22:
            if (_i.email) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's email input not found"
            }));

          case 24:
            if ((0, _index.validateStringField)(_i.name)) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's name must be alphabet only"
            }));

          case 26:
            if ((0, _index.validateEmailField)(_i.email)) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Student's email must be in email format"
            }));

          case 28:
            _context.next = 18;
            break;

          case 30:
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](16);

            _iterator.e(_context.t1);

          case 35:
            _context.prev = 35;

            _iterator.f();

            return _context.finish(35);

          case 38:
            if ((0, _index.validateUniqueCodeName)(subjectData)) {
              _context.next = 40;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Subject Name and Subject Code cannot be the same"
            }));

          case 40:
            if ((0, _index.validateUniqueCodeName)(classData)) {
              _context.next = 42;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: "Class Name and Class Code cannot be the same"
            }));

          case 42:
            // ------- DATA CLEANING --------
            //lowercase names and emails for teacher & students
            (0, _index.lowerCaseNameEmail)(teacherData);
            studentsName = [];
            studentsEmail = [];
            _iterator2 = _createForOfIteratorHelper(studentsData);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _i2 = _step2.value;
                studentsName.push(_i2.name.toLowerCase());
                studentsEmail.push(_i2.email.toLowerCase());
              } //capitalize subject and class names, uppercase subject & class codes

            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            (0, _index.formatSubjectCode)(subjectData);
            (0, _index.formatClassCode)(classData); // ------- ACCESSING DB FOR DATA CREATION OR LOOKUP --------

            _context.prev = 49;
            _context.next = 52;
            return Teacher.findOrCreate({
              where: {
                email: teacherData.email
              },
              defaults: {
                name: teacherData.name
              } //finds the teacher by email (nonchangeable). if not found, create email and name from defaults data.

            });

          case 52:
            insertTeacherData = _context.sent;
            teacherID = insertTeacherData[0].dataValues.id;
            i = 0;

          case 55:
            if (!(i < studentsEmail.length)) {
              _context.next = 66;
              break;
            }

            _context.next = 58;
            return Student.findOrCreate({
              where: {
                email: studentsEmail[i]
              },
              defaults: {
                name: studentsName[i]
              }
            });

          case 58:
            insertStudentsData = _context.sent;
            studentID = insertStudentsData[0].dataValues.id;
            _context.next = 62;
            return Teacher_Student.findOrCreate({
              where: {
                teacherId: teacherID,
                studentId: studentID
              }
            });

          case 62:
            insertTeacherStudents = _context.sent;

          case 63:
            i++;
            _context.next = 55;
            break;

          case 66:
            _context.next = 68;
            return Subject.findOrCreate({
              where: {
                subjectCode: subjectData.subjectCode
              },
              defaults: {
                name: subjectData.name
              }
            });

          case 68:
            insertSubjectData = _context.sent;
            _context.next = 71;
            return TClass.findOrCreate({
              where: {
                classCode: classData.classCode
              },
              defaults: {
                name: classData.name
              }
            });

          case 71:
            insertClassData = _context.sent;
            subjectID = insertSubjectData[0].dataValues.id;
            classID = insertClassData[0].dataValues.id;
            _context.next = 76;
            return Teacher_Sub_Class.findOrCreate({
              where: {
                teacherId: teacherID,
                subjectId: subjectID,
                tclassId: classID
              }
            });

          case 76:
            insertTeacherSubClass = _context.sent;

            if (insertTeacherSubClass[0]._options.isNewRecord) {
              _context.next = 79;
              break;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.OK).json({
              status: _httpStatusCodes.OK,
              message: 'Record is already in the system'
            }));

          case 79:
            return _context.abrupt("return", res.sendStatus(_httpStatusCodes.NO_CONTENT));

          case 82:
            _context.prev = 82;
            _context.t2 = _context["catch"](49);
            (0, _index.errHandler)(_context.t2);

          case 85:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[16, 32, 35, 38], [49, 82]]);
  }));

  return function registerData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

Register.post('/register', registerData);
var _default = Register;
exports["default"] = _default;