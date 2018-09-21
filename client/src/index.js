import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';  // Connects react to redux store
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
// create redux store with createStore built-in function
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);

console.log('Stripe key', process.env.REACT_APP_STRIPE_KEY);
console.log('Development is ', process.env.NODE_ENV);
registerServiceWorker();
