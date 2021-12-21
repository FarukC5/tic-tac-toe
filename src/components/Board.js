import React, { useEffect, useState } from "react";
import "./components.css";
import EndGame from "./EndGame";
import Navbar from "./Navbar";

const Board = ({ players, newGame, trigger, setTrigger }) => {
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(players[players.length - 2]);
  const [cells, setCells] = useState(Array(9).fill(null));
  const [ties, setTies] = useState(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  
  useEffect(() => {
    const temp2 = localStorage.getItem("gameHistory");
    const loadedGameHistory = JSON.parse(temp2);
    if (loadedGameHistory) {
      setGameHistory(loadedGameHistory);
    }
  }, []);

  useEffect(() => {
    const temp2 = JSON.stringify(gameHistory);
    localStorage.setItem("gameHistory", temp2);
  }, [gameHistory]);

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  const tryAgain = () => {
    setTrigger(false);
    setCells(Array(9).fill(null));
    setWinner(null);
    setTurn(players[players.length - 2]);
    setTimeout(() => {
      setTrigger(true);
    }, 5000);
  };

  const handleClick = (num) => {
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
  };

// CheckForWinner preuzeto sa react-ove stranice uz moje dodatke

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
      
        let gameDate = (
        new Date().getDate() +
          "." +
          (new Date().getMonth() + 1) +
          " " + 
          new Date().getHours() +
          ":" +
          new Date().getMinutes()
      );
      
      
      
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
      let isDraw = { id: new Date().toString(), text: versus + ": draw" };

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] && turn === players[players.length - 2]) {
          setWinner("You winn " + players[players.length - 2] + " !!");

          // Da bi posljednji log igre bio uvijek prvi na listi nisam koristio ove metode koje su u komentarima

          /*
            setGameHistory(
              (prevGameHistory) =>
                prevGameHistory.concat(
                  gameDate,
                  versus,
                  playerss[players.length - 2]
                ) + " WON! "
            );
           */
          // setGameHistory(gameHistory.concat(gameDate + versus +  " - " + playerss[players.length - 2]) + " WON!");
          // setGameHistory([...gameHistory].concat(newHistory1))
          setGameHistory([newHistory1, ...gameHistory]);
          setCount1((prevCount1) => prevCount1 + 1);

          return;
        } else {
          setWinner("You win " + players[players.length - 1] + " !!");
          setGameHistory([newHistory2, ...gameHistory]);
          setCount2((prevCount2) => prevCount2 + 1);

          return;
          //}
        }
      }
      if (!squares.includes(null)) {
        setWinner("DRAW !");
        setGameHistory([isDraw, ...gameHistory]);
        setTies(ties + 1);
      }
    }
    return;
  };

  //  console.log(gameHistory);
  // console.log(cells);
  //  console.log("winner is: " + winner);
  //  console.log("its " + turn + " turn");

  const List = () => {
    return (
      <div
        className="popup"
        onClick={() => {
          setTrigger(true);
        }}
      >
        <div className="popup-inner">
          Game History :
          {gameHistory.map((newHistory) => (
            <p
              key={newHistory.id}
              style={{ fontSize: "12px", margin: "0px", padding: "0px" }}
            >
              {newHistory.text}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {!trigger && <List />}

      {winner && (
        <EndGame
          win={winner}
          wannaTryAgain={tryAgain}
          gameHistory={gameHistory}
        />
      )}

      {!winner && (
        <div className="Login">
          <Navbar
            players={players}
            count1={count1}
            count2={count2}
            ties={ties}
          />
          <div className="Board-wrapp" id="Board">
           <div> its <span className="turn">{turn}</span> turn</div> 
            <table>
              <tbody>
                <tr>
                  <Cell num={0} />
                  <Cell num={1} />
                  <Cell num={2} />
                </tr>
                <tr>
                  <Cell num={3} />
                  <Cell num={4} />
                  <Cell num={5} />
                </tr>
                <tr>
                  <Cell num={6} />
                  <Cell num={7} />
                  <Cell num={8} />
                </tr>
              </tbody>
            </table>
            <button
              className="button1"
              onClick={() => {
                setCells(Array(9).fill(null));
                setWinner(null);
                setTurn(players[players.length - 2]);
                setTrigger(true);
              }}
            >
              Reset Board
            </button>
            &nbsp;
            <button
              className="button1"
              onClick={() => {
                newGame();
              }}
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
