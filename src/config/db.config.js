import  Sequelize  from 'sequelize';
import sequelize from './database';

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.teacher = require('../../database/models/teacher.model')(sequelize, Sequelize)
db.student = require('../../database/models/student.model')(sequelize, Sequelize)
db.teacher_student = require('../../database/models/teacher_student.model')(sequelize, Sequelize)

db.subject = require('../../database/models/subject.model')(sequelize, Sequelize)
db.tclass = require('../../database/models/tclass.model')(sequelize, Sequelize)

db.teacher_sub_class = require('../../database/models/teacher_sub_class.model')(sequelize, Sequelize)

db.student_class =  require('../../database/models/student_class.model')(sequelize, Sequelize)

db.teacher.associate(db)
db.student.associate(db)
db.subject.associate(db)
db.tclass.associate(db)

// console.log(db)

module.exports = db;
