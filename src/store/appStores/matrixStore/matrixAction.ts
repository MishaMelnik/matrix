import store from '../../store';

const { dispatch } = store;

const matrixActions = {
  setTable: async (table: any) => {
    dispatch({
      type: 'SET_TABLE',
      table,
    });
  },
};

export default matrixActions;
