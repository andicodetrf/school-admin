'use strict';

module.exports = (sequelize, Sequelize) => {
  const teacher = sequelize.define('teacher', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    }
  });
  teacher.associate = (models) => {
    teacher.belongsToMany(models.student, {
      through: 'teachers_students', //tablename
      as: 'student',
      foreignKey: 'teacherId',
      onDelete: 'CASCADE'
    })

    teacher.belongsToMany(models.tclass, {
      through: 'teachers_subs_classes',
      as: 'tclass',
      foreignKey: 'teacherId',
      onDelete: 'CASCADE'
    })

    teacher.belongsToMany(models.subject, {
      through: 'teachers_subs_classes',
      as: 'subject',
      foreignKey: 'teacherId',
      onDelete: 'CASCADE'
    })
  };

  return teacher;
}



