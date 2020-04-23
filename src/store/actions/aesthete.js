import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const fetchAesthetesStart = () => {
    return {
        type: actionTypes.FETCH_AESTHETES_START
    }
};

export const fetchAesthetesSuccess = (aesthetes) => {
    return {
        type: actionTypes.FETCH_AESTHETES_SUCCESS,
        aesthetes: aesthetes
    }
};

export const fetchAesthetesFail = (error) => {
    return {
        type: actionTypes.FETCH_AESTHETES_FAIL,
        error: error
    };
};

export const fetchAesthetes = () => {
    return dispatch => {
        dispatch(fetchAesthetesStart());
        axios.get('/aesthetes.json')
        .then(response => {
            dispatch(fetchAesthetesSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchAesthetesFail(error));
        });
    }
}