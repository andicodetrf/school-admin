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

var Teacher = db.teacher;
var Student = db.student;
var Subject = db.subject;
var TClass = db.tclass;

var UpdateRecord = _express["default"].Router();

var updateData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var editTeacher, editStudent, editSubject, editClass, checkPersonForm, checkSubjectForm, checkClassForm, updatePersonData, updateSubjectData, updateClassData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            editTeacher = req.body.teacher;
            editStudent = req.body.student;
            editSubject = req.body.subject;
            editClass = req.body["class"];

            checkPersonForm = function checkPersonForm(obj) {
              if (!obj.email || !obj.updateName || !obj.updateEmail) {
                return res.status(400).json({
                  message: 'Error 400: Kindly complete the update with existing email(email: "jd@gmail.com"), new name(updateName: "John") and new email(updateEmail: "john@gmail.com") '
                });
              }
            };

            checkSubjectForm = function checkSubjectForm(obj) {
              if (!obj.subjectCode || !obj.updateName || !obj.updateSubjectCode) {
                return res.status(400).json({
                  message: 'Error 400: Kindly complete the update with existing subject code (subjectCode: "ENG"), new subject name(updateName: "English2") and new subject code(updateSubjectCode: "ENG2").'
                });
              }
            };

            checkClassForm = function checkClassForm(obj) {
              if (!obj.classCode || !obj.updateName || !obj.updateClassCode) {
                return res.status(400).json({
                  message: 'Error 400: Kindly complete the update with existing class code (classCode: "P1-I"), new class name(updateName: "P1-Unity") and new class code(updateSubjectCode: "P1-U").'
                });
              }
            };

            if (!(Object.keys(req.body).length !== 1)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: 'Error 400: Kindly update only Teacher, Student, Subject or Class information at one time'
            }));

          case 11:
            if (req.body.teacher) {
              checkPersonForm(req.body.teacher);
            }

            if (req.body.student) {
              checkPersonForm(req.body.student);
            }

            if (req.body.subject) {
              checkSubjectForm(req.body.subject);
            }

            if (req.body["class"]) {
              checkClassForm(req.body["class"]);
            }

          case 15:
            updatePersonData = /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(person, model) {
                var updatePersonDetails;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return model.update({
                          name: person.updateName,
                          email: person.updateEmail
                        }, {
                          where: {
                            email: person.email
                          }
                        });

                      case 2:
                        updatePersonDetails = _context.sent;
                        console.log('UP_PERSON_DETAILS', updatePersonDetails);

                        if (!updatePersonDetails[0]) {
                          _context.next = 9;
                          break;
                        }

                        console.log('TESTTT');
                        return _context.abrupt("return", res.status(200).json({
                          message: '200: Person details updated'
                        }));

                      case 9:
                        return _context.abrupt("return", res.status(400).json({
                          message: 'Error 400: Email not found. Kindly register'
                        }));

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function updatePersonData(_x3, _x4) {
                return _ref2.apply(this, arguments);
              };
            }();

            updateSubjectData = /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(sub) {
                var updateSubjectDetails;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return Subject.update({
                          name: sub.updateName,
                          subjectCode: sub.updateSubjectCode
                        }, {
                          where: {
                            subjectCode: sub.subjectCode
                          }
                        });

                      case 2:
                        updateSubjectDetails = _context2.sent;
                        console.log('UP_SUB_DETAILS', updateSubjectDetails);

                        if (!updateSubjectDetails[0]) {
                          _context2.next = 8;
                          break;
                        }

                        return _context2.abrupt("return", res.status(200).json({
                          message: '200: Subject Details updated'
                        }));

                      case 8:
                        return _context2.abrupt("return", res.status(400).json({
                          message: 'Error 400: Subject Code Not Found. Kindly register'
                        }));

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function updateSubjectData(_x5) {
                return _ref3.apply(this, arguments);
              };
            }();

            updateClassData = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(cls) {
                var updateClassDetails;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return TClass.update({
                          name: cls.updateName,
                          classCode: cls.updateClassCode
                        }, {
                          where: {
                            classCode: cls.classCode
                          }
                        });

                      case 2:
                        updateClassDetails = _context3.sent;
                        console.log('UP_CLASS_DETAILS', updateClassDetails);

                        if (!updateClassDetails[0]) {
                          _context3.next = 8;
                          break;
                        }

                        return _context3.abrupt("return", res.status(200).json({
                          message: '200: Class Details updated'
                        }));

                      case 8:
                        return _context3.abrupt("return", res.status(400).json({
                          message: 'Error 400: Class Code Not Found. Kindly register'
                        }));

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function updateClassData(_x6) {
                return _ref4.apply(this, arguments);
              };
            }();

            try {
              if (editTeacher) {
                (0, _index.lowerCaseNameEmail)(editTeacher);
                updatePersonData(editTeacher, Teacher);
              }

              if (editStudent) {
                (0, _index.lowerCaseNameEmail)(editStudent);
                updatePersonData(editStudent, Student);
              }

              if (editSubject) {
                (0, _index.formatSubjectCode)(editSubject);
                updateSubjectData(editSubject);
              }

              if (editClass) {
                (0, _index.formatClassCode)(editClass);
                updateClassData(editClass);
              }
            } catch (err) {
              (0, _index.errHandler)(err);
            }

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

UpdateRecord.post('/register/update', updateData);
var _default = UpdateRecord;
exports["default"] = _default;