'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('teachers_subs_classes', {
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
      subjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        onDelete: 'CASCADE',
        references: {
          model: 'subjects',
          key: 'id'
        }
      },
      tclassId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        onDelete: 'CASCADE',
        references: {
          model: 'tclasses',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teachers_subs_classes');
  }
};
