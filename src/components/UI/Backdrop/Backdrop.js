import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    const cssClasses = [classes.Backdrop, props.show ? classes.BackdropOpen : classes.BackdropClosed];
    return <div className={cssClasses.join(' ')} onClick={props.clicked}></div>
};

export default backdrop;