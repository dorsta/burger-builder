import React from "react";
import {NavLink} from 'react-router-dom';

import classes from "./NavigationItem.module.css";

const navigationItem = (props) => (
  <li onClick={props.clicked} className={classes.NavigationItem}>
    <NavLink className="NavLink" exact={props.exact} to={props.link} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
