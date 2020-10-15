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
var Subject = db.subject;
var TClass = db.tclass;

var Workload = _express["default"].Router();

var generateReport = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var teachers, teachersIDArr, teachersNameArr, teachersData, _iterator, _step, _i, teacherSubClass, report, h, subjectsTaken, i, module;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Teacher.findAll({});

          case 3:
            teachers = _context.sent;
            teachersIDArr = teachers.map(function (t) {
              return t.id;
            });
            teachersNameArr = teachers.map(function (t) {
              return t.name;
            }); // for each teacher in the array, find teacher's Subject and Class via teacher's id. Push found data into new array.

            teachersData = [];
            _iterator = _createForOfIteratorHelper(teachersIDArr);
            _context.prev = 8;

            _iterator.s();

          case 10:
            if ((_step = _iterator.n()).done) {
              _context.next = 18;
              break;
            }

            _i = _step.value;
            _context.next = 14;
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

          case 14:
            teacherSubClass = _context.sent;
            teachersData.push(teacherSubClass);

          case 16:
            _context.next = 10;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](8);

            _iterator.e(_context.t0);

          case 23:
            _context.prev = 23;

            _iterator.f();

            return _context.finish(23);

          case 26:
            report = {}; //loop through teachersData to retrieve each teacher's subject(s) and their associated class. create key-value properties for the subjects and number of classes into a single value assigned to teacher's name (key) in the report object.

            for (h = 0; h < teachersData.length; h++) {
              subjectsTaken = [];

              for (i = 0; i < teachersData[h][0].subject.length; i++) {
                module = {};
                module['subjectCode'] = teachersData[h][0].subject[i].subjectCode;
                module['subjectName'] = teachersData[h][0].subject[i].name;
                module['numberOfClasses'] = teachersData[h][0].subject[i].tclass.length;
                subjectsTaken.push(module);
              }

              report[teachersNameArr[h]] = subjectsTaken;
            }

            return _context.abrupt("return", res.status(_httpStatusCodes.OK).json({
              status: _httpStatusCodes.OK,
              report: report
            }));

          case 31:
            _context.prev = 31;
            _context.t1 = _context["catch"](0);
            (0, _index.errHandler)(_context.t1);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 31], [8, 20, 23, 26]]);
  }));

  return function generateReport(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

Workload.get('/reports/workload', generateReport);
var _default = Workload;
exports["default"] = _default;