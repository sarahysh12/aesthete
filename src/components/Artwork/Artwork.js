import React from 'react';
import './Artwork.css';

const artwork = (props) => (
    <article className="Artwork">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{props.category}</p>
        <p>{props.rating} Star</p>
        <p>{props.price} $/hr</p>
        <p><b>{props.artist}</b></p>
        <p>2020/02/20</p>
        <button>Crave</button>
    </article>
);

export default artwork;