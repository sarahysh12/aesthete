import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';
import { render } from 'react-dom';

const navigationItem = ( props ) => {
    const navigationClasses = [classes.NavigationItem];
    if(props.whiteNav) {
        navigationClasses.push(classes.WhiteNavigation);
    }
    return (
        <li className={navigationClasses.join(' ')}>
            <NavLink 
                to={props.link}
                exact={props.exact}
                activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    );
};

export default navigationItem;