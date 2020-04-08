import React from 'react';
import './Aesthete.css';

const aesthete = (props) => (
    <article className="Aesthete">
        <h3>{props.name}</h3>
        <p>Speciality: {props.speciality}</p>
        <p>{props.rating} Star</p>
        <button>Chit Chat</button>
    </article>
);

export default aesthete;