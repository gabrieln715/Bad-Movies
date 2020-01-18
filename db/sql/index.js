const mysql = require("mysql");
const mysqlConfig = require("../../config.js");
const { Sequelize } = require("sequelize");

// const connection = mysql.createConnection(mysqlConfig);
const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: "localhost",
    dialect: "mysql"
  }
);

// sequelize.query("CREATE DATABASE IF NOT EXISTS DBName;");

const User = sequelize.define("User", {
  // Model attributes are defined here
  poster_path: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  vote_average: {
    type: Sequelize.INTEGER
  },
  release_date: {
    type: Sequelize.STRING
  }
});

User.sync({ force: false });

module.exports.User = User;
module.exports.sequelize = sequelize;
