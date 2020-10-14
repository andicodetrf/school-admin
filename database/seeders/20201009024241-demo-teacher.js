'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('teachers', [{
      name: 'Teacher John',
      email: 'TJohn@example.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('teachers', null, {});
  }
};
