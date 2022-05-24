import { combineReducers } from 'redux';

import matrixStoreReducer from '../appStores/matrixStore/matrixStore';

export default combineReducers({
  matrixStore: matrixStoreReducer,
});
