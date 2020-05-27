import * as actions from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    categories : [],
    loading: false
}

const fetchArtCategoriesStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
}


const fetchArtCategoriesSuccess = (state, action) => {
    return updateObject(state, {
        categories: action.categories,
        loading: false
    });
}

const fetchArtCategoriesFail = (state, action) => {
    return updateObject(state, {
        looading: false
    });
}



const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.FETCH_ART_CATEGORIES_START: return fetchArtCategoriesStart(state, action);
        case actions.FETCH_ART_CATEGORIES_SUCCESS: return fetchArtCategoriesSuccess(state, action);
        case actions.FETCH_ARTWORKS_FAIL: return fetchArtCategoriesFail(state, action);
        default:
            return state;
    }
}

export default reducer;