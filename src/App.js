import React, { useEffect, Suspense } from "react";
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import { connect } from "react-redux";

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout")
})

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders")
})

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth")
})


const App = (props) => {
  const {onCheckAuth} = props
  useEffect(() => {
    onCheckAuth();
  },[onCheckAuth])

    let routes = 
    <Switch>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/auth" render={(props) => <Auth {...props}/>}/>
      <Redirect to={"/"}/>
    </Switch>

    if (props.isAuth) {
      routes = 
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
        <Route path="/my-orders" render={(props) => <Orders{...props}/>}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/logout" component={Logout}/>
        <Redirect to={"/"}/>
      </Switch>
    }

    return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
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
