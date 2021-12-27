import React, { useState, useEffect } from "react";
import Login from "./Login";
import Board from "./Board";

const Game = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [players, setPlayers] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);


  useEffect(() => {
    const temp = localStorage.getItem("players");
    const loadedPlayers = JSON.parse(temp);
    if (loadedPlayers) {
      setPlayers(loadedPlayers);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(players);
    localStorage.setItem("players", temp);
  }, [players]);



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

  const addNewPlayerHandler = (e) => {
    e.preventDefault();
    setTrigger(true);
    if (player2 !== "" && player1 !== "") {
      setPlayers((prevPlayers) => prevPlayers.concat(player1, player2));
    } else alert("enter player names");
    return;
  };

  const playerChangeHandler1 = (e) => {
    setPlayer1(e.target.value.trim());
  };

  const playerChangeHandler2 = (e) => {
    setPlayer2(e.target.value.trim());
  };

  const newGame = () => {
    setPlayers([]);
    setGameHistory([]);
  };

  return (
    
    
    <div className="main-container">
     <p>Tic Tac Toe</p>
     
      {[...players].length > 1 && (
        <Board
          players={players}
          newGame={newGame}
          trigger={trigger}
          setTrigger={setTrigger}
          gameHistory={gameHistory}
          setGameHistory={setGameHistory}
        />
      )}
      {[...players].length < 1 && (
        <Login
          addNewPlayerHandler={addNewPlayerHandler}
          playerChangeHandler1={playerChangeHandler1}
          playerChangeHandler2={playerChangeHandler2}
        />
      )}
    </div>
  );
};

export default Game;
