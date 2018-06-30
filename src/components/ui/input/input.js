import React from "react";
import classes from "./input.css";

const input = props => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];
  if (props.errorMessage && props.shouldValidate && props.touched) {
    validationError = <p style={{}}> {props.errorMessage}</p>;
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementtype) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          onChange={props.changed}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementconfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );

      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
