import React from "react";

class Genrelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false
    };
  }

  render() {
    return <option value={this.props.genre}>{this.props.genre}</option>;
  }
}

export default Genrelist;
