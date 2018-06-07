import React from "react";
import classes from "./burger.css";
import Ingredients from "./ingredient/ingredient";
const burger = props => {
  console.log(" test array ", [...Array(4)], Array(5));
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, index) => {
      return <Ingredients key={igKey + index} type={igKey} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <Ingredients type="bread-top" />
      {transformedIngredients}
      <Ingredients type="bread-bottom" />
    </div>
  );
};

export default burger;
