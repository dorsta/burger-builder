import React, { useState } from "react";
import {connect} from "react-redux"

import Aux from "../Auxilary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const showSideDrawerHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }

    return (
      <Aux>
        <Toolbar
        isAuth={props.isAuthenticated}
        menuClick={showSideDrawerHandler}/>
        <SideDrawer
          show={showSideDrawer}
          hide={showSideDrawerHandler}
          isAuth={props.isAuthenticated}
        />
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
