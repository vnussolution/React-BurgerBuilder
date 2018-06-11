import React, { Component } from "react";
import Aux from "../../../hoc/aux/aux";
import Button from "../../ui/button/button";

// this component can be implemeted with with function component
class OrderSummary extends Component {
  // implement this cycle to debug
  componentWillUpdate() {
    console.log("OrderSummary componentWillUpdate");
  }

  render() {
    const summary = Object.keys(this.props.ing).map(ingKey => (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span> :
        {this.props.ing[ingKey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your order's details</h3>
        <p>A tasty burger with the following ingredients:</p>
        <ul>{summary}</ul>
        <p style={{ fontWeight: "700", color: "red" }}>
          Total price : {this.props.price.toFixed(3)}
        </p>
        <p>Continue to check out ?</p>
        <Button clicked={this.props.cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
