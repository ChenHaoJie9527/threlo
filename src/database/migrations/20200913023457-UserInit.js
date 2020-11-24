'use strict';

module.exports = {
  // up: 创建迁移脚本
  // queryInterface对象：提供操作数据库结构的各种方法，创建表，字段，索引等
  // Sequelize核心类，提供操作数据库相关的常量信息，数据类型，也可以进行实例化，对数据库表中的数据进行相关操作
  up: async (queryInterface, Sequelize) => {
    /**
     * up需要返回一个promise
     * queryInterface.createTable用于创建数据库表
     *  - 第一个参数是表名称
     *  - 第二个参数是表包含的字段信息，类型，主键，是否为空，是否自增
     */
    return queryInterface.createTable("User", {
      id: {
        //字段信息
        type: Sequelize.INTEGER,
        // 设置主键
        primaryKey: true,
        // 自动增长
        autoIncrement: true
      },
      name: {
        //20长度字符串
        type: Sequelize.STRING(20),
        // 值唯一
        unique: true,
        // 不为null值
        allowNull: false
      },
      password: {
        //20长度字符串
        type: Sequelize.STRING(40),
        // 不为null值
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  // down：回滚迁移脚本 
  down: async (queryInterface, Sequelize) => {
    //删除数据表
    return queryInterface.dropTable("User");
  }
};
