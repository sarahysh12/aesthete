import React, { Component } from 'react';
import classes from './FullArtwork.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import pic from '../../../assets/images/artwork.jpg';

//TOOD maybe we need getArtworkById in redux

class FullArtwork extends Component {
    state = {
        artworkId: ''
    }
    componentDidMount() {
        this.props.onFetchArtworkById(this.props.token, this.props.userId);
        this.props.onFetchUserData(this.props.token);
        this.setState({artworkId: this.props.match.params.artid});
    }
    
    render() {
        let artwork = null;
        if ( !this.props.loading ) {
            const selectedArt = this.props.artworks.filter(art => art.id === this.state.artworkId);
            if(selectedArt.length > 0) {
                artwork = (
                    <div className={classes.FullArtwork}>
                        <div className={classes.Content}>
                            <div className={classes.Title}>{selectedArt[0].artworkData.artwork_title}</div>
                            <p>{selectedArt[0].artworkData.artwork_description}</p>
                        </div>
                        <div className={classes.Image}>
                            <img src={pic} alt='pic'/>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className={classes.FullArtwork}>
                {artwork}
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(FullArtwork);