const movieModel = require("../models/movieModel.js");
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

    // get the search genre

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
      .then(data => res.send(data.data.genres))
      .catch(err => res.sendStatus(500));
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

    // send back
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {}
};
