import store from '../../store';

const { dispatch } = store;

const matrixActions = {
  setTable: async (table: Array<Array<object>>) => {
    dispatch({
      type: 'SET_TABLE',
      table,
    });
  },
  deleteRow: async (table: Array<Array<object>>) => {
    dispatch({
      type: 'DELETE_ROW',
      table,
    });
  },
};

export default matrixActions;
