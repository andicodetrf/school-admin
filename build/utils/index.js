"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatClassCode = exports.formatSubjectCode = exports.lowerCaseNameEmail = exports.capitalizeFirstChar = exports.validateUniqueCodeName = exports.validateEmailField = exports.validateStringField = exports.errHandler = exports.convertCsvToJson = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _csvParser = _interopRequireDefault(require("csv-parser"));

var convertCsvToJson = function convertCsvToJson(filePath) {
  var results = [];

  var stream = _fs["default"].createReadStream(filePath).pipe((0, _csvParser["default"])());

  return new Promise(function (resolve, reject) {
    stream.on('data', function (data) {
      return results.push(data);
    });
    stream.on('end', function () {
      return resolve(results);
    });
    stream.on('error', function (err) {
      return reject(err);
    });
  });
}; //error message log


exports.convertCsvToJson = convertCsvToJson;

var errHandler = function errHandler(err) {
  console.error('ERROR ---> : ', err);
}; //validate alphanumeric including symbols such as . - ' for name input


exports.errHandler = errHandler;

var validateStringField = function validateStringField(str) {
  // const reg = /^(?![ .]+$)[a-zA-Z0-9\-' .]*$/
  var reg = /^[a-zA-Z][a-zA-Z0-9-' .]*$/; //improved ver after unit-testing to ensure name starts with alpha only

  return reg.test(str);
}; //validate email format for email input


exports.validateStringField = validateStringField;

var validateEmailField = function validateEmailField(eml) {
  // const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  var reg = /^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]*@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/; //improved ver after unit-testing to ensure email starts with alphanumeric, alphanumeric after '@' and alphanumeric after '.'

  return reg.test(eml);
}; //unique code & names for subject and classes


exports.validateEmailField = validateEmailField;

var validateUniqueCodeName = function validateUniqueCodeName(obj) {
  var arr = Object.values(obj).map(function (item) {
    return item.toLowerCase();
  });

  for (var i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) {
      return false;
    }
  }

  return true;
}; //capitalize first character


exports.validateUniqueCodeName = validateUniqueCodeName;

var capitalizeFirstChar = function capitalizeFirstChar(item) {
  return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
}; //lowercase name and email


exports.capitalizeFirstChar = capitalizeFirstChar;

var lowerCaseNameEmail = function lowerCaseNameEmail(obj) {
  for (var i in obj) {
    obj[i] = obj[i].toLowerCase();
  }

  return obj;
}; //capitalize and uppercase code for subject


exports.lowerCaseNameEmail = lowerCaseNameEmail;

var formatSubjectCode = function formatSubjectCode(sub) {
  if (sub.name && sub.subjectCode) {
    sub.name = capitalizeFirstChar(sub.name);
    sub.subjectCode = sub.subjectCode.toUpperCase();
  }

  if (sub.updateName && sub.updateSubjectCode) {
    sub.updateName = capitalizeFirstChar(sub.updateName);
    sub.updateSubjectCode = sub.updateSubjectCode.toUpperCase();
  }

  return sub;
}; //capitalize and uppercase code for class


exports.formatSubjectCode = formatSubjectCode;

var formatClassCode = function formatClassCode(cls) {
  if (cls.name && cls.classCode) {
    cls.name = capitalizeFirstChar(cls.name);
    cls.classCode = cls.classCode.toUpperCase();
  }

  if (cls.updateName && cls.updateClassCode) {
    cls.updateName = capitalizeFirstChar(cls.updateName);
    cls.updateClassCode = cls.updateClassCode.toUpperCase();
  }

  return cls;
};

exports.formatClassCode = formatClassCode;