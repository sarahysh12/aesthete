import React, { Component } from 'react';
import classes from './Home.css';
import Layout from '../../hoc/Layout/Layout';
import asethetePic from '../../assets/images/aesthete.jpg';
import artistsPic from '../../assets/images/artists.jpg';
import Button from '../../components/UI/Button/Button';

class Home extends Component {

    render() {
        return (
            <div className={classes.Home}>
                <Layout>
                    <div className={classes.LandingTitleContent}>
                        <div className={classes.Title}>
                            <span>Connect <span className={classes.PurpleText} style={{fontSize: '60px'}}>&</span> Share</span> 
                            <br/>
                            <span>with other 
                                <span className={classes.PurpleText} style={{fontSize: '50px'}}> Artists!</span>
                            </span>
                            <p>Share your talent with the whole world and get others' back!</p>
                            <Button btnType='Default'>Join as an Artist</Button>
                        </div>
                        <div className={classes.Image}>
                            <img src={asethetePic} alt="aesthete pic"/>
                        </div>
                    </div>
                    {/* <div className={classes.DetailsContent}>
                        <div className={classes.DetailsImage}>
                            <img src={artistsPic} alt="aesthete pic"/>
                        </div>
                        <div className={classes.DetailsDescription}>

                        </div>
                    </div> */}
                </Layout>
                
            </div>
        )
    }
}


export default Home;

