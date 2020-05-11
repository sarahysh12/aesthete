import React, { Component } from 'react';
import classes from './Landing.css';
import asethetePic from '../../assets/images/aesthete.jpg';
import artistsPic from '../../assets/images/artists.jpg';
import connectPic from '../../assets/images/connect.jpg';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Auth from '../Auth/Auth';
import Search from '../../components/Search/Search';

class Landing extends Component {
    state = {
        modalIsOpen: false
    }
    showModal = () => {
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    onSearch = (event) => {
        if(event.key === 'Enter') {
            this.props.history.push(`/home:${event.target.value}`);
            // this.props.history.push('/home');
        }
    }
    

    render() {
        let auth = <Auth closeAuthentication={this.closeModal} />;
        return (
            <div>
                <div className={classes.Home}>
                        <div className={classes.LandingTitleContent}>
                            <div className={classes.Title}>
                                <span>Connect <span className={classes.PurpleText} style={{fontSize: '60px'}}>&</span> Share</span> 
                                <br/>
                                <span>with other 
                                    <span className={classes.PurpleText} style={{fontSize: '50px'}}> Artists!</span>
                                </span>
                                <p>Share your talent with the whole world and get others' back!</p>
                                <Button btnType='Default' btnSize='Large'  clicked={this.showModal}>Become an Aesthete</Button>
                                <Search keypressed={this.onSearch}/>
                            </div>
                            <div className={classes.Image}>
                                <img src={asethetePic} alt="aesthete pic"/>
                            </div>
                        </div>

                        <div className={classes.DetailsContent}>
                            <div className={classes.DetailsImage}>
                                <img src={connectPic} alt="connect pic"/>
                            </div>
                            <div className={classes.DetailsDescription}>
                                <p className={classes.GoalTiles}>
                                    <h3>Stay Connected</h3>
                                    Follow and connect with like-minded people and enjoy sharing your arts with each other, either you are a musician, make up artists, chef, interior designer and many more! </p>
                            </div>
                        </div>

                        <div className={classes.WideImage}>
                                <img src={artistsPic} alt="artists pic"/>
                        </div>


                        <div className={classes.DetailsContent}>
                            <div className={classes.DetailsDescription}>
                                <p className={classes.GoalTiles}>       
                                    <h3>Consult with aesthetes</h3>
                                    Ask other aesthetes' opinion about your projects when friends and family aren't available. From small daily routines like cooking, shopping clothes! To composing a song or decorating your living room by a designer!</p>
                            </div>
                            <div className={classes.DetailsDescription}>
                                <p className={classes.GoalTiles}>
                                    <h3>Share your ideas on your aesthete friends' arts</h3>
                                    Help your aesthete network in their projects with your specialty! Share your ideas if you really rock at something! Give some tips & tricks how you dress up, or even share grandma's secret recepies!   </p>
                            </div>
                            <div className={classes.DetailsDescription}>
                                <p className={classes.GoalTiles}>
                                    <h3>Earn money at home!</h3>
                                    Earn some money in your free time while you're at home! If you really enjoy something and never had a chance to try it in the real work, give it a shot online without any cost! Become and Aesthete and share your passion!</p>
                            </div>

                        </div>
                        
                </div>

                <Modal show={this.state.modalIsOpen} closed={this.closeModal}>
                    {auth}
                </Modal>
                {this.state.modalIsOpen ? <Backdrop show/>: null} 
            </div>
        )
    }
}




export default Landing;

