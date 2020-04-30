import React, { Component } from "react";
import classes from './Profile.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Artwork from '../../components/Artwork/Artwork';
import profilePic from '../../assets/images/pic.png';
// import profileCoverPic from '../../assets/images/cover.jpg';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';


class Profile extends Component {
    state = {
        artworkForm : {
            artwork_title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Artwork Title',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            artwork_description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'My Art/Service is ...'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            artwork_type: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'beauty', displayValue: 'Beauty'},
                        {value: 'camping', displayValue: 'Camping'},
                        {value: 'cooking', displayValue: 'Cooking'},
                        {value: 'fashion', displayValue: 'Fashion'},
                        {value: 'interior-design', displayValue: 'Interior Design'},
                        {value: 'painting', displayValue: 'Painting'},
                        {value: 'other', displayValue: 'Other'},
                    ]
                },
                value: 'Select an art type',
                validation: {},
                valid: true
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '$'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                }
            }
        },
        formIsValid: false
    } 

    componentDidMount() {
        this.props.onFetchArtworkById(this.props.token, this.props.userId);
        this.props.onFetchUserData(this.props.token);

    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler =(event, inputIdentifier) => {
        const updatedArtworkForm = {
            ...this.state.artworkForm
        };
        const updatedFormElement = { 
            ...updatedArtworkForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedArtworkForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedArtworkForm) {
            formIsValid = updatedArtworkForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({artworkForm: updatedArtworkForm, formIsValid: formIsValid});
    }

    onAddArtworkHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.artworkForm) {
            formData[formElementIdentifier] = this.state.artworkForm[formElementIdentifier].value;
        }
        const artwork = {
            artworkData: formData,
            userId: this.props.userId,
            rating: 0,
            created_date: new Date()
        }
        this.props.onAddArtwork(artwork, this.props.token);
    }

    render() {
        // Display arworks
        // TODO add spinner here
        let arts = <p>Artworks will load here</p>;
        let aestheteId = <p>User Id</p>;

        if ( !this.props.loading && this.props.email ) {
            aestheteId = this.props.email.split('@', 1)[0];
        }
        if ( !this.props.loading ) {
            arts = this.props.artworks.map(art => {
                return (
                    <Artwork 
                        key = {art.id}
                        title={art.artworkData.artwork_title}
                        category={art.artworkData.artwork_type}
                        description={art.artworkData.artwork_description}
                        artist={art.userId}
                        price={art.artworkData.price}
                        rating={art.artworkData.rating}
                        date={art.created_date}
                        craveClicked={() => this.onCraveClickedHandler(art.id)}
                        isCraveSelected={this.state.isCraved}/>
                );
            }); 
        }

        // TODO Clear the for after submission and display a message

        const formElementArray = [];
        for(let key in this.state.artworkForm) {
            formElementArray.push({
                id: key,
                config: this.state.artworkForm[key]
            });
        }
        let form = (
            <form onSubmit={this.onAddArtworkHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}
                <Button disabled={!this.state.formIsValid}>Add Artwork</Button>
            </form>
        );

        return (
            <div>
                <div className={classes.ProfileCover}>
                    <div>
                        <img className={classes.ProfilePic} src={profilePic} alt="profile pic"/>
                    </div>
                </div>
                <div >
                    <ul className={classes.ProfileNavItems}>
                        <NavigationItem link="/">Artworks</NavigationItem>
                        <NavigationItem link="/">Gallery</NavigationItem>
                        <NavigationItem link="/">My Portfolio</NavigationItem>
                        <NavigationItem link="/">Contact Me</NavigationItem>
                    </ul>
                </div>
                <div className={classes.ProfileContent}>
                    <div className={classes.ProfileBio}>
                        <p><strong>{aestheteId}</strong></p>
                        <p>{this.props.email}</p>
                        <hr/>
                        <p className={classes.ProfileDescription}>Hi ! My name is Sara Yarshenas. I'm a Software Engineer from San Francisco. I also enjoy painting and playing music.</p>
                        <hr/>
                    </div>
                    <div className={classes.ProfileServices}>
                        <div className={classes.Artworks}>
                            {/* <h3>Select a category + Services (select Services by category and userId)</h3> */}
                                {arts}
                        </div>
                        {/* <div className={classes.AddService}>
                            {form}
                        </div> */}
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId : state.auth.userId,
        email: state.auth.email,
        token: state.auth.token,
        artworks: state.artwork.artworks,
        loading: state.artwork.loading
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAddArtwork: (artworkData, token) => dispatch(actions.addArtwork(artworkData, token)),
        onFetchArtworkById: (token, userId) => dispatch(actions.fetchArtworksByUserId(token, userId)),
        onFetchUserData: (token) => dispatch(actions.fetchUserData(token))

    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Profile);