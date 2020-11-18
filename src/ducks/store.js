import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';


export default createStore(reducer, applyMiddleware(promiseMiddleware));
// export default createStore(reducer);