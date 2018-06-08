import React from "react";
import classes from "./buildControl.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.lessIngredient}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.moreIngredient}>
        More
      </button>
    </div>
  );
};

export default buildControl;
