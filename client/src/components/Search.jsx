import React from "react";
import Axios from "axios";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genre: undefined
    };
    this.handleChange = this.handleChange.bind(this);
  }
  getGenres() {
    Axios.get("/movies/genres")
      .then(data => {
        this.setState({
          genres: data.data
        });
      })
      .then(() => this.setState({ genre: this.state.genres[0].id }))
      .catch(err => console.log(err));
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

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select value={this.state.genre} onChange={this.handleChange}>
          {this.state.genres.map((genre, index) => {
            return (
              <option key={index} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button onClick={() => this.props.getMovies(this.state.genre)}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
