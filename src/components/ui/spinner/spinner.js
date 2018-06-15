import React from "react";
import classes from "./spinner.css";
const spinner = props => {
  return (
    <div>
      <div className={classes.Loader} />
      <h1>Loadding.... {props.message}</h1>{" "}
    </div>
  );
};

export default spinner;
