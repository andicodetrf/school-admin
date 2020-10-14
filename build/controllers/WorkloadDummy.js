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

var db = require('../config/db.config');

var Teacher = db.teacher; // const Student = db.student;

var Subject = db.subject;
var TClass = db.tclass; // const Teacher_Student = db.teacher_student;
// const Teacher_Sub_Class = db.teacher_sub_class;

var WorkloadDum = _express["default"].Router();

var generateReportDum = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var teachersSubsClass;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Teacher.findAll({
              // where: { id: 2 },
              include: [{
                model: TClass,
                as: 'tclass',
                // through: {where: {teacherId: i}},
                // where: {subjectCode: 'ENG'},
                // through:{where: {tclassId: 1}},
                include: [{
                  model: Subject,
                  as: 'subject',
                  through: {
                    where: {
                      teacherId: 2
                    }
                  }
                }]
              }]
            });

          case 2:
            teachersSubsClass = _context.sent;
            return _context.abrupt("return", res.status(200).json(teachersSubsClass));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateReportDum(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

WorkloadDum.get('/reports/workload/dum', generateReportDum);
var _default = WorkloadDum;
exports["default"] = _default;