const { AllowedProtocols } = require("../../helpers/enums");

module.exports = (sequelize, Sequelize) => {
  const Check = sequelize.define(
    'Check',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        protocol: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              isIn: {
                args: [
                    Object.values(AllowedProtocols)
                ],
                msg: `Protocol should be ${Object.values(AllowedProtocols)}`
              }
          }
        },
        path: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        port: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        webhook: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        timeout: {
            type: Sequelize.INTEGER,
            defaultValue: 5,
        },
        interval: {
            type: Sequelize.INTEGER,
            defaultValue: 600,
        },
        threshold: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        httpHeaders: {
            type: Sequelize.JSON, // Use JSON data type for key-value pairs
            allowNull: true,
        },
    },
    { freezeTableName: true, timestamps: true },
  );

  Check.associate = (models) => {
    Check.belongsTo(models.User);
    Check.hasMany(models.MonitoringResults);
  };

  return Check;
};
