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
// TODO why render 3 times?
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
        this.props.onFetchArtCategories();
        // this.getSearchResult(this.state.searchKey); // not working maybe use props.loading
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


    onClickArtCategory = () => {
        console.log(this.props.artCategories);
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
                        <img src={cookingPic} alt='cookingImg'/>
                    </div>
                </div>
                <div className={classes.Filters}>
                    <Button btnType='Default' btnSize='Small' clicked={this.onClickArtCategory}>Art Category</Button>
                    <div className={classes.CategoryDropDoown}>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>


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
        isAuthenticated: state.auth.token !== null,
        artCategories: state.cats.categories,
        loading: state.cats.loading
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchArtworks: () => dispatch(actions.fetchArtworks()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onFetchArtCategories: () => dispatch(actions.fetchArtCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home, axios);