'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('teachers_students', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teacherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        onDelete: 'CASCADE',
        references: {
          model: 'teachers',
          key: 'id'
        }
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        onDelete: 'CASCADE',
        references: {
          model: 'students',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teachers_students');
  }
};
