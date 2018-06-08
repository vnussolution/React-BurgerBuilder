import React from "react";
import classes from "./burger.css";
import Ingredients from "./ingredient/ingredient";
const burger = props => {
  const arr = Array(2);
  console.log(" test array ", [...Array(4)], Array(5), ...arr);
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <Ingredients key={igKey + index} type={igKey} />;
      });
    })
    .reduce(
      (previousArray, currentElement) => previousArray.concat(currentElement),
      []
    );

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add your ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <Ingredients type="bread-top" />
      {transformedIngredients}
      <Ingredients type="bread-bottom" />
    </div>
  );
};

export default burger;
