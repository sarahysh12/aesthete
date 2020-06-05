import React, { Component } from "react";
import axios from '../../axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Artwork from '../../components/Artwork/Artwork';
import Search from '../../components/Search/Search';
import Layout from '../../hoc/Layout/Layout';
import CheckList from '../../components/UI/CheckList/CheckList';
import RangeSlider from '../../components/UI/RangeSlider/RangeSlider';
import DropDownButton from '../../components/UI/DropDownButton/DropDownButton';
import DatePicker from '../../components/UI/DatePicker/DatePicker';

import potteryPic from '../../assets/images/pottery.jpg';
import 'react-day-picker/lib/style.css';
import classes from './Home.module.css';
import 'react-input-range/lib/css/index.css';

import { convertTimestampToDate, convertDateToTimestamp, convertToISO } from '../../shared/utility';

import Pagination from '../../components/UI/Pagination/Pagination';

// TODO why render 3 times?
// TODO add unselect all
// TODO if there is no data display Spinner
// TODO clear checklist
// TODO url doesn't change by search and : is not correct format
// TODO sort doesn't work for last item of the list

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
            priceRangeValue: { min: 1, max: 250 },
            dateRangeValue: {start: null, end: null},
            sortBy : ['Newest', 'Most Popular','Price: High to Low', 'Price: Low to High'],
            sortType : 'Sort By',
            selectedPrice: 0

        }
    }

    componentDidMount(){
        if(this.state.searchKey === '') {
            this.props.onFetchArtworks();
        } else {
            this.props.onSearchArtworks(this.state.searchKey);
        }
        this.props.onFetchArtCategories();
    }

    onSearchHandler = (evt) => {
        const keyword = evt.target.value;
        if(keyword === '') {
            this.props.onFetchArtworks();
        } 
        if(evt.key === 'Enter'){
            this.props.onSearchArtworks(keyword);
        }
    }

    getSearchResultByCategories = (updatedCategories) => {
        let artworkSearchResult = [];
        for(let cat of updatedCategories) {
            var regex = new RegExp(cat);
            this.props.arts.some(artwork => {
                if(artwork.artworkData.artwork_type.toLowerCase().match(regex)){
                    artworkSearchResult.push(artwork)
                }
            });
        }
        this.setState({filteredArtworks: artworkSearchResult});
    }

    sortSearchResultByDate = () => {
        let artSource = this.props.arts;
        if (this.state.filteredArtworks.length > 0){
            artSource = this.state.filteredArtworks;
        }
        let sortedArtworks = artSource.sort(function(a, b){
            return b.created_date - a.created_date;
        });
        this.setState({filteredArtworks: sortedArtworks});
    }

    onClickArtCategory = (event) => {
        const isChecked = event.target.checked;
        const inputValue = event.target.id;
        let updatedCategories = [
            ...this.state.selectedCategories
        ];
        if (isChecked){
            updatedCategories.push(inputValue);
        } else {
            updatedCategories = updatedCategories.filter(item => item !== inputValue);
        }
        this.getSearchResultByCategories(updatedCategories);
        this.setState({selectedCategories: updatedCategories});
    }

    onRemoveTag = (cat) => {
        let updatedCategories = [
            ...this.state.selectedCategories
        ];
        updatedCategories = updatedCategories.filter(item => item !== cat);
        this.getSearchResultByCategories(updatedCategories);
        this.setState({selectedCategories: updatedCategories});
    }
    
    sortSearchResultByPrice = (type) => {
        let artSource = this.props.arts;
        if (this.state.filteredArtworks.length > 0){
            artSource = this.state.filteredArtworks;
        }
        let sortedArtworks = artSource.sort(function(a, b){
            if (type === 'asc') {
                return a.artworkData.price  - b.artworkData.price;
            } else {
                return b.artworkData.price - a.artworkData.price;
            }
        });
        this.setState({filteredArtworks: sortedArtworks});
    }

    getSearchResultByRating = () => {
        let sortedArtworks = this.state.filteredArtworks.sort(function(a, b){
                return b.rating  - a.rating;
        });
        this.setState({filteredArtworks: sortedArtworks});
    }

    onSelectSortType = (event) => {
        const sortBy = event.target.textContent;
        switch (sortBy) {
            case 'Newest':
                this.sortSearchResultByDate();
                break;
            case 'Price: High to Low':
                this.sortSearchResultByPrice('desc');
                break;
            case 'Price: Low to High':
                this.sortSearchResultByPrice('asc');
                break;
            case 'Most Popular':
                this.getSearchResultByRating();
            default:
                this.setState({sortType:sortBy});
        }
    }

    onSelectPriceRange = (val) => {
        let artSource = this.props.arts;
        if (this.state.filteredArtworks.length > 0){
            artSource = this.state.filteredArtworks;
        }
        this.setState({selectedPrice: val}); 
        let artworkSearchResult = [];
        artSource.some(artwork => {
            if(artwork.artworkData.price <= this.state.selectedPrice){
                artworkSearchResult.push(artwork)
            }
        });
        this.setState({filteredArtworks: artworkSearchResult});

    }

    onSelectDateRange = (range) => {
        this.setState({dateRangeValue: {start: range.from, end: range.to}});
        if (this.state.dateRangeValue.end !== null){
            let artworkSearchResult = [];
            this.state.filteredArtworks.find(artwork => {
                if((artwork.created_date >= convertDateToTimestamp(range.from)) && (artwork.created_date <= convertDateToTimestamp(range.to))){
                    artworkSearchResult.push(artwork);
                }
            });
            this.setState({filteredArtworks: artworkSearchResult});
        }
    }

    callBackFuntion = (slicedData) => {
        this.setState({filteredArtworks: slicedData});
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
                    date={convertTimestampToDate(art.created_date)}
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
                            <Search keypressed={this.onSearchHandler} val={this.state.searchKey}/>
                            <div className={classes.Filters}>
                                <DropDownButton label='Art Categry' isActive={this.state.selectedCategories.length > 0}>
                                    <CheckList list={this.props.artCategories} clicked={this.onClickArtCategory}/>
                                </DropDownButton>
                                <DropDownButton label={this.state.dateRangeValue.end ? convertToISO(this.state.dateRangeValue.start)+' to '+convertToISO(this.state.dateRangeValue.end): 'Date'} isActive={this.state.dateRangeValue.end !== null}>
                                    <div className={classes.DatePicker}>
                                        <DatePicker selectDateRange={this.onSelectDateRange}/>
                                    </div>
                                </DropDownButton>
                                <DropDownButton label={this.state.selectedPrice === 0 ?'Price': '$1-'+this.state.selectedPrice} isActive={this.state.selectedPrice !== 0}>
                                    <div className={classes.PriceRangeSlider}>
                                        <RangeSlider selectRange={this.onSelectPriceRange} max={this.state.priceRangeValue.max} min={this.state.priceRangeValue.min} default={this.state.priceRangeValue.max}/>
                                    </div>
                                </DropDownButton>
                                <DropDownButton label={this.state.sortType} isActive={this.state.sortType !== 'Sort By'}>
                                    {this.state.sortBy.map((cat) => 
                                        <div className={classes.List}>
                                            <label onClick={this.onSelectSortType}>{cat}</label>
                                        </div>
                                    )}
                                </DropDownButton>
                            </div>
                            <div className={classes.FilterTags}>
                                {this.state.selectedCategories.map((cat) => 
                                    <button onClick={() => this.onRemoveTag(cat)}>{cat}</button>
                                )}
                            </div>
                        </div>
                        <div className={classes.Image}>
                            <img src={potteryPic} alt='potteryImg'/>
                        </div>
                    </div>
               
                    <section className={classes.Artworks}>
                    {arts}
                    </section>
                    {artSource.length > 0 ? <Pagination data={this.props.arts} parentCallback={this.callBackFuntion}/>: null}
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
        onSearchArtworks: (category) => dispatch(actions.searchArtworks(category)),
        onFetchArtworks: () => dispatch(actions.fetchArtworks()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onFetchArtCategories: () => dispatch(actions.fetchArtCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home, axios);