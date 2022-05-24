import React, { useState } from 'react';
import './Matrix.scss';
import getTable from '../../store/appStores/matrixStore/selector';
import { useSelector } from 'react-redux';

const Matrix = () => {
  const table = useSelector(getTable);
  const [average, handleAverage] = useState([]);
  console.log(handleAverage);
  return (
    <div className={table.length > 0 ? `showTable` : `showTable-none`}>
      <ul className="showTable__list">
        {table?.map((row: any, i: string) => (
          <li className="showTable__item" key={Math.random()}>
            {row?.map((show: any) => (
              <div className="showTable__row" key={Math.random()}>
                <button
                  type="button"
                  value={show.id}
                  className={
                    !show.hover ? 'showTable__amount' : 'showTable__amount showTable__amount--near'
                  }
                  // onMouseEnter={(event) => hoverAmount(event)}
                  // onMouseLeave={() => endHoverAmount()}
                  // onClick={(event) => amountClick(event)}
                >
                  {!show.showPercent ? show.amount : `${show.percent} %`}

                  <div
                    style={{
                      height: `${+show.percent}%`,
                    }}
                    className={
                      !show.showProcent ? 'showTable__procent--none' : 'showTable__procent'
                    }
                  ></div>
                </button>
              </div>
            ))}
            <span
              className="showTable__sum"
              id={i}
              // onMouseEnter={(event) => showProcent(event)}
              // onMouseLeave={() => endShowProcent()}
            >
              {row?.reduce((acc: number, current: any) => acc + current.amount, 0)}
            </span>
            <div>
              <button
                className="showTable__remove"
                type="button"
                value={i}
                // onClick={(event) => removeRow(event)}
              >
                X
              </button>
            </div>
          </li>
        ))}
        <li className="showTable__item showTable__average">
          {average?.map((amount: number) => (
            <span key={Math.random()} className="showTable_amount showTable_average-item">
              {amount}
            </span>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default Matrix;
