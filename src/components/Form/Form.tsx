import React, { useState } from 'react';
import './Form.scss';
import getTable from '../../store/appStores/matrixStore/selector';
import { useSelector } from 'react-redux';
import percentCalculation from '../function/percentCalculation';

const Form = () => {
  const table = useSelector(getTable);
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [cell, setCells] = useState(0);

  const createTable = () => {
    const newTable = [];

    for (let i = 0; i < rows; i += 1) {
      const row = [];

      for (let j = 0; j < columns; j += 1) {
        let amount = Math.floor(Math.random() * 1000);

        if (amount < 100) {
          amount += 100;
        }

        row.push({
          amount,
          percent: '',
          id: Math.random(),
          columns,
          rows,
          cell,
        });
      }

      newTable.push(row);
    }

    percentCalculation(newTable);
    setColumns(0);
    setRows(0);
    setCells(0);
  };
  const addRow = () => {
    const matrix = [...table];
    const newTabl = matrix.flat(1);
    const newTable = newTabl[0];

    const row = [];

    for (let j = 0; j < newTable?.columns; j += 1) {
      let amount = Math.floor(Math.random() * 1000);

      if (amount < 100) {
        amount += 100;
      }

      row.push({
        amount,
        id: Math.random(),
      });
    }

    matrix.push(row);
    percentCalculation(matrix);
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
          <button onClick={() => createTable()}>Create matrix</button>
        </div>
        <div className={table?.length > 0 ? `platform_button1` : `platform_button-none`}>
          <button onClick={() => addRow()}>Add new row</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
