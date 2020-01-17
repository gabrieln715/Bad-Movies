const movieModel = require("../models/movieModel.js");
const apiHelpers = require("../helpers/apiHelpers.js");
const Axios = require("axios");
const { API_KEY } = require("../../config.js");

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    let genre = req.query.ID;
    Axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=250&with_genres=${genre}&with_original_language=en`
    )
      .then(data => res.send(data.data.results))
      .catch(err => console.log(err));
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    Axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    )
      .then(data => res.send(data.data.genres))
      .catch(err => console.log(err));

    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

    // send back
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {}
};
