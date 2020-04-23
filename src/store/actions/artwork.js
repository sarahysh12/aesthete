import * as actionTypes from './actionTypes';
import axios from '../../axios';


export const fetchArtworkStart = () => {
    return {
        type: actionTypes.FETCH_ARTWORKS_START
    }
};

export const fetchArtworkSuccess= (artworks) => {
    return {
        type: actionTypes.FETCH_ARTWORKS_SUCCESS,
        artworks: artworks
    }
};


export const fetchArtworkFail = (error) => {
    return {
        type: actionTypes.FETCH_ARTWORKS_FAIL,
        error: error
    }
};


export const fetchArtworks = () => {
    return dispatch => {
        dispatch(fetchArtworkStart())
        axios.get('/artworks.json')
            .then(response => {
                dispatch(fetchArtworkSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchArtworkFail(error))
            });
    }
}