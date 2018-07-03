import React, { Component } from "react";
import "./App.css";
import Block from "./component/block";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionTypes";

class App extends Component {
  state = { people: [] };

  addPersonHandler = () => {
    const person = { name: "frankie", age: Math.random() * 100 };
    const newPeople = [...this.state.people, person];
    this.setState({ people: newPeople });
    console.log("===", newPeople, this.state);
  };
  componentDidMount() {
    console.log("--- ", this.state.people);
  }

  clickHandler = age => {
    const people = this.state.people.slice();
    this.setState({
      people: this.state.people.filter(person => person.age !== age)
    });
  };

  render() {
    return (
      <div className="App">
        <h2>hello </h2>

        <button onClick={this.props.onAddPerson}> Add Person </button>
        {this.props.people.map(person => (
          <Block
            key={person.age}
            name={person.name}
            age={person.age}
            clicked={() => this.clickHandler(person.age)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { people: state.people };
};

const mapDispatchToProps = dispatch => {
  return { onAddPerson: () => dispatch({ type: "ADD_PERSON" }) };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
