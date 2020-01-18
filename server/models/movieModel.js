//Select one db to work with:

//For SQL
const { User } = require("../../db/sql");
//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
  save: movie => {
    return User.create(movie);
  },
  delete: movie => {
    let newMovie = JSON.parse(movie);
    return User.destroy({
      where: {
        id: newMovie.id
      }
    });
  },
  find: () => {
    return User.findAll();
  }
};
