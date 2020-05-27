import React from 'react';
import classes from './Search.module.css';

const search = (props) => (
    <div className={classes.Search}>
        <input placeholder="Search for Aesthetes Or artworks" type="text" name="search" defaultValue={props.val} onKeyPress={props.keypressed}/>
    </div>
);

export default search;