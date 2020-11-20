import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement]
  if (!props.valid && props.touched){
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")} onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")} onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} onChange={props.changed} value={props.value}>
          {props.elementConfig.options.map((option) => {
            return (
              <option
                key={props.elementType + option.value}
                value={option.value}
              >
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={inputClasses.join(" ")} onChange={props.changed} {...props.elementConfig} />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.labe}</label>
      {inputElement}
    </div>
  );
};

export default input;
