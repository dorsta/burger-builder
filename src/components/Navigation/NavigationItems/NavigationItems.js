import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.clicked} link='/' exact>Burger Builder</NavigationItem>
        {props.isAuth
            ? <NavigationItem clicked={props.clicked} link='/my-orders'>My Orders</NavigationItem>
            : null}
        {props.isAuth
            ? <NavigationItem clicked={props.clicked} link='/logout'>Log-out</NavigationItem>
            : <NavigationItem clicked={props.clicked} link='/auth'>Authenticate</NavigationItem>}
    </ul>
)

export default navigationItems;