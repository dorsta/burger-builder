import React, { useState, useEffect } from "react";
import {connect} from 'react-redux'

import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from '../../axios-orders'
import withErrorHandler from "../../hoc/whithErrorHandler/whithErrorHandler";
import * as actions from "../../store/actions/index";
import Auth from "../Auth/Auth";

export const BurgerBuilder = (props) => {
  const [checkout, setCheckout] = useState(false)
  const {isBuilding, onInitIngredients} = props;

  useEffect(() => {
    if (!isBuilding){
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
    props.onPurchased();
    props.history.push({ pathname: "/checkout",});
  };

    const isDisabledInfo = {
      ...props.ingr,
    };
    for (let key in isDisabledInfo) {
      isDisabledInfo[key] = isDisabledInfo[key] === 0;
    }

    let orderSummary = null;
    if (props.ingr) {
      orderSummary = (
        <OrderSummary
          ingredients={props.ingr}
          cancel={checkoutHandler}
          continue={(checkoutContinueHandler)}
          price={props.ttlPrc}
        />
      );
    }
    let burger = props.err? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (props.ingr) {
      burger = (
        <Aux>
          <Burger ingredients={props.ingr} />
          <BuildControls
            isAuth={props.isAuthenticated}
            add={props.onAddIngredient}
            remove={props.onRemoveIngredient}
            isDisabled={isDisabledInfo}
            price={props.ttlPrc}
            purchasable={props.prchsbl}
            checkout={checkoutHandler}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal show={checkout} clicked={checkoutHandler}>
          {props.isAuthenticated ? orderSummary : <Auth inModal/>}
        </Modal>
        {burger}
      </Aux>
    );
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    ttlPrc: state.burgerBuilder.totalPrice,
    prchsbl: state.burgerBuilder.purchasable,
    err: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.isBuilding
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientType) => dispatch(actions.add(ingredientType)),
    onRemoveIngredient: (ingredientType) => dispatch(actions.remove(ingredientType)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchased: () => dispatch(actions.purchseInit())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
