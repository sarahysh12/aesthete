import React from 'react';
import classes from './Artwork.css';
import pic from '../../../../assets/images/artwork.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faStar } from '@fortawesome/fontawesome-free-solid';

//TODO what's next on click show more

const artwork = (props) => {
    let subStringTitle = props.title.substring(0,35);
    if (props.title.length > 35) {
        subStringTitle += '...';
    }
    return (
        <article className={classes.Artwork}>
            <img src={pic}/>
            <div className={classes.ColoredTitle}>
                <p>{props.category}</p>
                <div>
                    {/* <fieldset className={classes.rating}>
                        <input type="radio" id="star5" name="rating" value="5" /><label className={classes.full} for="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className='full' for="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" /><label className = "full" for="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" for="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" /><label className = "full" for="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" /><label className = "full" for="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" for="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" /><label className = "full" for="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset> */}

                    <span className={classes.starRating}>
                        <input id="rating5" type="radio" name="rating" value="5"/>
                        <label for="rating5">5</label>
                        <input id="rating4" type="radio" name="rating" value="4"/>
                        <label for="rating4">4</label>
                        <input id="rating3" type="radio" name="rating" value="3"/>
                        <label for="rating3">3</label>
                        <input id="rating2" type="radio" name="rating" value="2"/>
                        <label for="rating2">2</label>
                        <input id="rating1" type="radio" name="rating" value="1"/>
                        <label for="rating1">1</label>
                    </span>

                </div>
            </div>
            <div className={classes.Title}><p>{subStringTitle}</p></div>
            <div className={classes.Description}>
                <p>{props.description.substring(0, 350)} . . .  
                <span className={classes.ColoredText}> Show More</span>
                </p>
            </div>
            <div className={classes.Icons}>
                <FontAwesomeIcon icon={faCoins}/><span style={{fontSize: '12px', paddingLeft: '10px'}}>${props.price} / hr</span>
            </div>
        </article>
    );
  
};

export default artwork;