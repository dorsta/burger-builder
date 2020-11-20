import React from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxilary";

const sideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.hide}/>
      <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} clicked={props.hide}/>
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
