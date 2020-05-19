import classes from  './DropDownButton.module.css';
import Button from '../Button/Button';
import React from 'react';

const dropDownButton = (props) => (
    <div className={classes.CategoryDropDown}>
        <Button btnType='Default' btnSize='Small' btnActive={props.isActive? 'Active': ''}>{props.label}</Button>
        <div className={classes.CategoryDropDownContent}>
            {props.children}
        </div>
    </div>
);

export default dropDownButton;