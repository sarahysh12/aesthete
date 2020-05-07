import React from 'react';
import classes from './Rating.css';

//TODO implement change handlere and disable (read only)
const rating = (props) => (
        <span className={classes.starRating}>
            <input id="rating5" type="radio" name={props.id} value="5" checked={props.ratingValue === 5} />
            <label htmlFor="rating5">5</label>
            <input id="rating4" type="radio" name={props.id} value="4" checked={props.ratingValue === 4}/>
            <label htmlFor="rating4">4</label>
            <input id="rating3" type="radio" name={props.id}value="3"  checked={props.ratingValue === 3}/>
            <label htmlFor="rating3">3</label>
            <input id="rating2" type="radio" name={props.id} value="2" checked={props.ratingValue === 2}/>
            <label htmlFor="rating2">2</label>
            <input id="rating1" type="radio" name={props.id} value="1" checked={props.ratingValue === 1}/>
            <label htmlFor="rating1">1</label>
        </span> 

);

export default rating;