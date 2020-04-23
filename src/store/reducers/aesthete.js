import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    aesthetes: []
}

const fetchAesthetesStart = (state, action) => {
    return updateObject(state, {});
};


const fetchAesthetesSuccess = (state, action) => {
    return updateObject(state, {aesthetes: action.aesthetes});
};


const fetchAesthetesFail = (state, action) => {
    return updateObject(state, {});
};


const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_AESTHETES_START: return fetchAesthetesStart(state, action);
        case actionTypes.FETCH_AESTHETES_SUCCESS: return fetchAesthetesSuccess(state, action);
        case actionTypes.FETCH_AESTHETES_FAIL: return fetchAesthetesFail(state, action);
        default:
            return state;
    }

}

export default reducer;