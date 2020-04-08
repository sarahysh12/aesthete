import React from 'react';

const artwork = (props) => (
    <article>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <p>{props.category}</p>
        <p>{props.rating}</p>
        <p>{props.price}</p>
        <p><b>{props.artist}</b></p>
        <p>2020/02/20</p>
        <hr/>
    </article>
);

export default artwork;