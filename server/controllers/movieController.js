const movieModel = require("../models/movieModel.js");
const db = require("../../db/mongodb/");
const apiHelpers = require("../helpers/apiHelpers.js");
const { API_KEY } = require("../../config.js");
const axios = require("axios");

console.log(API_KEY);

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    let genre = req.query.query;
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&vote_count.gte=100&with_genres=${genre}&with_original_language=en`
      )
      .then(data => res.send(data.data))
      .catch(err => res.sendStatus(500));
  },
  getGenres: (req, res) => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(data => res.send(data.data.genres))
      .catch(err => res.sendStatus(500));
  },
  saveMovie: (req, res) => {
    db.save(req.body);
    res.sendStatus(201);
  },
  deleteMovie: (req, res) => {
    db.deleteMovie(req.body, err => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  },
  getFavorites: (req, res) => {
    db.find((err, data) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    });
  }
};
