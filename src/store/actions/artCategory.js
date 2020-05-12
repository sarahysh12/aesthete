import * as actions from './actionTypes';
import axios from '../../axios';

export const fetchArtCategoriesStart = () => {
    return {
        type: actions.FETCH_ART_CATEGORIES_START
    };
};

export const fetchArtCategoriesSuccess = (artCategoriesData) => {
    return {
        type: actions.FETCH_ART_CATEGORIES_SUCCESS,
        categories: artCategoriesData
    };
};

export const fetchArtCategoriesFail = (error) => {
    return {
        type: actions.FETCH_ART_CATEGORIES_FAIL,
        error: error
    };
};

export const fetchArtCategories = () => {
    return dispatch => {
        dispatch(fetchArtCategoriesStart());
        axios.get('/artCategories.json')
            .then(response => {
                dispatch(fetchArtCategoriesSuccess(response.data));
            })
            .catch(err => {
                dispatch(fetchArtCategoriesFail(err));
            })
    };


}