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
      favorites: [{ deway: "favorites" }],
      showFaves: false
    };

    // you might have to do something important here!
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
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

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
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
          />
          <ul className="movies">
            {this.state.movies.map(movie => {
              return (
                <Movies
                  movie={
                    // this.state.showFaves ? this.state.favorites : this.state.movies
                    movie
                  }
                  showFaves={this.state.showFaves}
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
