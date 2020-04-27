import React from 'react';
import classes from './Artwork.css';

const artwork = (props) => (
    <article className={classes.Artwork}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{props.category}</p>
        <p>{props.rating} Star</p>
        <p>{props.price} $/hr</p>
        <p><b>{props.artist}</b></p>
        <p>{Date(props.date)}</p>
        <button onClick={props.craveClicked}>{props.isCraveSelected ? 'Crave' : 'Uncrave'}</button>
    </article>
);

export default artwork;