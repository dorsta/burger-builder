import React from 'react';

import classes from './Button.module.css'

const button = props => (
    <button onClick={props.clicked} className={[classes.Button, classes[props.btnType], props.special ? classes.Special : null].join(' ')} disabled={props.disabled}>{props.children}</button>
);

export default button;