import React from 'react';
import classes from './CheckList.module.css';

const checkList = (props) => (
    <div>
        {props.list.map((cat) => 
            <div>
                <label className={classes.Container}>{cat}
                        <input type="checkbox" id={cat} onClick={props.clicked} value={cat}/>
                        <span className={classes.Checkmark}></span>
                </label>
            </div>
        )}
    </div>
);

export default checkList;