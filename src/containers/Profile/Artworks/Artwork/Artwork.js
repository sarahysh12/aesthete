import React from 'react';
import classes from './Artwork.css';
import pic from '../../../../assets/images/artwork.jpg';

//TODO what's next on click show more

const artwork = (props) => {
    let subStringTitle = props.title.substring(0,35);
    if (props.title.length > 35) {
        subStringTitle += '...';
    }
    return (
        <article className={classes.Artwork}>
            <img src={pic}/>
            <div className={classes.ColoredTitle}><p>{props.category}</p></div>
            <div className={classes.Title}><p>{subStringTitle}</p></div>
            <div className={classes.Description}>
                <p>{props.description.substring(0, 350)} . . .  
                <span className={classes.ColoredText}> Show More</span>
                </p>
            </div>

        { /*<p>{props.rating} Star</p>
            <p>{props.price} $/hr</p> */}
        </article>
    );
  
};

export default artwork;