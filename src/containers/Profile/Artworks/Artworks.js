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

class Artworks extends Component {

    state = {
        hasNewArtClicked : false
    }

    componentDidMount() {
        this.props.onFetchArtworkById(this.props.token, this.props.userId);
        this.props.onFetchUserData(this.props.token);
    }

    onAddNewArtwork = () => {
        // this.props.history.push('/aesthete/newart');
        this.setState({hasNewArtClicked: true});
    }

    newArtCancelHandler = () => {
        this.setState({hasNewArtClicked: false});
    }


    render () {
        let arts = <p>Artworks will load here</p>;
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
        }
        const artworks = (
            <div className={classes.ProfileArtworkList}>
                {arts}
                <div className={classes.AddArtwork} onClick={this.onAddNewArtwork}>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>
        );
        const newArt = <NewArtwork newArtCancelled={this.newArtCancelHandler}/>
        return (
            <Aux>
                <Modal show={this.state.hasNewArtClicked} modalClosed={this.newArtCancelHandler}>
                    {newArt}
                </Modal>
                {artworks}
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