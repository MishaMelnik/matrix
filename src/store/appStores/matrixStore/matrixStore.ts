const INITIAL_STATE = {
  table: [],
};

const matrixStoreReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_TABLE':
      return {
        ...state,
        table: action.table,
      };
    default:
      return state;
  }
};

export default matrixStoreReducer;
