module.exports = (sequelize, Sequelize) => {
  const MonitoringResults = sequelize.define(
    'MonitoringResults',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        availability: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        outages: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        downtime: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        uptime: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        responseTime: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    { freezeTableName: true, timestamps: true },
  );

  MonitoringResults.associate = (models) => {
    MonitoringResults.belongsTo(models.Check);
  };

  return MonitoringResults;
};
