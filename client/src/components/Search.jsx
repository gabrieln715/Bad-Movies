import React from "react";
import axios from "axios";
import Genrelist from "./GenreList.jsx";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genre: ""
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios
      .get("movies/genres")
      .then(data => {
        this.setState({
          genres: data.data.map(genre => genre.name)
        });
      })
      .catch(err => console.err(err));
  }
  handleChange(event) {
    this.setState({
      genre: event.target.value
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />
        <select value={this.state.genre} onChange={this.handleChange}>
          {this.state.genres.map((genre, index) => (
            <Genrelist key={index} genre={genre} />
          ))}
        </select>
        <br />
        <br />

        <button
          onClick={() => {
            this.props.getMovies(this.state.genre);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
