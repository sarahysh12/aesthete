import React from 'react';
import classes from './Search.css';

const search = (prpos) => (
    <div className={classes.Search}>
        <input placeholder="Search for Aesthetes Or artworks" type="text" name="search" onKeyPress={prpos.keypressed}/>
    </div>
);

export default search;