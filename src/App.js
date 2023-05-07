import { useState } from "react";
import uuid from "react-uuid";

import Die from "./Components/Die";
import "./styles.css";

const generateRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateRandomDie = () => {
  const array = [];
  for (let i = 1; i <= 10; i++) {
    array.push({
      value: generateRandomNumber(1, 6),
      isHeld: false,
      id: uuid()
    });
  }
  return array;
};

export default function App() {
  const [newDice, setNewDice] = useState(generateRandomDie());
  const [attempts, setAttempts] = useState(0);

  const handleRoll = () => {
    setNewDice((prevState) =>
      prevState.map((die) =>
        die.isHeld ? die : { ...die, value: generateRandomNumber(1, 6) }
      )
    );
    setAttempts((prevState) => prevState + 1);
  };

  console.log(newDice);
  const handleHold = (id) => {
    setNewDice((prevState) =>
      prevState.map((e) => (e.id === id ? { ...e, isHeld: !e.isHeld } : e))
    );
  };

  const handlePlayAgain = () => {
    setNewDice(generateRandomDie());
  };

  return (
    <div className="App">
      <h1>Tenzies</h1>
      <p style={{ marginBottom: "2rem" }}>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice--list">
        {newDice.map((die) => (
          <Die
            number={die.value}
            isHeld={die.isHeld}
            id={die.id}
            key={die.id}
            handleHold={() => handleHold(die.id)}
          />
        ))}
      </div>

      {newDice.filter((e) => e.isHeld === false).length === 0 ? (
        <>
          <h2>YAY, YOU WON!🥳</h2>
          <h4>{`You took ${attempts} attempts 🤯`}</h4>
        </>
      ) : (
        ""
      )}

      {newDice.filter((e) => e.isHeld === false).length === 0 ? (
        <button onClick={handlePlayAgain} className="play--btn">
          Play Again
        </button>
      ) : (
        <button onClick={handleRoll} className="roll-btn">
          Roll
        </button>
      )}
    </div>
  );
}
