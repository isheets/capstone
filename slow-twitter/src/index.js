import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'

const intialState = {
    user: {
        isAuthenticated: false,
        userDetails: null,
        userToken: null
    },
    tweets: {
        lastTweetFetched: null,
        parsedTweets: null,
        curTweet: null
    }
};

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
