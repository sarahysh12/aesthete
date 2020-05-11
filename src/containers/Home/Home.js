import React, { Component } from "react";
import Search from '../../components/Search/Search';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Artwork from '../../components/Artwork/Artwork';
import classes from './Home.css';
import cookingPic from '../../assets/images/cooking.jpg';

// TODO add feature to artwork such as new, popular,etc
// TODO add pagination
class Home extends Component {

    constructor(props) {
        super(props);
        const { myKey } = this.props.match.params;
        this.state = {
            aesthetes: [],
            filteredArtworks: props.arts,
            filteredAesthetes: props.artists,
            isCraved: true,
            renderCount : 0,
            searchKey: myKey
        }
    }

    componentDidMount(){
        this.props.onFetchArtworks();
        this.props.onFetchArtists();
        this.getSearchResult(this.state.searchKey)
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

    getSearchResult (keyword) {
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

    onSearchHandler = (evt) => {
        const keyword = evt.target.value;
        this.getSearchResult(keyword);
    }

    render() {
        let arts = null;
        let artSource = this.props.arts;

        if(this.state.filteredArtworks.length > 0) {
            artSource = this.state.filteredArtworks;
        }
        else {
            artSource = this.props.arts;
        }
        arts = artSource.map(art => {
            return (
                <Artwork 
                    key = {art.id}
                    title={art.artworkData.artwork_title}
                    category={art.artworkData.artwork_type}
                    price={art.artworkData.price}
                    rating={art.rating}/>
            );
        });


        return (
            <div>
                <div className={classes.SearchDiv}>
                    <div className={classes.SearchBar}>
                        <Search keypressed={this.onSearchHandler}/>
                    </div>
                    <div className={classes.Image}>
                        <img src={cookingPic}/>
                    </div>
                </div>
                <div className={classes.Filters}>
                    
                </div>
                <section className={classes.Artworks}>
                    {arts}
                </section>
            </div>
        );
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