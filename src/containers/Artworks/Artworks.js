import React, { Component } from "react";
// import axios from '../../axios';
import axios from 'axios';
import Artwork from '../../components/Artwork/Artwork';
import Aesthete from '../../components/Aesthete/Aesthete';

// TODO rename this class to something more general for both artworks and aesthetes
class Artworks extends Component {
    
    state = {
        artworks : [],
        aesthetes: []
    }

    componentDidMount(){
        // Get Services
        axios.get('https://sthete-3ff8d.firebaseio.com/artworks.json')
            .then(response => {
                this.setState({artworks: response.data})
            })
            .catch(error => {
                console.log(error);
            });

        // Get Users in specific category
        axios.get('https://sthete-3ff8d.firebaseio.com/aesthetes.json')
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
                <h1>ArtWorks</h1>
                {arts}
                <h1>Aesthetes</h1>
                {artists}
            </div>
        )
    }
}

export default Artworks;