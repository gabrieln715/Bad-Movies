import React from "react";

class Genrelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false
    };
  }

  render() {
    return <option value={this.props.genre.id}>{this.props.genre.name}</option>;
  }
}

export default Genrelist;
