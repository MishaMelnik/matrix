import React, { useEffect, useState } from 'react';
import './Matrix.scss';
import getTable from '../../store/appStores/matrixStore/selector';
import { useSelector } from 'react-redux';
import matrixActions from '../../store/appStores/matrixStore/matrixAction';
import { matrix, form } from '../../models/models';

const Matrix = () => {
  const table = useSelector(getTable);
  const [average, handleAverage] = useState([]);
  const [column, setColumn] = useState([]);
  const matrix = [...table];
  const newTabl = matrix.flat(2);
  const newMatrix = newTabl[0];
  console.log(newTabl);

  const deleteRowFromArr = ({ rowId }: matrix) => {
    const newTable = table.slice(0);
    newTable.splice(rowId - 1, 1);
    matrixActions.deleteRow(newTable);
  };
  // const showPercent = (event: any) => {
  //   const newTable = [...table];
  //   const i = event.target.id;
  //
  //   for (let j = 0; j < newTable[i].length; j += 1) {
  //     newTable[i][j].showPercent = true;
  //   }
  //   matrixActions.setTable(newTable);
  // };
  // const endShowPercent = () => {
  //   const newTable = [...table];
  //
  //   for (let i = 0; i < newTable.length; i += 1) {
  //     for (let j = 0; j < newTable[i].length; j += 1) {
  //       newTable[i][j].showPercent = false;
  //     }
  //   }
  //   matrixActions.setTable(newTable);
  // };
  const amountClick = (event: any) => {
    const id = event.target.value;
    console.log(event.target);
    const newTable = [...table];

    for (let i = 0; i < newTable.length; i += 1) {
      for (let j = 0; j < newTable[i].length; j += 1) {
        if (+newTable[i][j].id === +id) {
          newTable[i][j].amount += 1;
        }
      }
    }
    percentCalculation(newTable);
  };
  const hoverAmount = (event: any) => {
    console.log('MouseEnter');
    // const arr: any = [];
    // newTabl.forEach((num) => arr.push(+num.amount));
    // arr.sort((a: number, b: number) => a - b);
    // const index = arr.indexOf(+event.target.innerText);
    // // const el = arr[index];
    // // console.log(el);
    // console.log(index);
    // console.log(arr);
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
    console.log(newTabl);
    //
    // const newTable = [...table];
    // const arr: any = [];
    // newTable.forEach((row: any) => row.forEach((num: any) => arr.push(+num.amount)));
    // arr.sort((a: number, b: number) => a - b);
    // const index = arr.indexOf(+event.target.innerText);
    // console.log(arr);
    // console.log(index);
    //
    // const a = arr[index + 1];
    // const b = arr[index - 1];
    // console.log(a);
    // console.log(b);
    //
    // for (let i = 0; i < newTable.length; i += 1) {
    //   for (let j = 0; j < newTable[i].length; j += 1) {
    //     if (newTable[i][j].amount === a || newTable[i][j].amount === b) {
    //       newTable[i][j].hover = true;
    //     }
    //   }
    // }
    // matrixActions.setTable(newTable);
  };
  const endHoverAmount = () => {
    console.log('MouseLeave');
    // const newTable = [...table];
    //
    // for (let i = 0; i < newTable.length; i += 1) {
    //   for (let j = 0; j < newTable[i].length; j += 1) {
    //     newTable[i][j].hover = false;
    //   }
    // }
    //
    // matrixActions.setTable(newTable);
  };
  useEffect(() => {
    if (table.length > 0) {
      const newAverage: any = [];
      for (let i = 0; i < table[0].length; i += 1) {
        const a = table.reduce((acc: matrix, current: any) => acc + current[i].amount, 0);
        newAverage.push(Math.round(a / table.length));
      }

      handleAverage(newAverage);
    }
  }, [table]);
  useEffect(() => {
    if (table.length > 0) {
      const newColumn: any = [];
      for (let i = 1; i <= newMatrix?.columns; i += 1) {
        newColumn.push(i);
      }
      setColumn(newColumn);
    }
  }, [table]);
  // eslint-disable-next-line require-jsdoc
  function percentCalculation(newTab: matrix[][]) {
    const newTable = [...newTab];

    for (let i = 0; i < newTable.length; i += 1) {
      const sum = newTab[i].reduce((acc, num) => acc + +num.amount, 0);

      for (let j = 0; j < newTable[i].length; j += 1) {
        newTable[i][j].percent = ((+newTable[i][j].amount / sum) * 100).toFixed(1);
      }
    }

    matrixActions.setTable(newTable);
  }

  return (
    <div className={table.length > 0 ? `showTable` : `showTable-none`}>
      <ul className="showTable_list">
        <span className="showTable_span">№</span>
        <li className="showTable_rowNumber">
          {matrix?.map((row: any, index) => (
            <span key={Math.random()} className="showTable_rowSpan showTable_rowAverage-item">
              {index + 1}
            </span>
          ))}
        </li>
        <li className="showTable_item showTable_average">
          {column?.map((column: number) => (
            <span key={Math.random()} className="showTable_amount showTable_average-item">
              {column}
            </span>
          ))}
        </li>
        <span className="showTable_sums">Sum</span>
        {table?.map((row: any, i: number) => (
          <li className="showTable_item" key={Math.random()}>
            {row?.map((show: form) => (
              <div className="showTable_row" key={Math.random()}>
                <button
                  // value={show.id}
                  id={i.toString()}
                  className={
                    !show.hover ? 'showTable_amount' : 'showTable_amount showTable_amount-near'
                  }
                  onClick={(event) => amountClick(event)}
                >
                  <span onMouseEnter={(e) => hoverAmount(e)} onMouseLeave={() => endHoverAmount()}>
                    {!show.showPercent ? show.amount : `${show.percent} %`}
                  </span>
                  <div
                    style={{
                      height: `${+show.percent}%`,
                    }}
                    className={!show.showPercent ? 'showTable_percent-none' : 'showTable_percent'}
                  ></div>
                </button>
              </div>
            ))}
            <span
              className="showTable_sum"
              id={i.toString()}
              // onMouseEnter={(e) => showPercent(e)}
              // onMouseOver={() => endShowPercent()}
            >
              {row?.reduce((acc: number, current: matrix) => acc + current.amount, 0)}
            </span>
            <div>
              <button
                className="showTable_remove"
                // value={i}
                id={i.toString()}
                onClick={() => deleteRowFromArr(row.id)}
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
