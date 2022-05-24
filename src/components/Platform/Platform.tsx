import React, { useState } from 'react';
import './Platform.scss';
import matrixActions from '../../store/appStores/matrixStore/matrixAction';
import getTable from '../../store/appStores/matrixStore/selector';
import { useSelector } from 'react-redux';

const Platform = () => {
  const table = useSelector(getTable);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [cell, setCells] = useState(0);

  const createTable = (columns: number, rows: number) => {
    const newTable = [];
    let id = 0;

    for (let i = 0; i < rows; i += 1) {
      const row = [];

      for (let j = 0; j < columns; j += 1) {
        let amount = Math.floor(Math.random() * 1000);

        if (amount < 100) {
          amount += 100;
        }

        row.push({
          amount,
          percent: 0,
          id,
          hover: false,
          showPercent: false,
        });

        id += 1;
      }

      newTable.push(row);
    }

    matrixActions.setTable(newTable);
    setColumns(0);
    setRows(0);
    setCells(0);
  };
  const addRow = (columns: number) => {
    const newTable = [...table];

    const row = [];
    let id = table[table.length - 1][columns - 1].id + 1;

    for (let j = 0; j < columns; j += 1) {
      let amount = Math.floor(Math.random() * 1000);

      if (amount < 100) {
        amount += 100;
      }

      row.push({
        ...table[0][0],
        amount,
        id,
      });

      id += 1;
    }

    newTable.push(row);

    matrixActions.setTable(newTable);
    setColumns(0);
    setRows(0);
  };

  return (
    <div className="platform">
      <div className="platform_container">
        <h2>Matrix builder</h2>
        <div className="platform_item item">
          <span>Enter the number of columns</span>
          <input
            className="item_counter"
            type="number"
            min="1"
            max="100"
            value={columns}
            onChange={(e) => setColumns(e.target.valueAsNumber)}
          />
        </div>
        <div className="platform_item item">
          <span>Enter the number of row</span>
          <input
            className="item_counter"
            type="number"
            min="1"
            max="100"
            value={rows}
            onChange={(e) => setRows(e.target.valueAsNumber)}
          />
        </div>
        <div className="platform_item item">
          <span>Enter the number of cell</span>
          <input
            className="item_counter"
            type="number"
            min="1"
            max="100"
            value={cell}
            onChange={(e) => setCells(e.target.valueAsNumber)}
          />
        </div>
        <div className="platform_button">
          <button onClick={() => createTable(columns, rows)}>Create matrix</button>
        </div>
        <div className={table.length > 0 ? `platform_button1` : `platform_button-none`}>
          <button onClick={() => addRow(columns)}>Add new row</button>
        </div>
      </div>
    </div>
  );
};

export default Platform;
