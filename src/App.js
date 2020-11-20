import React, { useEffect } from "react";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import { connect } from "react-redux";

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import Auth from "./containers/Auth/Auth";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout")
})

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders")
})

const App = (props) => {
  const {onCheckAuth} = props
  useEffect(() => {
    onCheckAuth();
  },[onCheckAuth])

    let routes = 
    <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/auth" component={Auth}/>
      <Redirect to={"/"}/>
    </Switch>

    if (props.isAuth) {
      routes = 
      <Switch>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/my-orders" component={asyncOrders}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/logout" component={Logout}/>
        <Redirect to={"/"}/>
      </Switch>
    }

    return (
    <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
    </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth: () => dispatch(actions.authCeckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
