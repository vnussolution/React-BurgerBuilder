import React from "react";
import Logo from "../../logo/logo";
import Items from "../items/items";
import classes from "./sideDrawer.css";

const sideDrawer = props => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <Items />
      </nav>
    </div>
  );
};

export default sideDrawer;
