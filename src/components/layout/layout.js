import React from "react";
import classes from "./layout.css";
import Aux from "../../hoc/aux";

const layout = props => (
  <Aux>
    <div>Toolbar, sidedrawer, backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
