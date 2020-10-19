"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("./database"));

var db = {};
db.Sequelize = _sequelize["default"];
db.sequelize = _database["default"];
db.teacher = require('../../database/models/teacher.model')(_database["default"], _sequelize["default"]);
db.student = require('../../database/models/student.model')(_database["default"], _sequelize["default"]);
db.teacher_student = require('../../database/models/teacher_student.model')(_database["default"], _sequelize["default"]);
db.subject = require('../../database/models/subject.model')(_database["default"], _sequelize["default"]);
db.tclass = require('../../database/models/tclass.model')(_database["default"], _sequelize["default"]);
db.teacher_sub_class = require('../../database/models/teacher_sub_class.model')(_database["default"], _sequelize["default"]);
db.student_class = require('../../database/models/student_class.model')(_database["default"], _sequelize["default"]);
db.teacher.associate(db);
db.student.associate(db);
db.subject.associate(db);
db.tclass.associate(db); // console.log(db.sequelize.models)
// for(let i in db.sequelize.models){
//     console.log(db.sequelize.models[i])
// }

module.exports = db;