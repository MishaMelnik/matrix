import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import indexReducer from './redusers/indexReducer';

const store = createStore(indexReducer, compose(applyMiddleware(thunk)));

export default store;
