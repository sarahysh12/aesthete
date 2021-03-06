import React, { Component } from "react";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import classes from './DatePicker.module.css';


class DatePicker extends Component {
    static defaultProps = {
        numberOfMonths: 2,
    };

    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state = this.getInitialState();
      }
    
      getInitialState() {
        return {
          from: undefined,
          to: undefined,
        };
      }
    
      handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
        this.props.selectDateRange(range);
      }
    
      handleResetClick() {
        this.setState(this.getInitialState());
      }

    render () {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <div>
                <p className={classes.ResetBtn}>
                {!from && !to && 'Please select the first day.'}
                {from && !to && 'Please select the last day.'}
                {from &&
                    to &&
                    `${from.toLocaleDateString()} to
                        ${to.toLocaleDateString()}`}{' '}
                {from && to && (
                    <button onClick={this.handleResetClick}>Reset</button>
                )}
                </p>
                <DayPicker
                    className={classes.Selectable}
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
};
export default DatePicker;