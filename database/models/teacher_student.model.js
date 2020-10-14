'use strict';
module.exports = (sequelize, Sequelize) => {
  const teacher_student = sequelize.define('teachers_students', {

    teacherId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'teachers',
        key: 'id'
      }
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'students',
        key: 'id'
      }
    },
  });
  return teacher_student;
}
