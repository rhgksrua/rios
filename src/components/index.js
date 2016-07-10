import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import riosReducer from '../reducers/reducers';
import Home from './Home';
import AppContainer from './AppContainer';
import SignUpContainer from './users/SignUpContainer';
import LogInContainer from './users/LogInContainer';

const loggerMiddleware = createLogger();

let store = createStore(riosReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

import '../styles/index.styl';

ReactDom.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={Home} />
                <Route path='/signup' component={SignUpContainer} />
                <Route path='/login' component={LogInContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app')
);