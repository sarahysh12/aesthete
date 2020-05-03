import React, { Component } from "react";
import classes from './Bio.css';
import axios from '../../../axios';
import { connect } from 'react-redux';

class Bio extends Component {

    state = {
        category: {
            category_tags: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter a category',
                },
                value: ''
            },
        },
        user: null,
        loading: true
    }

    componentDidMount(){
        const queryParams = '?orderBy="userId"&equalTo="'+this.props.userId+'"';
        axios.get('/aesthetes.json'+queryParams)
            .then(response => {
                for(let key in response.data) {
                    const userData = {
                        ...response.data[key],
                        id: key
                    };
                    this.setState({user: userData});
                    this.setState({loading: false});
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateCategoryTags = (updatedAestheteData) => {
        axios.post('/aesthetes.json' , updatedAestheteData)
            .then(response => {
                this.setState({user: updatedAestheteData});
            })
            .catch(error => {
                console.log(error);
            });
    }

    enterCategoryTagHandler = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            let tags = [
                ...this.state.user.category
            ];
            tags.push(event.target.value);
            const updatedAestheteData = {
                key: this.state.user.id,
                aestheteData: {
                    ...this.state.user.aestheteData
                },
                category: tags,
                userId: this.props.userId,
            }
            this.updateCategoryTags(updatedAestheteData);
            event.target.value = '';
            console.log(this.state.loading);
        }
    }

    onRemoveTag = (tag) => {
        let categories = [
            ...this.state.user.category
        ];
        categories = categories.filter(cat => cat !== tag);
        const updatedAestheteData = {
            key: this.state.user.id,
            aestheteData: {
                ...this.state.user.aestheteData
            },
            category: categories,
            userId: this.props.userId,
        }
        this.setState({user: updatedAestheteData});
        this.updateCategoryTags(updatedAestheteData);
    }

    render() {
        let aestheteId = this.props.user.split('@', 1)[0];
        let tags = <p>Loading tags</p>;
        if(!this.state.loading) {
            tags = this.state.user.category.map(tag => {
                return (
                <button onClick={() => this.onRemoveTag(tag)}>{tag} <span>X</span></button>
                );
            });
        }

        return (
            <div className={classes.ProfileBio}>
                <p><strong>{aestheteId}</strong></p>
                <p>{this.props.email}</p>
                <hr/>
                <p className={classes.ProfileDescription}>Hi ! My name is Sara Yarshenas. I'm a Software Engineer from San Francisco. I also enjoy painting and playing music.</p>
                <hr/>
                <div className={classes.CategoryTags}>
                <input 
                    placeholder='Enter a category' 
                    type='text'
                    onKeyPress={(event) => this.enterCategoryTagHandler(event)}/>
                <div className={classes.Tags}>
                    {tags}
                </div>
            </div>

        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId : state.auth.userId
    }
};

export default connect(mapStateToProps)(Bio);