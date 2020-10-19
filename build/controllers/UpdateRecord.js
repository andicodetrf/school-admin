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

var db = require('../config/db.config');

var Teacher = db.teacher;
var Student = db.student;
var Subject = db.subject;
var TClass = db.tclass;

var UpdateRecord = _express["default"].Router();

var updateData = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, editTeacher, editStudent, editSubject, editClass, checkPersonForm, checkSubjectForm, checkClassForm, updatePersonData, updateSubjectData, updateClassData;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, editTeacher = _req$body.teacher, editStudent = _req$body.student, editSubject = _req$body.subject, editClass = _req$body["class"]; //---- VALIDATE REQUEST BODY STRUCTURE

            if (!(Object.keys(req.body).length !== 1)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(_httpStatusCodes.BAD_REQUEST).json({
              status: _httpStatusCodes.BAD_REQUEST,
              message: 'Kindly update only Teacher, Student, Subject or Class information one at a time'
            }));

          case 3:
            //---- VALIDATE FUNCTIONS FOR REQUEST BODY INPUT
            checkPersonForm = function checkPersonForm(person) {
              if (!person.email || !person.updateName || !person.updateEmail) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: "Kindly complete the update with existing email(email: 'jd@gmail.com'), new name(updateName: 'John') and new email(updateEmail: 'john@gmail.com') "
                });
              }

              if (!(0, _index.validateStringField)(person.updateName)) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: 'Name must be alphabet only'
                });
              }

              if (!(0, _index.validateEmailField)(person.email) || !(0, _index.validateEmailField)(person.updateEmail)) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: 'Email must be in email format'
                });
              }

              return 'toUpdate';
            };

            checkSubjectForm = function checkSubjectForm(sub) {
              if (!sub.subjectCode || !sub.updateName || !sub.updateSubjectCode) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: 'Kindly complete the update with existing subject code (subjectCode: "ENG"), new subject name(updateName: "English2") and new subject code(updateSubjectCode: "ENG2").'
                });
              }

              if (sub.updateName === sub.updateSubjectCode) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: 'Name and Code due for update must be unique from one another'
                });
              }

              return 'toUpdate';
            };

            checkClassForm = function checkClassForm(cls) {
              if (!cls.classCode || !cls.updateName || !cls.updateClassCode) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: 'Kindly complete the update with existing class code (classCode: "P1-I"), new class name(updateName: "P1-Unity") and new class code(updateSubjectCode: "P1-U").'
                });
              }

              if (cls.updateName === cls.updateClassCode) {
                return res.status(_httpStatusCodes.BAD_REQUEST).json({
                  status: _httpStatusCodes.BAD_REQUEST,
                  message: 'Name and Code due for update must be unique from one another'
                });
              }

              return 'toUpdate';
            }; //---- FUNCTIONS FOR CATEGORICAL UPDATE (PERSON, SUBJECT, CLASS)


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

                        if (!updatePersonDetails[0]) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt("return", res.status(_httpStatusCodes.OK).json({
                          status: _httpStatusCodes.OK,
                          message: 'Person details updated'
                        }));

                      case 7:
                        return _context.abrupt("return", res.status(_httpStatusCodes.NOT_FOUND).json({
                          status: _httpStatusCodes.NOT_FOUND,
                          message: 'Email not found. Kindly register'
                        }));

                      case 8:
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

                        if (!updateSubjectDetails[0]) {
                          _context2.next = 7;
                          break;
                        }

                        return _context2.abrupt("return", res.status(_httpStatusCodes.OK).json({
                          status: _httpStatusCodes.OK,
                          message: 'Subject details updated'
                        }));

                      case 7:
                        return _context2.abrupt("return", res.status(_httpStatusCodes.NOT_FOUND).json({
                          status: _httpStatusCodes.NOT_FOUND,
                          message: 'Subject Code Not Found. Kindly register'
                        }));

                      case 8:
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

                        if (!updateClassDetails[0]) {
                          _context3.next = 7;
                          break;
                        }

                        return _context3.abrupt("return", res.status(_httpStatusCodes.OK).json({
                          status: _httpStatusCodes.OK,
                          message: 'Class details updated'
                        }));

                      case 7:
                        return _context3.abrupt("return", res.status(_httpStatusCodes.NOT_FOUND).json({
                          status: _httpStatusCodes.NOT_FOUND,
                          message: 'Class Code Not Found. Kindly register'
                        }));

                      case 8:
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
              if (editTeacher && checkPersonForm(editTeacher) === 'toUpdate') {
                (0, _index.lowerCaseNameEmail)(editTeacher);
                updatePersonData(editTeacher, Teacher);
              }

              if (editStudent && checkPersonForm(editStudent) === 'toUpdate') {
                (0, _index.lowerCaseNameEmail)(editStudent);
                updatePersonData(editStudent, Student);
              }

              if (editSubject && checkSubjectForm(editSubject) === 'toUpdate') {
                (0, _index.formatSubjectCode)(editSubject);
                updateSubjectData(editSubject);
              }

              if (editClass && checkClassForm(editClass) === 'toUpdate') {
                (0, _index.formatClassCode)(editClass);
                updateClassData(editClass);
              }
            } catch (err) {
              (0, _index.errHandler)(err);
            }

          case 10:
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