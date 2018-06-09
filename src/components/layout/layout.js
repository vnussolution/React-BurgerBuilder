import React from "react";
import classes from "./layout.css";
import Aux from "../../hoc/aux";
import Toolbar from "../navigation/toolbar/toolbar";

const layout = props => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
