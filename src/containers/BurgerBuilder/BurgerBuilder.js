import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/whithErrorHandler/whithErrorHandler";
import * as actions from "../../store/actions/index";
import Auth from "../Auth/Auth";

export const BurgerBuilder = (props) => {
  const [checkout, setCheckout] = useState(false);

  const dispatch = useDispatch();

  const ingr = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const ttlPrc = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const prchsbl = useSelector((state) => {
    return state.burgerBuilder.purchasable;
  });
  const err = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });
  const isBuilding = useSelector((state) => {
    return state.burgerBuilder.isBuilding;
  });

  const onAddIngredient = (ingredientType) =>
    dispatch(actions.add(ingredientType));
  const onRemoveIngredient = (ingredientType) =>
    dispatch(actions.remove(ingredientType));
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onPurchased = () => dispatch(actions.purchseInit());

  useEffect(() => {
    if (!isBuilding) {
      onInitIngredients();
    }
  }, [isBuilding, onInitIngredients]);

  const checkoutHandler = () => {
    setCheckout((prevState) => {
      return !prevState;
    });
  };

  const checkoutContinueHandler = () => {
    // alert('You continue!');
    // you need to do important calculations on the server, so the user wouldn't manipulate the code
    onPurchased();
    props.history.push({ pathname: "/checkout" });
  };

  const isDisabledInfo = {
    ...ingr,
  };
  for (let key in isDisabledInfo) {
    isDisabledInfo[key] = isDisabledInfo[key] === 0;
  }

  let orderSummary = null;
  if (ingr) {
    orderSummary = (
      <OrderSummary
        ingredients={ingr}
        cancel={checkoutHandler}
        continue={checkoutContinueHandler}
        price={ttlPrc}
      />
    );
  }
  let burger = err ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (ingr) {
    burger = (
      <Aux>
        <Burger ingredients={ingr} />
        <BuildControls
          isAuth={isAuthenticated}
          add={onAddIngredient}
          remove={onRemoveIngredient}
          isDisabled={isDisabledInfo}
          price={ttlPrc}
          purchasable={prchsbl}
          checkout={checkoutHandler}
        />
      </Aux>
    );
  }
  return (
    <Aux>
      <Modal show={checkout} clicked={checkoutHandler}>
        {isAuthenticated ? orderSummary : <Auth inModal />}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
