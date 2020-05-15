import React, { Component } from "react";
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Artwork from '../../components/Artwork/Artwork';
import Button from '../../components/UI/Button/Button';
import Search from '../../components/Search/Search';
import Layout from '../../hoc/Layout/Layout';
import CheckList from '../../components/UI/CheckList/CheckList';
import RangeSlider from '../../components/UI/RangeSlider/RangeSlider';
import DropDownButton from '../../components/UI/DropDownButton/DropDownButton';

import DayPicker from 'react-day-picker';

import potteryPic from '../../assets/images/pottery.jpg';
import 'react-day-picker/lib/style.css';
import classes from './Home.module.css';
import 'react-input-range/lib/css/index.css';

// TODO add pagination
// TODO search not working when I delete characters
// TODO why render 3 times?
// TODO unselect all not working and unselect the cheekbox it doesn't work

class Home extends Component {

    constructor(props) {
        super(props);
        const { myKey } = this.props.match.params;
        this.state = {
            aesthetes: [],
            filteredArtworks: props.arts,
            isCraved: true,
            renderCount : 0,
            searchKey: myKey.slice(1),
            selectedCategories: [],
            value: { min: 1, max: 250 },
            startDate: new Date(),
            sortBy : ['Newest', 'Most Popular','Price: High to Low', 'Price: Low to High','Category']
        }
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

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

    getSearchResultByCategories = (updatedCategories) => {
        let artworkSearchResult = [];
        for(let cat of updatedCategories){
            var regex = new RegExp(cat);
            this.props.arts.some(artwork => {
                if(artwork.artworkData.artwork_type.toLowerCase().match(regex)){
                    artworkSearchResult.push(artwork)
                }
            });
        }
        this.setState({filteredArtworks: artworkSearchResult});
    }

    onClickArtCategory = (event) => {
        const updatedCategories = [
            ...this.state.selectedCategories
        ];
        updatedCategories.push(event.target.id);
        this.setState({selectedCategories: updatedCategories});
        this.getSearchResultByCategories(updatedCategories);
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
            <Layout color='White'>
                <div className={classes.Home}>
                    <div className={classes.SearchDiv}>
                        <div className={classes.SearchBar}>
                            <Search keypressed={this.onSearchHandler}/>
                            <div className={classes.Filters}>
                                <DropDownButton label='Art Categry'>
                                    <CheckList list={this.props.artCategories}/>
                                </DropDownButton>
                                <DropDownButton label='Date'>
                                    <DayPicker/>
                                </DropDownButton>
                                <DropDownButton label='Price'>
                                    <div className={classes.PriceRangeSlider}>
                                        <RangeSlider/>
                                    </div>
                                </DropDownButton>
                                <DropDownButton label='Sort By'>
                                    {this.state.sortBy.map((cat) => 
                                        <div className={classes.List}>
                                            <a>{cat}</a>
                                        </div>
                                    )}
                                </DropDownButton>
                            </div>
                        </div>
                        <div className={classes.Image}>
                            <img src={potteryPic} alt='potteryImg'/>
                        </div>
                    </div>
               
                    <section className={classes.Artworks}>
                        {arts}
                    </section>
                </div>
            </Layout>
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