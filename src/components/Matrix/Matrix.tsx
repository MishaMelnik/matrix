import React, { useEffect, useState } from 'react';
import './Matrix.scss';
import getTable from '../../store/appStores/matrixStore/selector';
import { useSelector } from 'react-redux';
import matrixActions from '../../store/appStores/matrixStore/matrixAction';
import percentCalculation from '../function/percentCalculation';
import { matrix } from '../../models/models';

const Matrix = () => {
  const table: Array<Array<matrix>> = useSelector(getTable);
  const [average, handleAverage] = useState<Array<number>>([]);
  const [column, setColumn] = useState<Array<number>>([]);
  const [showCell, setShowCell] = useState(false);
  const [showPercent, setShowPercent] = useState(false);
  const matrix = [...table];
  const newTabl = matrix.flat(2);
  const newMatrix = newTabl[0];
  console.log(matrix);

  const deleteRowFromArr = (rowId: number) => {
    const newTable = table.slice(0);
    newTable.splice(rowId - 1, 1);
    matrixActions.deleteRow(newTable);
  };
  const showRowPercent = (index: number) => {
    setShowPercent(true);
    console.log(index);
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
  const hoverAmount = () => {
    setShowCell(true);
    const hashAmountDelta = newTabl
      .map((item) => ({
        ...item,
        amountDelta: Math.abs(item.amount - newMatrix.amount),
      }))
      .sort((a, b) => {
        if (a.amountDelta < b.amountDelta) {
          return -1;
        }
        if (a.amountDelta > b.amountDelta) {
          return 1;
        }
        return 0;
      })
      .slice(0, newMatrix.cell);
    console.log(hashAmountDelta);
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
                  // value={show.id}
                  id={show.id.toString()}
                  onMouseEnter={() => hoverAmount()}
                  onMouseLeave={() => setShowCell(false)}
                  className={
                    !showCell ? 'showTable_amount' : 'showTable_amount showTable_amount-near'
                  }
                  onClick={() => amountClick(show.id)}
                  // onClick={(event) => amountClick(event)}
                >
                  <span>{!showPercent ? show.amount : `${show.percent} %`}</span>
                  <div
                    style={{ height: `${+show.percent}%` }}
                    className={!showPercent ? 'showTable_percent-none' : 'showTable_percent'}
                  ></div>
                </button>
              </div>
            ))}
            <span
              className="showTable_sum"
              id={index.toString()}
              onMouseEnter={() => showRowPercent(index)}
              onMouseLeave={() => setShowPercent(false)}
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
