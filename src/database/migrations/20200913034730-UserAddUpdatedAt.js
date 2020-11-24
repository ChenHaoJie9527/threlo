'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //需求变更，给user新增字段
    return queryInterface.addColumn("User","updatedAt",{
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("User","updatedAt");
  }
};
