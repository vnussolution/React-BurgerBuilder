import React from "react";
import classes from "./toolbar.css";
import Logo from "../../logo/logo";
import Items from "../items/items";
const toolbar = () => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <Items />
      </nav>
    </header>
  );
};

export default toolbar;
