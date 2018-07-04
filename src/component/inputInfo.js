import React, { Component } from "react";

class InputInfo extends Component {
  state = { name: "", age: 0 };

  nameChanged = event => {
    this.setState({ name: event.target.value });
  };

  ageChanged = event => {
    this.setState({ age: event.target.value });
  };

  render() {
    console.log("++inputInfo.js++", this.props);

    return (
      <div>
        <input
          type="text"
          placeholder="your name"
          value={this.state.name}
          onChange={this.nameChanged}
        />
        <input
          type="text"
          placeholder="age"
          value={this.state.age}
          onChange={this.ageChanged}
        />

        <button
          onClick={() => this.props.clicked(this.state.name, this.state.age)}
        >
          Add Person{" "}
        </button>
      </div>
    );
  }
}
export default InputInfo;
