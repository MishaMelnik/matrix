import { initialStore, storeReducer } from '../../../models/models';

const INITIAL_STATE: initialStore = {
  table: [],
};

const matrixStoreReducer = (state = INITIAL_STATE, action: storeReducer) => {
  switch (action.type) {
    case 'SET_TABLE':
      return {
        ...state,
        table: action.table,
      };
    case 'DELETE_ROW':
      return {
        ...state,
        table: action.table,
      };
    default:
      return state;
  }
};

export default matrixStoreReducer;
