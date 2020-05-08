import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';

const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Artworks</NavigationItem>
        <NavigationItem link="/" exact>Aesthetes</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/aesthete/artworks">Aesthete</NavigationItem> : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">
            <Button btnType='Default' btnSize='Small'>Sign Up</Button></NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;