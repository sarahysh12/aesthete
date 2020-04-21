import React from 'react';
import './Search.css';

const search = (prpos) => (
    <div className="Search">
        <input placeholder="Search for Aesthetes Or artworks" type="text" name="search" onChange={prpos.changed}/>
    </div>
);

export default search;