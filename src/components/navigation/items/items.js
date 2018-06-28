import React from "react";
import classes from "./items.css";
import Item from "./item/item";
const items = props => {
  return (
    <ul className={classes.Items}>
      <Item link="/" exact>
        Burger builder
      </Item>
      <Item link="/orders"> Orders</Item>
    </ul>
  );
};

export default items;
