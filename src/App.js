import React, { Component } from "react";
import "./App.css";
import Block from "./component/block";
import InputInfo from "./component/inputInfo";
import { connect } from "react-redux";
import * as actionTypes from "./store/actionTypes";

class App extends Component {
  state = { people: [] };

  addPersonHandler = (name, age) => {};
  componentDidMount() {
    console.log("--- ", this.state.people);
  }

  clickHandler = age => {
    // const people = this.state.people.slice();
    // this.setState({
    //   people: this.state.people.filter(person => person.age !== age)
    // });

    console.log("clickHandler ::", this.props.onRemovePerson(age));
    this.props.onRemovePerson(age);
  };

  render() {
    console.log("++App.js++", this.props);
    return (
      <div className="App">
        <h2>hello </h2>
        <InputInfo clicked={this.props.onAddPerson} />
        {this.props.people.map(person => (
          <Block
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onRemovePerson(person.id)}
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
  return {
    onAddPerson: (name, age) =>
      dispatch({
        type: actionTypes.ADD_PERSON,
        name: name,
        age: age
      }),
    onRemovePerson: id => dispatch({ type: actionTypes.REMOVE_PERSON, id: id })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
