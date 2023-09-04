
import React, { useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  useEffect(() => {
    // Initialize grid
    const gridContainer = document.getElementById('gridContainer');
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      gridContainer.appendChild(cell);
    }

    const colors = ['#0acef5', '#0a97f5', '#0a58f5', '#4c0af5', '#970af5'];
    let currentColorIndex = 0;

    // fill grid with color row by row
    const fillGridRowByRow = () => {
      const cells = document.querySelectorAll('.grid-cell');
      let currentRow = 0;

      const interval = setInterval(() => {
        // Get cells for the current row
        const rowCells = Array.from(cells).slice(currentRow * 10, (currentRow + 1) * 10);
        const remainingCells = rowCells.filter(cell => cell.getAttribute('data-color') !== colors[currentColorIndex]);

        // Randomly select a remaining cell to fill in the current row
        if (remainingCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * remainingCells.length);
          const cell = remainingCells[randomIndex];

          // Fill the cell with the current color
          cell.style.backgroundColor = colors[currentColorIndex];
          cell.setAttribute('data-color', colors[currentColorIndex]);
        }

        // If current row is filled, move to the next row
        if (remainingCells.length === 0) {
          currentRow++;
        }

        // If all rows are filled, reset and change color
        if (currentRow >= 10) {
          clearInterval(interval);
          currentRow = 0;
          currentColorIndex = (currentColorIndex + 1) % colors.length;
          setTimeout(fillGridRowByRow, 50);
        }
      }, 10);
    };

    fillGridRowByRow();
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-text">alexOS is loading...</div>  
      <div className="grid-container" id="gridContainer"></div>
    </div>
  );
};

export default LoadingScreen;
