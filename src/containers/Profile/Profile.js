import React, { Component } from "react";
import classes from './Profile.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import profilePic from '../../assets/images/pic.png';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import Bio from './Bio/Bio';
import NewArtwork from './NewArtwork/NewArtwork';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Artworks from './Artworks/Artworks';
import FullArtwork from './FullArtwork/FullArtwork';



class Profile extends Component {
    state = {
        isPlusClicked: false
    }
    componentDidMount() {
        this.props.onFetchArtworkById(this.props.token, this.props.userId);
        this.props.onFetchUserData(this.props.token);
    }


    render() {
        let bio = null;
        if ( !this.props.loading && this.props.email ) {
            bio = <Bio isLoading={this.props.loading} user={this.props.email}/>
        }
        let navigations = (
            <ul className={classes.ProfileNavItems}>
                        <NavigationItem link={this.props.match.path+"/artworks"} whiteNav>Artworks</NavigationItem>
                        <NavigationItem link={this.props.match.path+"/newart"} whiteNav>New Artwork</NavigationItem>
                        <NavigationItem link="/" whiteNav>Contact Me</NavigationItem>
            </ul>
        );

        //TODO add filter by category
        return (
            <div>
                <div className={classes.ProfileCover}>
                    <div>
                        <img className={classes.ProfilePic} src={profilePic} alt="profile pic"/>
                    </div>
                </div>
                {navigations}
                <div className={classes.Profile}>
                    <div className={classes.ProfileBio}>
                       {bio}
                    </div>
                    <div className={classes.ProfileContent}>
                        <Switch>
                            <Route  path='/aesthete/artworks/:artid' component={FullArtwork}/>
                            <Route  path='/aesthete/artworks' component={Artworks}/>
                            <Route  path='/aesthete/newart' component={NewArtwork}/>
                            <Redirect to='/aesthete/artworks' />
                        </Switch>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId : state.auth.userId,
        email: state.auth.email,
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



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));