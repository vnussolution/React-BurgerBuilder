import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from "../../store/actions";

class Counter extends Component {
  state = {
    counter: 0
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label="Add 5" clicked={this.props.onAddFiveCounter} />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubstractFiveCounter}
        />
        <hr />
        <button onClick={() => this.props.onStoreNumber(this.props.ctr)}>
          Store Number
        </button>
        <ul>
          {this.props.results.map(result => (
            <li
              key={result.id}
              onClick={() => this.props.onDeleteStoreNumber(result.id)}
            >
              number: {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ctr: state.ctr.counter, results: state.res.results };
};
const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddFiveCounter: () => dispatch({ type: actionTypes.ADDFIVE, val: 5 }),
    onSubstractFiveCounter: () =>
      dispatch({ type: actionTypes.SUBSTRACT_FIVE, val: 6 }),
    onStoreNumber: counter =>
      dispatch({
        type: actionTypes.STORE_NUMBER,
        result: counter
      }),
    onDeleteStoreNumber: id =>
      dispatch({ type: actionTypes.DELETE_STORE_NUMBER, id: id })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
