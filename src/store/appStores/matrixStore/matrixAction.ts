import store from '../../store';

const { dispatch } = store;

const matrixActions = {
  setTable: async (table: any) => {
    dispatch({
      type: 'SET_TABLE',
      table,
    });
  },
  deleteRow: async (table: any) => {
    dispatch({
      type: 'DELETE_ROW',
      table,
    });
  },
};

export default matrixActions;
