import React, { Component } from "react";
import classes from "./modal.css";
import Backdrop from "../backdrop/backdrop";
import Aux from "../../../hoc/aux/aux";

class Modal extends Component {
  // implement this hook to prevent updating any nested component
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
    console.log("[Modal] componentWillUpdate");
  }

  render() {
    return (
      <Aux>
        <Backdrop clicked={this.props.toggle} show={this.props.show} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
