import React from "react";
import classes from "./toolbar.css";
import Logo from "../../logo/logo";
import Items from "../items/items";
import DrawerToggle from "../sideDrawer/drawerToggle/drawerToggle";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle toggleDrawer={props.toggleMenu} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <Items />
      </nav>
    </header>
  );
};

export default toolbar;
