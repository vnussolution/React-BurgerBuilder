import React from "react";
import classes from "./order.css";
const order = props => {
  const ingredients = [];

  for (let ingredient in props.ingredients) {
    ingredients.push({
      ingredient: ingredient,
      amount: props.ingredients[ingredient]
    });
  }

  const ingredientsOutput = ingredients.map(i => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: " 0 8px",
          padding: "5px",
          border: "1px solid #ccc"
        }}
        key={i.ingredient}
      >
        {i.ingredient}: {i.amount}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientsOutput}</p>
      <p>Price: {Number.parseFloat(props.price).toFixed(2)}</p>
      <span className={classes.DeleteOrder} onClick={props.deleteOrder}>
        X
      </span>
    </div>
  );
};

export default order;
