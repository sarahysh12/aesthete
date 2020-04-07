import React, { Component } from 'react';
import logo from './aesthete.png';
import './App.css';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>
        <Home/>
      </div>
    );
  }
}

export default App;
