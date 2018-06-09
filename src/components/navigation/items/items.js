import React from "react";
import classes from "./items.css";
import Item from "./item/item";
const items = props => {
  return (
    <ul className={classes.Items}>
      <Item link="/" active>
        Burger builder
      </Item>
      <Item link="/"> Burger builder</Item>
    </ul>
  );
};

export default items;
