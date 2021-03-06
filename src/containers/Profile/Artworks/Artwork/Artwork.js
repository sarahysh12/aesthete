import React from 'react';
import classes from './Artwork.module.css';
import pic from '../../../../assets/images/artwork.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/fontawesome-free-solid';
import Rating from '../../../../components/UI/Rating/Rating';


const artwork = (props) => {
    let subStringTitle = props.title.substring(0,35);
    if (props.title.length > 35) {
        subStringTitle += '...';
    }
    return (
        <article className={classes.Artwork}>
            <img src={pic} alt='pic'/>
            <div className={classes.ColoredTitle}>
                <p>{props.category}
                <span style={{float: 'right'}}><Rating id={props.id} ratingValue={props.rating}/> </span>
                </p>
            </div>
            <div className={classes.Title}><p>{subStringTitle}</p></div>
            <div className={classes.Description}>
                <p>{props.description.substring(0, 350)} . . .  
                <span className={classes.ColoredText} onClick={props.showMoreClicked}> Show More</span>
                </p>
            </div>
            <div className={classes.Icons}>
                <FontAwesomeIcon icon={faCoins}/><span style={{fontSize: '12px', paddingLeft: '10px'}}>${props.price} / hr</span>
            </div>
        </article>
    );
  
};

export default artwork;