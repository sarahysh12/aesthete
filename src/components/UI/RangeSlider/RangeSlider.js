import './RangeSlider.module.css';
import React from 'react';
import InputRange from 'react-input-range';

class RangeSlider extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: this.props.default };
    }

    rangeSelected = (e) => {
        this.props.selectRange(e)
    }
   
    render() {
      return (
        <InputRange
          maxValue={this.props.max}
          minValue={this.props.min}
          value={this.state.value}
          onChange={value => this.setState({ value })}
          onChangeComplete={ this.rangeSelected} />
      );
    }
  }

export default RangeSlider;