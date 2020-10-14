"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../utils/index");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import Express from 'express';
var db = require('../config/db.config');

var Teacher = db.teacher; // const Student = db.student;

var Subject = db.subject;
var TClass = db.tclass; // const Teacher_Student = db.teacher_student;
// const Teacher_Sub_Class = db.teacher_sub_class;

// const Workload = Express.Router();
var generateReport = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var teachers, teachersIDArr, teachersNameArr, teachersData, _iterator, _step, _i, teachersSubsClass, workload, h, sub, i, o;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Teacher.findAll({});

          case 2:
            teachers = _context.sent;
            teachersIDArr = teachers.map(function (t) {
              return t.id;
            });
            teachersNameArr = teachers.map(function (t) {
              return t.name;
            });
            teachersData = [];
            _iterator = _createForOfIteratorHelper(teachersIDArr);
            _context.prev = 7;

            _iterator.s();

          case 9:
            if ((_step = _iterator.n()).done) {
              _context.next = 17;
              break;
            }

            _i = _step.value;
            _context.next = 13;
            return Teacher.findAll({
              where: {
                id: _i
              },
              include: [{
                model: Subject,
                as: 'subject',
                include: [{
                  model: TClass,
                  as: 'tclass',
                  through: {
                    where: {
                      teacherId: _i
                    }
                  }
                }]
              }]
            });

          case 13:
            teachersSubsClass = _context.sent;
            teachersData.push(teachersSubsClass);

          case 15:
            _context.next = 9;
            break;

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](7);

            _iterator.e(_context.t0);

          case 22:
            _context.prev = 22;

            _iterator.f();

            return _context.finish(22);

          case 25:
            workload = {};

            for (h = 0; h < teachersData.length; h++) {
              sub = [];

              for (i = 0; i < teachersData[h][0].subject.length; i++) {
                console.log(teachersData[h][0].subject[i].subjectCode);
                console.log(teachersData[h][0].subject[i].tclass.length);
                o = {};
                o['subjectCode'] = teachersData[h][0].subject[i].subjectCode;
                o['subjectName'] = teachersData[h][0].subject[i].name;
                o['numberOfClasses'] = teachersData[h][0].subject[i].tclass.length;
                sub.push(o);
              }

              workload[teachersNameArr[h]] = sub;
            }

            console.log(workload);
            return _context.abrupt("return", res.status(200).json(workload));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 19, 22, 25]]);
  }));

  return function generateReport(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Workload.get('/reports/workload', generateReport);
// export default Workload;


var _default = generateReport;
exports["default"] = _default;