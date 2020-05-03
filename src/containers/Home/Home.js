import React, { Component } from 'react';
import classes from './Home.css';
import axios from '../../axios';
import Artwork from '../../components/Artwork/Artwork';
import Aesthete from '../../components/Aesthete/Aesthete';
import Search from '../../components/Search/Search';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aesthetes: [],
            filteredArtworks: props.arts,
            filteredAesthetes: props.artists,
            isCraved: true,
            renderCount : 0
        }
    }

    componentDidMount() {
        this.props.onFetchArtworks()
        this.props.onFetchArtists()
    }

    onSearchHandler = (evt) => {
        const keyword = evt.target.value;
        var regex = new RegExp(keyword);
        let artworkSearchResult = [];
        this.props.arts.some(artwork => {
            if(artwork.artwork_type.toLowerCase().match(regex)){
                artworkSearchResult.push(artwork)
            }
        });
        this.setState({filteredArtworks: artworkSearchResult})

        let aestheteSearchResult = [];
        this.props.artists.some(aesthete => {
            for (let cat of aesthete.category){
                if(cat.toLowerCase().match(regex)){
                    if(aestheteSearchResult.find(item => item.aesthete_full_name === aesthete.aesthete_full_name)){
                        continue
                    } else {
                        aestheteSearchResult.push(aesthete)
                    }
                }
            }
        });
        this.setState({filteredAesthetes: aestheteSearchResult})
    }

    onCraveClickedHandler (art_id) {
        this.setState({isCraved: !this.state.isCraved})
        if (this.state.isCraved) {
            // Send request to the aesthete he/she has 
        } else {
            // Cancel the request to aesthete
        }
    }

    //TODO add id for user
    onAestheteClickedHandler (username) {
        if(this.props.isAuthenticated) {
            this.props.history.push('/aesthete');
        } else {
            this.props.onSetAuthRedirectPath('/aesthete');
            this.props.history.push('/auth');
        }        
    }

    // TODO isCraved change all button names
    render() {
        let arts = null;
        let artSource = this.props.arts;

        if(this.state.filteredArtworks.length > 0) {
            artSource = this.state.filteredArtworks
        }
        else {
            artSource = this.props.arts
        }
        //TODO make this dynamic for names
        //TODO convert userId to name
        arts = artSource.map(art => {
            return (
                <Artwork 
                    key = {art.id}
                    title={art.artworkData.artwork_title}
                    category={art.artworkData.artwork_type}
                    description={art.artworkData.artwork_description}
                    artist={art.userId}
                    price={art.artworkData.price}
                    rating={art.artworkData.rating}
                    date={art.created_date}
                    craveClicked={() => this.onCraveClickedHandler(art.id)}
                    isCraveSelected={this.state.isCraved}/>
            );
        });

        let artists = null;
        let artistSource = this.props.artists;
        if(this.state.filteredArtworks.length > 0) {
            artistSource = this.state.filteredAesthetes
        }
        else {
            artistSource = this.props.artists
        }
        // artists = artistSource.map(artist => {
        //     return (
        //         <Aesthete 
        //             key = {artist.id}
        //             name={artist.aesthete_full_name}
        //             speciality={artist.category}
        //             rating={artist.rating}
        //             aestheteClicked={() => this.onAestheteClickedHandler(artist.aesthete_username)}/>
        //     );
        // });

        //TODO side bar nav bar
        //TODO show the full size search bar in mobile view
        return (
            <div>
                <div className={classes.Home}>
                    <Search changed={this.onSearchHandler}/>
                    <h1>ArtWorks</h1>
                    <section className={classes.Artworks}>
                        {arts}
                    </section>
                    <hr/>
                    <h1>Aesthetes</h1> 
                    <section className={classes.Aesthetes}>
                        {artists}
                    </section>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        arts: state.artwork.artworks,
        artists: state.aesthete.aesthetes,
        isAuthenticated: state.auth.token !== null
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchArtworks: () => dispatch(actions.fetchArtworks()),
        onFetchArtists: () => dispatch(actions.fetchAesthetes()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home, axios);

