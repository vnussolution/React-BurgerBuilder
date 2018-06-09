import React from "react";
import Aux from "../../../hoc/aux";
import classes from "./backdrop.css";

const backdrop = props => {
  console.log("backdrop ", props.show);
  return (
    <Aux>
      {props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked} />
      ) : null}
    </Aux>
  );
};

export default backdrop;
