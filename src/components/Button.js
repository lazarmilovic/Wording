import React from "react";

class Button extends React.Component {
  render() {
    return (
      <button
        className={`btn ${this.props.status}`}
        onClick={() => this.props.onClick(this.props.letter, this.props.ind)}
      >
        {this.props.letter}
      </button>
    );
  }
}

export default Button;
