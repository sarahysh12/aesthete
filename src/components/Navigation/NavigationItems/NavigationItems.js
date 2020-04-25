import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className='NavigationItems'>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/aesthete" exact>Aesthete</NavigationItem>
        {/* {props.isAuthenticated ? <NavigationItem link="/aesthete">Aesthete</NavigationItem> : null} */}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Authenticate</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;