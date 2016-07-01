import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import sagas from './sagas';
import rootReducer from './reducers';

export default function configureStore(initialState) {
    let enhancers = [
        applyMiddleware(
            createSagaMiddleware(sagas),
            routerMiddleware(hashHistory),
            thunkMiddleware
        ),
    ];

    return createStore(rootReducer, initialState, compose(...enhancers));
}
