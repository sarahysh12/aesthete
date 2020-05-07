import React, { Component } from "react";
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';
import CSSTransition from 'react-transition-group/CSSTransition';

class Modal extends Component {
    
    //TODO ????
    shouldComponentUpdate (nextProps, nexState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        const animationTiming = {
            enter: 400,
            enxit: 1000
        };
        return (
            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={this.props.show}
                timeout={animationTiming}
                classNames={{
                    enter:'',
                    enterActive:classes.ModalOpen,
                    exit: '',
                    exitActive: classes.ModalClose
                    }}>
                    <div className={classes.Modal}>
                        {this.props.children}
                    </div>
            </CSSTransition>
        );
    }

}

export default Modal;