import React, { useState } from "react";
import {connect} from 'react-redux';

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index"
import withErrorHandler from "../../../hoc/whithErrorHandler/whithErrorHandler";

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Your Name" },
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Street" },
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Postal Code" },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: { type: "email", placeholder: "E-mail" },
      value: "",
      validation: { required: true },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheepest", displayValue: "Cheepest" },
        ],
      },
      value: "fastest",
      valid: true,
      validation:{},
    },
  },)
  const [formIsValid, setFormIsValid] = useState(false)

  const orderHandler = (event) => {
    event.preventDefault();
    const copyOfOrderForm = {};
    for (let inputLine in orderForm) {
      copyOfOrderForm[inputLine] = orderForm[inputLine].value;
    }
    const order = {
      userId: props.userId,
      ingredients: props.ingr,
      price: props.ttlPrc,
      orderForm: copyOfOrderForm,
    };
    props.onOrder(order, props.token)
  };

  const changeHandler = (event, identifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedOrderFormElement = { ...updatedOrderForm[identifier] }; //we need to copy the inner objects because they would still reffer to the original data
    updatedOrderFormElement.value = event.target.value;
    updatedOrderFormElement.valid = checkValidityHandler(
      updatedOrderFormElement.value,
      updatedOrderFormElement.validation
    );
    updatedOrderFormElement.touched = true;
    updatedOrderForm[identifier] = updatedOrderFormElement;

    let formIsValid = true;
    for (let elementIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[elementIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  };

  const checkValidityHandler = (value, rules) => {
    let isValid = true;

    if (isValid) {
      if (rules.required) {
        isValid = value.trim() !== "";
      }
    }

    if (isValid) {
      if (rules.minLength) {
        isValid = value.length >= rules.minLength;
      }
    }

    if (isValid) {
      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength;
      }
    }

    return isValid;
  };

    const contactDataArray = [];
    for (let key in orderForm) {
      contactDataArray.push({
        id: key,
        config: orderForm[key],
      });
    }

    let form = (
      <form onSubmit={orderHandler}>
        {contactDataArray.map((dataField) => {
          return (
            <Input
              key={dataField.id}
              changed={(event) => changeHandler(event, dataField.id)}
              elementType={dataField.config.elementType}
              elementConfig={dataField.config.elementConfig}
              value={dataField.config.value}
              valid={dataField.config.valid}
              touched={dataField.config.touched}
            />
          );
        })}
        <Button
          inputtype="text"
          btnType="Success"
          disabled={!formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (props.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    ttlPrc: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrder: (orderData, token) => dispatch(actions.purchaseBurgerStart(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
