require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timestamps:true,
  logging: false,
  dialectOptions: {
    useUTC: false,
  },
  pool: {
    max: 1000,
    min: 0,
    acquire: 1000000,
    idle: 650000
  }
});


module.exports = { sequelize, Sequelize }


