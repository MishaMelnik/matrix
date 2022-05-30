import { createSelector } from 'reselect';

const getTable = createSelector([(state) => state.matrixStore.table], (data) => data);

export default getTable;
