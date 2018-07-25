import React from "react";
import Logo from "../../logo/logo";
import Items from "../items/items";
import classes from "./sideDrawer.css";
import Aux from "../../../hoc/aux/aux";
import Backdrop from "../../ui/backdrop/backdrop";
const sideDrawer = props => {
  const attachedClasses = props.show
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={attachedClasses.join(" ")} onClick={props.close}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <Items auth={props.authenticated} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
