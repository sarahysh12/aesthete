import React, { Component } from 'react';
import './Home.css';
import axios from '../../axios';
import Artwork from '../../components/Artwork/Artwork';
import Aesthete from '../../components/Aesthete/Aesthete';
// import {Route, NavLink} from 'react-router-dom';
import Search from '../../components/Search/Search';

//TODO it loads the page twice, maybe we need unmount
class Home extends Component {


    state = {
        artworks : [],
        aesthetes: [],
        filteredArtworks: [],
        filteredAesthetes: [],
        isCraved: true
    }

    componentDidMount(){
        // Get Services
        axios.get('/artworks.json')
            .then(response => {
                this.setState({artworks: response.data})
                this.setState({filteredArtworks: response.data})
            })
            .catch(error => {
                console.log(error);
            });

        // Get Users in specific category
        axios.get('/aesthetes.json')
        .then(response => {
            this.setState({aesthetes: response.data})
            this.setState({filteredAesthetes: response.data})
        })
        .catch(error => {
            console.log(error);
        });
    }

    onSearchHandler = (evt) => {
        // On Artworks
        const keyword = evt.target.value;
        var regex = new RegExp(keyword);
        let artworkSearchResult = [];
        this.state.artworks.some(artwork => {
            if(artwork.artwork_type.toLowerCase().match(regex)){
                artworkSearchResult.push(artwork)
            }
        });
        this.setState({filteredArtworks: artworkSearchResult})

        // On Aesthetes
        let aestheteSearchResult = [];
        this.state.aesthetes.some(aesthete => {
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
        console.log(art_id, 'crave clicked')
        this.setState({isCraved: !this.state.isCraved})
        if (this.state.isCraved) {
            // Send request to the aesthete he/she has 
        } else {
            // Cancel the request to aesthete
        }
    }

    //TODO add id for user
    onAestheteClickedHandler (username) {
        console.log(username, 'aesthete clicked')
    }

    // isCraved change all button names
    render() {
        const arts = this.state.filteredArtworks.map(art => {
            return (
                <Artwork 
                    key = {art.id}
                    title={art.artwork_title}
                    category={art.artwork_type}
                    description={art.description}
                    artist={art.artist}
                    price={art.price}
                    rating={art.rating}
                    craveClicked={() => this.onCraveClickedHandler(art.artwork_id)}
                    isCraveSelected={this.state.isCraved}/>
            );
        });

        const artists = this.state.filteredAesthetes.map(artist => {
            return (
                <Aesthete 
                    name={artist.aesthete_full_name}
                    speciality={artist.category}
                    rating={artist.rating}
                    aestheteClicked={() => this.onAestheteClickedHandler(artist.aesthete_username)}/>
            );
        });

        //TODO show the full size search bar in mobile view
        return (
            <div>
                <div className="Home"> 
                    <Search changed={this.onSearchHandler}/>
                    <h1>ArtWorks</h1>
                    <section className="Artworks">
                        {arts}
                    </section>
                    <hr/>
                    <h1>Aesthetes</h1> 
                    <section className="Aesthetes">
                        {artists}
                    </section>

                </div>
                {/* <Route path="/artworks" component={Artworks} /> */}
            </div>
        )
    }
}

export default Home;

