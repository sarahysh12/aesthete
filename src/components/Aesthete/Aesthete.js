import React from 'react';
import classes from './Aesthete.css';

const aesthete = (props) => (
    <article className={classes.Aesthete}>
        <h3>{props.name}</h3>
        <p>Speciality: {props.speciality}</p>
        <p>{props.rating} Star</p>
        <button onClick={props.aestheteClicked}>Chit Chat</button>
    </article>
);

export default aesthete;