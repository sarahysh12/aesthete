import React, { Component } from 'react';
import logo from './aesthete.png';
import './App.css';
import { Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import { withRouter, Route } from 'react-router-dom';
import Profile from './containers/Profile/Profile';

class App extends Component {
  
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path='/aesthete' component={Profile}/>
      </Switch>
    );

    return (
      <div className="App">
          <header className="App-header">
            <img src={logo} alt="logo" />
          </header>
          {routes}
          {/* TODO add a layeout component (hoc) */}
        </div>

    );
  }
}

export default withRouter(App);
