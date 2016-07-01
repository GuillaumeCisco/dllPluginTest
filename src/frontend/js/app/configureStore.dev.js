import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import sagas from './sagas';
import rootReducer from './reducers';
import DevTools from './DevTools';

export default function configureStore(initialState) {
    let enhancers = [
        applyMiddleware(
            createSagaMiddleware(sagas),
            routerMiddleware(hashHistory),
            thunkMiddleware
        ),
        DevTools.instrument()
    ];

    const store = createStore(rootReducer, initialState, compose(...enhancers));

    //Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(require('./reducers').default/* if you use Babel 6+ */)
        );
    }

    return store;
}
