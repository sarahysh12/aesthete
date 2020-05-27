import React from 'react';
import Logo from '../../Logo/Logo';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = ( props ) => (
    <header className={[classes.Toolbar, classes[props.bgColor]].join(' ')}>
        <div className={classes.Logo}>
            <a href='/'><Logo/></a>
        </div>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;