import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const checkout = (props) => {
  const returnHandler = () => {
    props.history.goBack();
  };

  const continueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let checkout = <Redirect to="/" />;
  if (props.ingr) {
    checkout = props.purchased ? <Redirect to="/" /> : (
      <div>
        <CheckoutSummary
          ingredients={props.ingr}
          return={returnHandler}
          continue={continueHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return checkout;
};

const mapStateToProps = (state) => {
  return {
    ingr: state.burgerBuilder.ingredients,
    ttlPrc: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
