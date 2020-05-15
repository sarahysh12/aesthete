import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


class Layout extends Component {
    // state = {
        
    // }

    // sideDrawerToggleHandler = () => {
    //     this.setState((prevState) => {
    //         return {showSideDrawer: !prevState.showSideDrawer}
    //     });
    // };

    render() {
        return (
            <Aux>
                <Toolbar bgColor={this.props.color} isAuth={this.props.isAuthenticated} />
                    {/* // drawerToggleClicked={this.sideDrawerToggleHandler} /> */}
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);