import React, { Component } from 'react';
import './Home.css';
import axios from '../../axios';
import Artwork from '../../components/Artwork/Artwork';
import Aesthete from '../../components/Aesthete/Aesthete';
// import {Route, NavLink} from 'react-router-dom';

//TODO it loads the page twice, maybe we need unmount
class Home extends Component {


    state = {
        artworks : [],
        aesthetes: []
    }

    componentDidMount(){
        // Get Services
        axios.get('/artworks.json')
            .then(response => {
                this.setState({artworks: response.data})
            })
            .catch(error => {
                console.log(error);
            });

        // Get Users in specific category
        axios.get('/aesthetes.json')
        .then(response => {
            this.setState({aesthetes: response.data})
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        const arts = this.state.artworks.map(art => {
            return (
                <Artwork 
                    key = {art.id}
                    title={art.artwork_title}
                    category={art.artwork_type}
                    description={art.description}
                    artist={art.artist}
                    price={art.price}
                    rating={art.rating}/>
            );
        });

        const artists = this.state.aesthetes.map(artist => {
            return (
                <Aesthete name={artist.aesthete_full_name}/>
            );
        });

        return (
            <div>
                 <div className="Home"> 
                <input placeholder="Search for Aesthetes Or artworks" type="text" name="search"/>
                {/* <button>
                    <NavLink to="/artworks">
                        Arts
                    </NavLink>
                </button> */}
                </div>
                <h1>ArtWorks</h1>
                {arts}
                <h1>Aesthetes</h1>
                {artists}

                {/* <Route path="/artworks" component={Artworks} /> */}
            </div>
        )
    }
}

export default Home;

