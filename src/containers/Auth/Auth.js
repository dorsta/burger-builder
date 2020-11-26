import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Auth = (props) => {
  const [controls, setControls] = useState({
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      pasword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(false)

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

  const changeHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidityHandler(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.pasword.value,
      isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignup((prevState) => {
      return !prevState;
    });
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementsArray.map((dataField) => (
    <Input
      key={dataField.id}
      changed={(event) => changeHandler(event, dataField.id)}
      elementType={dataField.config.elementType}
      elementConfig={dataField.config.elementConfig}
      value={dataField.config.value}
      valid={dataField.config.valid}
      touched={dataField.config.touched}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p style={{ color: "red" }}>
        {props.error.message.replace(/_/g, " ")}
      </p>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={"/"} />;
  }

  let className = [classes.AuthInModal];
  if (!props.inModal) {
    className.push(classes.NotInModal);
  }

  return (
    <div className={className.join(" ")}>
      <form onSubmit={submitHandler}>
        {errorMessage}
        {form}
        {authRedirect}
        <Button btnType="Success">
          {isSignup ? "SIGN-UP" : "SIGN-IN"}
        </Button>
      </form>
      <p style={{ marginBottom: "10px" }}>
        {!isSignup
          ? "Don't have an account?"
          : "Already have an account?"}
      </p>
      <Button btnType="Danger" special clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? "SIGN-IN" : "SIGN-UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
