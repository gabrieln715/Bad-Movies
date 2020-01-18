import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";
import Axios from "axios";

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
  }

  getMovies(genre) {
    Axios.get("/movies/search", {
      params: {
        ID: genre
      }
    })
      .then(data => this.setState({ movies: data.data }))
      .catch(err => console.log(err));
  }

  saveMovie(movie) {
    Axios.post("/movies/save", movie)
      .then(data =>
        this.setState({ favorites: this.state.favorites.concat(data.data) })
      )
      .catch(err => console.log(err));
  }

  deleteMovie(movie) {
    Axios.delete("/movies/delete", { params: { data: movie } })
      .then(() => this.getFavorites())
      .catch(err => console.log(err));
  }

  getFavorites() {
    Axios.get("/movies/favorites")
      .then(data => this.setState({ favorites: data.data }))
      .catch(err => console.log(err));
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  componentDidMount() {
    this.getMovies(28);
    this.getFavorites();
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Best Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
            getMovies={this.getMovies}
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
