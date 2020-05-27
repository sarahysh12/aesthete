import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import authReducer from './store/reducers/auth';
import artworkReducer from './store/reducers/artwork';
import aestheteReducer from './store/reducers/aesthete';
import artCategoryReducer from './store/reducers/artCategory';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    artwork: artworkReducer,
    aesthete: aestheteReducer,
    cats: artCategoryReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
