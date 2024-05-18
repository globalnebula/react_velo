import React from 'react';
import './styles.css';

const HexGrid = () => {
  const hexagonGrid = [];
  const rows = 3;
  const cols = 6;

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let j = 0; j < cols; j++) {
      const id = i * cols + j;
      const animationDelay = `${0.2 * id}s`;

      row.push(
        <div key={id} className={`hex hex${id}`}>
          <div className={`hex-row r${i + 1}`}>
            <div className={`hex-brick b${id}0`}>
              <div className="inner-circle"></div>
            </div>
            <div className={`hex-brick b${id}1`}>
              <div className="inner-circle"></div>
            </div>
            <div className={`hex-brick b${id}2`}>
              <div className="inner-circle"></div>
            </div>
          </div>
        </div>
      );
    }

    hexagonGrid.push(<div key={i} className={`hex-row-wrapper r${i + 1}`}>{row}</div>);
  }

  return <div className="hex-grid">{hexagonGrid}</div>;
};

export default HexGrid;
