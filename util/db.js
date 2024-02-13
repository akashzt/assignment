const { Sequelize } = require('sequelize');
require('dotenv').config();

const connectDb = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: 3306
});

connectDb.sync().then(function () {
  console.log('DB connection successful.');
}, function (err) {
  console.error(err);
});

module.exports = connectDb;
