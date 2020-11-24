'use strict';
const crypto = require("crypto");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /***
     * crypto: node内置加密模块，通过hash进行加密转化成md5；
     * bulkInsert: 批量插入数据
     */
    let md5 = crypto.createHash("md5");
    // 对密码进行加密
    let password = md5.update("123456").digest("hex");
    let date = new Date();
    return queryInterface.bulkInsert("User", ["zmouse", "mt", "leo", "xiaorui"].map((name, index) => {
      return {
        id: index + 1,
        name,
        password,
        createdAt: date,
        updatedAt: date
      }
    }));
  },

  down: async (queryInterface, Sequelize) => {
    /***
     * 批量删除: 批量删除
     */
    return queryInterface.bulkDelete("User", null, {});
  }
};
