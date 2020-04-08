import React, { Component } from 'react';
import Artworks from '../Artworks/Artworks';
import {Route, NavLink} from 'react-router-dom';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <div className="Home"> 
                <input placeholder="Search for Aesthetes Or artworks" type="text" name="search"/>
                <button>
                    <NavLink to="/artworks">
                        Arts
                    </NavLink>
                </button>
                <Route path="/artworks" component={Artworks} />
            </div>
        );

    }
}

export default Home;

