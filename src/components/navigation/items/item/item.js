import React from "react";
import classes from "./item.css";
import { NavLink } from "react-router-dom";

const item = props => {
  return (
    <li className={classes.Item}>
      <NavLink
        exact={props.exact}
        to={props.link}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default item;
