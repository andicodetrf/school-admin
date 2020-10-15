'use strict';
module.exports = (sequelize, Sequelize) => {
  const student_class = sequelize.define('students_classes', {

    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'students',
        key: 'id'
      }
    },
    tclassId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'tclasses',
        key: 'id'
      }
    },

  });
  return student_class;
}
