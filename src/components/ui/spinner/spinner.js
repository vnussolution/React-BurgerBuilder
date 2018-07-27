import React from "react";
import classes from "./spinner.css";
const spinner = props => {
  return (
    <div className={classes.Spinner}>
      <div className={classes.Loader} />
      <h1>Loading.... {props.message}</h1>{" "}
    </div>
  );
};

export default spinner;
