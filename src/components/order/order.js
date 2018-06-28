import React from "react";
import classes from "./order.css";
const order = () => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: Salad (1), bacon (2)</p>
      <p>Price: 45.30</p>
    </div>
  );
};

export default order;
