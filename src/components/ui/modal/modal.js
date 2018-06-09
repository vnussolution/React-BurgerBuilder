import React from "react";
import classes from "./modal.css";
import Backdrop from "../backdrop/backdrop";
import Aux from "../../../hoc/aux";

const Modal = props => {
  console.log("Modal", props.show);

  return (
    <Aux>
      <Backdrop clicked={props.toggle} show={props.show} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
