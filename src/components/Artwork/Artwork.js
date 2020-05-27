import React from 'react';
import classes from './Artwork.module.css';
import pic from '../../assets/images/artwork.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/fontawesome-free-solid';
import Rating from '../UI/Rating/Rating';

const artwork = (props) => {
    // let subStringTitle = props.title.substring(0,35);
    // if (props.title.length > 35) {
    //     subStringTitle += '...';
    // }
    return (
        <article className={classes.Artwork}>
            <img src={pic} alt='pic'/>
            <div className={classes.ColoredTitle}>
                <p>{props.category}
                <span style={{float: 'right'}}><Rating id={props.id} ratingValue={props.rating}/> </span>
                </p>
            </div>
            <div className={classes.Title}><p>{props.title}</p></div>
            <div className={classes.Icons}>
                <FontAwesomeIcon icon={faCoins}/><span style={{fontSize: '12px', paddingLeft: '10px'}}>${props.price} / hr</span>
                <p>{props.date}</p>
            </div>
        </article>  
    );
  
};

export default artwork;