'use strict';

module.exports = (sequelize, Sequelize) => {
  const subject = sequelize.define('subject', {
    subjectCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  subject.associate = (models) => {
    subject.belongsToMany(models.teacher, {
      through: 'teachers_subs_classes',
      as: 'teacher',
      foreignKey: 'subjectId',
      onDelete: 'CASCADE'
    })

    subject.belongsToMany(models.tclass, {
      through: 'teachers_subs_classes',
      as: 'tclass',
      foreignKey: 'subjectId',
      onDelete: 'CASCADE'
    })

  };


  return subject;
}



