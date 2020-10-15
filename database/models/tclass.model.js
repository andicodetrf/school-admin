'use strict';

module.exports = (sequelize, Sequelize) => {
  const tclass = sequelize.define('tclass', {
    classCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  tclass.associate = (models) => {
    tclass.belongsToMany(models.teacher, {
      through: 'teachers_subs_classes',
      as: 'teacher',
      foreignKey: 'tclassId',
      onDelete: 'CASCADE'
    })

    tclass.belongsToMany(models.subject, {
      through: 'teachers_subs_classes',
      as: 'subject',
      foreignKey: 'tclassId',
      onDelete: 'CASCADE'
    })

    tclass.belongsToMany(models.student, {
      through: 'students_classes',
      as: 'student',
      foreignKey: 'tclassId',
      onDelete: 'CASCADE'
    })

  };

  return tclass;
}



