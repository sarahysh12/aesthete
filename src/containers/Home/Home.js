import React, { Component } from "react";
import Search from '../../components/Search/Search';
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Artwork from '../../components/Artwork/Artwork';
import classes from './Home.css';
import cookingPic from '../../assets/images/cooking.jpg';
import Button from '../../components/UI/Button/Button';

// TODO add feature to artwork such as new, popular,etc
// TODO add pagination
// TODO search not working when I delete characters
class Home extends Component {

    constructor(props) {
        super(props);
        const { myKey } = this.props.match.params;
        this.state = {
            aesthetes: [],
            filteredArtworks: props.arts,
            isCraved: true,
            renderCount : 0,
            searchKey: myKey.slice(1)
        }
    }

    componentDidMount(){
        this.props.onFetchArtworks();
        this.props.onFetchArtists();
        // this.getSearchResult(this.state.searchKey); // not working maybe use props.loading
    }

    onSearchHandler = (evt) => {
        const keyword = evt.target.value;
        this.getSearchResult(keyword);
    }

    getSearchResult (keyword) {
        var regex = new RegExp(keyword);
        let artworkSearchResult = [];
        this.props.arts.some(artwork => {
            if(artwork.artworkData.artwork_type.toLowerCase().match(regex)){
                artworkSearchResult.push(artwork)
            }
        });
        this.setState({filteredArtworks: artworkSearchResult});
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
                    <Button btnType='Default' btnSize='Small'>Art Category</Button>
                    <Button btnType='Default' btnSize='Small'>Dates</Button>
                    <Button btnType='Default' btnSize='Small'>Price</Button>
                    <Button btnType='Default' btnSize='Small'>Sort By</Button>
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