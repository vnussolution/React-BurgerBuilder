import React from "react";
import classes from "./buildControls.css";
import BuildControl from "./buildControl/buildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Subtotal is {props.price.toFixed(3)}</p>

      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          type={control.type}
          moreIngredient={() => props.addIngredient(control.type)}
          lessIngredient={() => props.removeIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        onClick={props.orderNow}
        className={classes.OrderButton}
        disabled={!props.purchaseable}
      >
        {props.auth ? "ORDER NOW" : "LOGIN TO ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
