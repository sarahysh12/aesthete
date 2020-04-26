import React, { Component } from "react";
import classes from './Profile.css'


class Profile extends Component {


    render() {
        return (
            <div className={classes.Profile}>
                <h1>Aesthete Name</h1>
                <p>Select a category</p>
                <h1>Services (select Services by category and userId</h1>
                <p>Add New Service with userId</p>

            </div>
        );
    }
}

export default Profile;