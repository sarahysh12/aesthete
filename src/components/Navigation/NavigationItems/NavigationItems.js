import React, { Component } from 'react';
import classes from './NavigationItems.css';
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
                {this.props.isAuthenticated ? <NavigationItem link="/aesthete/artworks">Aesthete</NavigationItem> : null}
                {!this.props.isAuthenticated
                    ? <Button btnType='Default' btnSize='Small' clicked={this.showModal}>Sign Up</Button>
                    : <Button btnType='Default' btnSize='Small'>Logout</Button>}

                {/* {!this.props.isAuthenticated
                    ? <NavigationItem link="/auth">
                    <Button btnType='Default' btnSize='Small'>Sign Up</Button></NavigationItem>
                    : <NavigationItem link="/logout">Logout</NavigationItem>}
                 */}
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