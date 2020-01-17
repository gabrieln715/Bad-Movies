//

const mongoose = require("mongoose");
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost:27017/badmovies", {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

let userSchema = mongoose.Schema({
  popularity: Number,
  vote_count: Number,
  video: Boolean,
  poster_path: { type: String, dropDups: true, unique: true },
  id: Number,
  adult: Boolean,
  backdrop_path: String,
  original_language: String,
  original_title: String,
  genre_ids: Array,
  title: String,
  vote_average: Number,
  overview: String,
  release_date: String,
  __v: Number
});

let User = mongoose.model("User", userSchema);

mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

let save = movie => {
  let newMovie = new User(movie);
  newMovie.save(err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`saved movie to DB`);
    }
  });
};

let deleteMovie = (movie, callback) => {
  User.deleteOne(movie, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(console.log('success'));
    }
  });
};

let find = callback => {
  User.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports.db = db;

module.exports.save = save;

module.exports.deleteMovie = deleteMovie;

module.exports.find = find;
