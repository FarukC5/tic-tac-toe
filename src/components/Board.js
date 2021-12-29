import React, { useState } from "react";
import "./components.css";
import EndGame from "./EndGame";
import Navbar from "./Navbar";

const Board = ({
  players,
  newGame,
  trigger,
  setTrigger,
  gameHistory,
  setGameHistory,
}) => {
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(players[players.length - 2]);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [ties, setTies] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const Cell = ({ num }) => {
    return (
      <td className="cell" onClick={() => handleClick(num)}>
        {cells[num]}
      </td>
    );
  };

  const tryAgain = () => {
    setTrigger(false);
    setCells(Array(9).fill(null));
    setWinner(null);
    // setTurn( counter % 2 ? players[players.length - 1] : players[players.length -2]);
    setTurn(
      (count1 + count2 + ties) % 2
        ? players[players.length - 1]
        : players[players.length - 2]
    );

    setTimeout(() => {
      setTrigger(true);
    }, 5000);
  };

  const handleClick = (num) => {
    if (trigger === true) {
      if (cells[num] !== null) {
        alert("Choose unoccupied cell");
        return;
      }
      let squares = [...cells];
      if (turn === players[players.length - 2]) {
        squares[num] = "X";
        setTurn(players[players.length - 1]);
      } else {
        squares[num] = "O";
        setTurn(players[players.length - 2]);
      }
      checkForWinner(squares);
      setCells(squares);
    }
  };

  const checkForWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      let gameDate =
        new Date().getDate() +
        "." +
        (new Date().getMonth() + 1) +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes();

      let versus =
        gameDate +
        " " +
        players[players.length - 2] +
        " VS " +
        players[players.length - 1] +
        " ";

      let newHistory1 = {
        id: new Date().toString(),
        text: versus + ": " + players[players.length - 2] + " won ",
      };
      let newHistory2 = {
        id: new Date().toString(),
        text: versus + ": " + players[players.length - 1] + " won ",
      };
      let isDraw = {
        id: new Date().toString(),
        text: versus + ": Tie !" /* ": draw"*/,
      };

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] && turn === players[players.length - 2]) {
          setWinner("You win " + players[players.length - 2] + " !!");
          setGameHistory([newHistory1, ...gameHistory]);
          setCount1((prevCount1) => prevCount1 + 1);
          if (!squares.includes(null)) {
            setTies((prevTies) => prevTies - 1);
          }
          return;
        } else {
          setWinner("You win " + players[players.length - 1] + " !!");
          setGameHistory([newHistory2, ...gameHistory]);
          setCount2((prevCount2) => prevCount2 + 1);
          if (!squares.includes(null)) {
            setTies((prevTies) => prevTies - 1);
         }
          return;
        }
       
      } if (!squares.includes(null)) {
        setTies(ties + 1);
        setWinner("Tie !");
        setGameHistory([isDraw, ...gameHistory]);
      }
    }
    return null;
  };

  const List = () => {
    return (
      <div
        className="popup"
        onClick={() => {
          setTrigger(true);
        }}
      >
        <div className="popup-inner">
          <div className="close-button">
            <span>Game History :</span>
            <button>X</button>
          </div>
          &nbsp;
          <div className="scroll">
            {gameHistory.map((newHistory) => (
              <p
                key={newHistory.id}
                style={{
                  fontSize: "90%",
                  fontWeight: "normal",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                {newHistory.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="Board">
      {!trigger && <List />}

      {winner && (
        <EndGame
          win={winner}
          wannaTryAgain={tryAgain}
          gameHistory={gameHistory}
        />
      )}

      {!winner && (
        <div className="Board-screen">
          <Navbar
            players={players}
            count1={count1}
            count2={count2}
            ties={ties}
          />
          <div className="span12">
            <span className="span2">its</span>
            &nbsp;
            <span className="turn">{turn} </span>
            &nbsp;
            <span className="span2">turn</span>
          </div>
          <div className="subBoard-screen">
            <table>
              <tbody>
                <tr>
                  <Cell num={0} />
                  <Cell num={1} />
                  <Cell num={2} />
                  <Cell num={3} />
                  <Cell num={4} />
                  <Cell num={5} />
                  <Cell num={6} />
                  <Cell num={7} />
                  <Cell num={8} />
                </tr>
              </tbody>
            </table>
          </div>
          &nbsp;
          <button
            className="button1"
            onClick={() => {
              newGame();
            }}
          >
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
