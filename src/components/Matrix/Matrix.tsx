import React, { useEffect, useState } from 'react';
// HOOKS
import { useSelector } from 'react-redux';
// REDUX
import getTable from '../../store/appStores/matrixStore/selector';
import matrixActions from '../../store/appStores/matrixStore/matrixAction';
// FUNCTIONS
import percentCalculation from '../../functions/percentCalculation';
// MODELS
import { matrix } from '../../models/models';
// SCSS
import './Matrix.scss';

const Matrix = () => {
  const table: Array<Array<matrix>> = useSelector(getTable);
  const [average, handleAverage] = useState<Array<number>>([]);
  const [column, setColumn] = useState<Array<number>>([]);
  const matrix = [...table];
  const newTable = matrix.flat(2);
  const newMatrix = newTable[0];

  const deleteRowFromArr = (index: number) => {
    const newTable = table.slice(0);
    newTable.splice(index, 1);
    matrixActions.deleteRow(newTable);
  };
  const showPercent = (i: number) => {
    const newArr = [...table];
    newArr[i].map((el) => {
      el.showPercent = true;
    });
  };
  const endShowPercent = (i: number) => {
    const newArr = [...table];
    newArr[i].map((el) => {
      el.showPercent = false;
    });
    matrixActions.setTable(newArr);
  };
  const amountClick = (id: number) => {
    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[i].length; j += 1) {
        if (+matrix[i][j].id === +id) {
          matrix[i][j].amount += 1;
        }
      }
    }
    percentCalculation(matrix);
  };
  const hoverAmount = (id: number) => {
    newTable.sort((a, b) => a.amount - b.amount);
    const index = newTable.findIndex((el) => el.id === id);
    const indexPlus = newTable.indexOf(newTable[index + newMatrix.cell + 1]);
    const indexMinus = newTable.indexOf(newTable[index - newMatrix.cell]);
    const resultPlus = newTable.slice(index, indexPlus);
    resultPlus.shift();
    const resultMinus = newTable.slice(indexMinus, index);
    const sumArr = resultPlus.concat(resultMinus);
    sumArr.sort((a, b) => a.amount - b.amount);
    const result = sumArr.slice(0, newMatrix.cell);
    result.map((el) => (el.showCell = true));
    console.log(result);
  };
  const endHoverAmount = () => {
    matrix.map((el) => el.map((show) => (show.showCell = false)));
    matrixActions.setTable(matrix);
  };
  useEffect(() => {
    if (table.length > 0) {
      const newAverage = [];
      for (let i = 0; i < table[0].length; i += 1) {
        const a = table.reduce((acc, current) => acc + current[i].amount, 0);
        newAverage.push(Math.round(a / table.length));
      }
      handleAverage(newAverage);
    }
    if (table.length > 0) {
      const newColumn = [];
      for (let i = 1; i <= newMatrix?.columns; i += 1) {
        newColumn.push(i);
      }
      setColumn(newColumn);
    }
  }, [table]);

  return (
    <div className={table.length > 0 ? `showTable` : `showTable-none`}>
      <ul className="showTable_list">
        <span className="showTable_span">№</span>
        <li className="showTable_rowNumber">
          {matrix?.map((row, index) => (
            <span key={Math.random()} className="showTable_rowSpan showTable_rowAverage-item">
              {index + 1}
            </span>
          ))}
        </li>
        <li className="showTable_item showTable_average">
          {column?.map((column) => (
            <span key={Math.random()} className="showTable_amount showTable_average-item">
              {column}
            </span>
          ))}
        </li>
        <span className="showTable_sums">Sum</span>
        {table?.map((row, index) => (
          <li className="showTable_item" key={Math.random()}>
            {row?.map((show) => (
              <div className="showTable_row" key={Math.random()}>
                <button
                  id={show.id.toString()}
                  className={
                    !show.showCell ? 'showTable_amount' : 'showTable_amount showTable_amount-near'
                  }
                  onMouseEnter={() => hoverAmount(show.id)}
                  onMouseLeave={() => endHoverAmount()}
                  onClick={() => amountClick(show.id)}
                >
                  <span>{!show.showPercent ? show.amount : `${show.percent} %`}</span>
                  <div
                    style={{ height: `${+show.percent}%` }}
                    className={!show.showPercent ? 'showTable_percent-none' : 'showTable_percent'}
                  ></div>
                </button>
              </div>
            ))}
            <span
              id={index.toString()}
              className="showTable_sum"
              onMouseOver={() => showPercent(index)}
              onMouseOut={() => endShowPercent(index)}
            >
              {row?.reduce((acc, current) => acc + current.amount, 0)}
            </span>
            <div>
              <button
                className="showTable_remove"
                id={index.toString()}
                onClick={() => deleteRowFromArr(index)}
              >
                X
              </button>
            </div>
          </li>
        ))}
        <li className="showTable_item showTable_average">
          {average?.map((amount) => (
            <span key={Math.random()} className="showTable_amount showTable_average-item">
              {amount}
            </span>
          ))}
        </li>
        <span className="showTable_avg">Avg</span>
      </ul>
    </div>
  );
};

export default Matrix;
