import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
  }

  getMovies(movie) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .get("movies/search", {
        params: {
          query: movie
        }
      })
      .then(data =>
        this.setState({
          movies: data.data.results
        })
      )
      .catch(err => console.err(err));
  }

  saveMovie(movie) {
    axios
      .post("/movies/save", movie)
      // .then(() => console.log("save movie done"))
      .catch(err => console.log(err));
  }

  deleteMovie(movie) {
    console.log(movie.id);
    axios
      .delete("/movies/delete", { data: { id: movie.id } })
      .then(() => this.loadFavorites())
      .catch(err => console.log(err));
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  loadFavorites() {
    axios
      .get("/movies/load")
      .then(data =>
        this.setState({
          favorites: data.data
        })
      )
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadFavorites();
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
            loadFavorites={this.loadFavorites}
            deleteMovie={this.deleteMovie}
          />
          <ul className="movies">
            {(this.state.showFaves
              ? this.state.favorites
              : this.state.movies
            ).map(movie => {
              return (
                <Movies
                  key={movie.id}
                  movie={movie}
                  showFaves={this.state.showFaves}
                  saveMovie={this.saveMovie}
                  deleteMovie={this.deleteMovie}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
