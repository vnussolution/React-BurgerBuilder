import React from "react";
import Burger from "../../burger/burger";
import Button from "../../ui/button/button";
import classes from "./checkOutSummary.css";

const checkOutSummary = props => {
  return (
    <div className={classes.checkOutSummary}>
      <h1>Tasty Burger</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelCheckOut}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueCheckOut}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkOutSummary;
