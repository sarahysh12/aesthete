import React, { Component } from "react";
import classes from './Profile.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';


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
            <div className={classes.Profile}>
                <h1>Aesthete Name</h1>
                <p>Select a category</p>
                <h1>Services (select Services by category and userId)</h1>
                <div className={classes.AddService}>
                    {form}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId : state.auth.userId,
        token: state.auth.token
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAddArtwork: (artworkData, token) => dispatch(actions.addArtwork(artworkData, token))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Profile);