import React from 'react';

const GameOver = ({ restartGame }) => (
  <div className="justify-center">
    <h1>Game Over!</h1>
    <h3>You Won!!</h3>
    <button className="restart-button" onClick={restartGame}>Restart Game</button>
  </div>
);

export default GameOver;