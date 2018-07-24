import React from "react";
import classes from "./items.css";
import Item from "./item/item";
const items = props => {
  return (
    <ul className={classes.Items}>
      <Item link="/" exact>
        Burger builder
      </Item>
      {props.auth ? <Item link="/orders"> Orders</Item> : null}
      {props.auth ? (
        <Item link="/logout"> Logout</Item>
      ) : (
        <Item link="/auth"> Login</Item>
      )}
    </ul>
  );
};

export default items;
