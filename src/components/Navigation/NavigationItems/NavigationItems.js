import React, { Component } from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../../UI/Button/Button';
import Auth from '../../../containers/Auth/Auth';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';

class NavigationItems extends Component {
    state = {
        modalIsOpen: false
    }
    showModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    render() {
        let signup = <Auth closeAuthentication={this.closeModal} />;
        return(
            <div>
                <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Artworks</NavigationItem>
                <NavigationItem link="/" exact>Aesthetes</NavigationItem>
                {!this.props.isAuthenticated
                    ? <Button btnType='Primary' btnSize='Small' clicked={this.showModal}>Log In</Button>
                    : <NavigationItem link="/logout"><Button btnType='Primary' btnSize='Small'>Logout</Button></NavigationItem>}
                </ul>

                <Modal show={this.state.modalIsOpen} closed={this.closeModal}>
                    {signup}
                </Modal>
                {this.state.modalIsOpen ? <Backdrop show/>: null} 
            </div>
        );
    }
}

export default NavigationItems;