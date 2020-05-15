import React, { Component } from 'react';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkValidity } from '../../shared/utility.js';
import Logo from '../../components/Logo/Logo';
import { withRouter } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                }, 
                valid: false,
                touched: false
            }
        },
        isSignup: this.props.authType === 'signup'
    }

    componentDidMount() {
        if (this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    
    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }        
        this.setState({controls: updatedControls});
    };
    
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
        console.log(this.props);
        // this.props.history.push('/home:')
        // if(!this.props.error) {
        //     this.props.closeAuthentication();
        // }
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    };
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
            Key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.validation}
            touched={formElement.config.touched}
            changed={(event)=>this.inputChangeHandler(event, formElement.id)}
            />
        ));

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p className={classes.ErrorMessage}>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        let login = (
            <div>  
                <h1>Login to connect & share</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <div className={classes.ForgetPass}><p>Forget your password?</p></div>
                    <Button btnType='Primary' btnSize='Large'>Log in</Button>
                </form>
                <span onClick={this.switchAuthModeHandler}> Not an Aesthete yet? Sign up Now </span>
            </div>
        );
        let signup = (
            <div>
                <h1>Become an Aesthete</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Primary' btnSize='Large'>Log Up</Button>
                </form>
                <span onClick={this.switchAuthModeHandler}> Already an Aesthete? Log In </span>
            </div>
        );
            
        let authContent = login;
        if(this.state.isSignup) {
            authContent = signup;
        } else {
            authContent = login ;
        }

        return (
            <div className={classes.Auth}>
                <Logo/>
                {authRedirect}
                {errorMessage}
                {authContent}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => {dispatch(actions.auth(email, password, isSignup))},
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/home:'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));