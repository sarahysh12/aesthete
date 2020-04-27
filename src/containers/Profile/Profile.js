import React, { Component } from "react";
import classes from './Profile.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class Profile extends Component {
    state = {
        artworkForm : {
            name: {
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
            description: {
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
            arttype: {
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

    }

    artworkHandler () {
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
            <form onSubmit={this.artworkHandler}>
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
                    <p>Add New Service with userId</p>
                    {form}
                </div>

            </div>
        );
    }
}

export default Profile;