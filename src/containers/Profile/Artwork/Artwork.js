import React from 'react';
import classes from './Artwork.css';
import pic from '../../../assets/images/artwork.jpg';

const artwork = (props) => (
    <article className={classes.Artwork}>
        <img src={pic}/>
        <p className={classes.ColoredTitle}>{props.category}<br/></p>
        <p className={classes.Title}>{props.title}</p>
        <p className={classes.Description}>{props.description}</p>

       { /*<p>{props.rating} Star</p>
        <p>{props.price} $/hr</p> */}
    </article>
);

export default artwork;