import React, { Component } from "react";
import {connect} from "react-redux"

import Aux from "../Auxilary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  showSideDrawerHandler = () => {
    this.setState((prevState => { return {showSideDrawer : !prevState.showSideDrawer}}))
  }

  render() {
    return (
      <Aux>
        <Toolbar
        isAuth={this.props.isAuthenticated}
        menuClick={this.showSideDrawerHandler}/>
        <SideDrawer
          show={this.state.showSideDrawer}
          hide={this.showSideDrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout);
