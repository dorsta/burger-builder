import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./Burgeringredient/Burgeringredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, index) => {
        return <BurgerIngredient key={ingredient + index} type={ingredient} />;
      });
    })
    .reduce((accumulative, every) => accumulative.concat(every),[]);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please choose your ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
