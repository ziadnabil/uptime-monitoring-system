const { sequelize, Sequelize } = require('../../config/db');
var bcrypt = require("bcryptjs");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const DeviceRateLimiter = sequelize.define("DeviceRateLimiter", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    deviceToken: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false
    },
    requestUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IP: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    trials: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    createdDate: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    indexes: [
      {
        fields: ['deviceToken', 'requestUrl']
      }
    ]
  });

  DeviceRateLimiter.associate = models => {
  };
  return DeviceRateLimiter;
};
