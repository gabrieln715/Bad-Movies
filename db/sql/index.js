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

console.log("here");
const User = sequelize.define("User", {
  // Model attributes are defined here
  poster_path: {
    type: Sequelize.STRING,
    allowNull: false
  },
  movieId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vote_average: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  release_date: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.sync({ force: true });
