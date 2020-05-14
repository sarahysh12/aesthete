import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    const cssClasses = [classes.Backdrop, props.show ? classes.BackropOpen : classes.BackdropClosed];
    return <div className={cssClasses.join(' ')}></div>
};

export default backdrop;