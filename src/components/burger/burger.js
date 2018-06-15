import React from "react";
import classes from "./burger.css";
import Ingredients from "./ingredient/ingredient";
const burger = props => {
  let transformedIngredients = <p> You don't have ingredients</p>;
  if (props.ingredients)
    transformedIngredients = Object.keys(props.ingredients)
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
