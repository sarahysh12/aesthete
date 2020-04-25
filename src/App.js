import React, { Component } from 'react';
// import logo from './images/aesthete.png';
import './App.css';
import { Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import { withRouter, Route, Redirect } from 'react-router-dom';
import Profile from './containers/Profile/Profile';
import Auth from './containers/Auth/Auth';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path='/aesthete' component={Profile}/>
          <Route path="/" exact component={Home}/>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
          {/* <header className="App-header">
            <img src={logo} alt="logo" />
          </header> */}
          <Layout>
            {routes}
          </Layout>
        </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
