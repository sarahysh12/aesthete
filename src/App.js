import React, { Component } from 'react';
import logo from './aesthete.png';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" />
          </header>
          <Home/>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
