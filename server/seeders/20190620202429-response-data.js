'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Responses',
      [
        {
          tid: 1,
          topic: "What is React?",
          response: "React is a JavaScript library used to create User Interface.",
          response_by: "harminder2010kaur@gmail.com",
          createdAt: new Date()
        }
      ]
      )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Responses', null, {});
  }
};
