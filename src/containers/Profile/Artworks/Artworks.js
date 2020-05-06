import React, { Component } from 'react';
import classes from './Artworks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import Artwork from './Artwork/Artwork';
import  { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Aux/Aux';
import Modal from '../../../components/UI/Modal/Modal';
import NewArtwork from '../NewArtwork/NewArtwork';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Transition from 'react-transition-group/Transition';

class Artworks extends Component {

    state = {
        // hasNewArtClicked : false,
        modalIsOpen: false,
        showBlock: false
    }

    componentDidMount() {
        this.props.onFetchArtworkById(this.props.token, this.props.userId);
        this.props.onFetchUserData(this.props.token);
    }

    showModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    // onAddNewArtwork = () => {
    //     // this.props.history.push('/aesthete/newart');
    //     this.setState({hasNewArtClicked: true});
    // }

    // newArtCancelHandler = () => {
    //     this.setState({hasNewArtClicked: false});
    // }


    render () {
        let arts = null;
        let addArt = null;
        if ( !this.props.loading ) {
            arts = this.props.artworks.map(art => {
                return (
                    <Artwork 
                        key = {art.id}
                        id = {art.id}
                        title={art.artworkData.artwork_title}
                        category={art.artworkData.artwork_type}
                        description={art.artworkData.artwork_description}
                        artist={art.userId}
                        price={art.artworkData.price}
                        rating={art.rating}
                        date={art.created_date}/>
                );
            }); 
            addArt = (
                <div className={classes.AddArtwork} onClick={this.showModal}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            );
        }
        const newArt = <NewArtwork newArtCancelled={this.closeModal}/>
        return (
            <Aux>
                
                <div className={classes.ProfileArtworkList}>
                    {arts}
                    {addArt}
                </div>

                <Modal show={this.state.modalIsOpen} closed={this.closeModal}>
                    {newArt}
                </Modal>
                {this.state.modalIsOpen ? <Backdrop show/>: null} 
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        userId : state.auth.userId,
        token: state.auth.token,
        artworks: state.artwork.artworks,
        loading: state.artwork.loading
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchArtworkById: (token, userId) => dispatch(actions.fetchArtworksByUserId(token, userId)),
        onFetchUserData: (token) => dispatch(actions.fetchUserData(token))

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Artworks);