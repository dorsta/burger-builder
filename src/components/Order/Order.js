import React from "react";

import classes from "./Order.module.css";

const order = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push(
      <span
        key={key}
        style={{
          textTransform: "capitalize",
          display: "inline" ,
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
          lineHeight: "200%",
        }}
      >
        {key}:&nbsp;{props.ingredients[key]}{" "}
      </span>
    );
  }
  return (
    <div className={classes.Order}>
      <p>Ingredinets: {ingredients}</p>
      <p>Price: {Number.parseFloat(props.price).toFixed(2)}€</p>
    </div>
  );
};

export default order;
