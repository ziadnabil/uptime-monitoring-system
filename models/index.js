const {sequelize,Sequelize} = require('../config/db');
const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user/User")(sequelize, Sequelize);
db.Check = require("./monitor/Check")(sequelize, Sequelize);
db.MonitoringResults = require("./monitor/MonitoringResults")(sequelize, Sequelize);

db.User.associate(db);
db.Check.associate(db);
db.MonitoringResults.associate(db);

module.exports = db;