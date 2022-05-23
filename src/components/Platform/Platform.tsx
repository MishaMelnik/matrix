import React, { useState } from 'react';
import './Platform.scss';

const Platform = () => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [cell, setCells] = useState(0);
  return (
    <div className="platform">
      <div className="platform_container">
        <h2>Matrix builder</h2>
        <div className="platform_item item">
          <span>Enter the number of columns</span>
          <div className="item_counter">
            <span className="item_button">
              <button onClick={() => setColumns(columns + 1)}>+</button>
            </span>
            <span className="item_number">{columns}</span>
            <span className="item_button">
              <button onClick={() => setColumns(columns - 1)}>-</button>
            </span>
          </div>
        </div>
        <div className="platform_item item">
          <span>Enter the number of row</span>
          <div className="item_counter">
            <span className="item_button">
              <button onClick={() => setRows(rows + 1)}>+</button>
            </span>
            <span className="item_number">{rows}</span>
            <span className="item_button">
              <button onClick={() => setRows(rows - 1)}>-</button>
            </span>
          </div>
        </div>
        <div className="platform_item item">
          <span>Enter the number of cell</span>
          <div className="item_counter">
            <span className="item_button">
              <button onClick={() => setCells(cell + 1)}>+</button>
            </span>
            <span className="item_number">{cell}</span>
            <span className="item_button">
              <button onClick={() => setCells(cell - 1)}>-</button>
            </span>
          </div>
        </div>
        <div className="platform_button">
          <button>Create matrix</button>
        </div>
      </div>
    </div>
  );
};

export default Platform;
