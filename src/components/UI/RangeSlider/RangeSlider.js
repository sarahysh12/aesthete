import './RangeSlider.module.css';
import React from 'react';
import InputRange from 'react-input-range';

const rangeSlider = (props) => (
    <InputRange
        maxValue={500}
        minValue={0}
        value={props.value} />
        // onChange={value => this.setState({ value })} />
);

export default rangeSlider;