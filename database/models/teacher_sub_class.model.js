'use strict';
module.exports = (sequelize, Sequelize) => {
  const teacher_sub_class = sequelize.define('teachers_subs_classes', {

    teacherId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'teachers',
        key: 'id'
      }
    },
    subjectId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'subjects',
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
  return teacher_sub_class;
}
