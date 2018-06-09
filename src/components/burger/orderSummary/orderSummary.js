import React from "react";
import Aux from "../../../hoc/aux";
import Button from "../../ui/button/button";

const orderSummary = props => {
  const summary = Object.keys(props.ing).map(ingKey => (
    <li key={ingKey}>
      <span style={{ textTransform: "capitalize" }}>{ingKey}</span> :
      {props.ing[ingKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your order's details</h3>
      <p>A tasty burger with the following ingredients:</p>
      <ul>{summary}</ul>
      <p style={{ fontWeight: "700", color: "red" }}>
        Total price : {props.price.toFixed(3)}
      </p>
      <p>Continue to check out ?</p>
      <Button clicked={props.cancel} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
