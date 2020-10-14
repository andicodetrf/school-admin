'use strict';

module.exports = (sequelize, Sequelize) => {
  const student = sequelize.define('student', {
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
  student.associate = (models) => {
    student.belongsToMany(models.teacher, {
      through: 'teachers_students',
      as: 'teacher',
      foreignKey: 'studentId',
      onDelete: 'CASCADE'
    })
  }

  return student;
}



