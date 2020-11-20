import React from "react";

import Aux from "../../../hoc/Auxilary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
      {props.ingredients[key]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A tasty bveurguer with these ingredients:</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>Total price: {props.price.toFixed(2)}€</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancel} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
