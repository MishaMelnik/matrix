import matrixActions from '../../store/appStores/matrixStore/matrixAction';
import { matrix } from '../../models/models';
// eslint-disable-next-line require-jsdoc
function percentCalculation(newTab: Array<Array<matrix>>) {
  const newTable = [...newTab];

  for (let i = 0; i < newTable.length; i += 1) {
    const sum = newTab[i].reduce((acc, num) => acc + +num.amount, 0);

    for (let j = 0; j < newTable[i].length; j += 1) {
      newTable[i][j].percent = ((+newTable[i][j].amount / sum) * 100).toFixed(1);
    }
  }

  matrixActions.setTable(newTable);
}
export default percentCalculation;
