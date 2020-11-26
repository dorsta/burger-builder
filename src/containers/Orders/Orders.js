import React, { useEffect } from "react";
import {connect} from 'react-redux'

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/whithErrorHandler/whithErrorHandler"
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {
  const {token, userId, onOrderInit} = props;

    useEffect(() => {
      onOrderInit(token, userId)
    }, [onOrderInit, token, userId])

    let  orders = props.orders ? (
      <div>
      {props.orders.map((order) =>
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />)}
    </div>
    ) : null
    if (props.loading) {
    orders = <Spinner/>;
    }
    return orders;
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderInit: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
