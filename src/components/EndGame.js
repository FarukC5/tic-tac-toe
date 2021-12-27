import React from "react";
import "./components.css";
                                   
const EndGame = ({ win, wannaTryAgain }) => {
 
  return (
    <div className="End-game">
      &nbsp;
      <div className="End-game-screen">
        <h4 style={{ display: "flex", justifyContent: "center" /*, fontSize:"150%"*/ }}> {win} </h4>
       &nbsp;
        <div>
          <button className="button1" onClick={wannaTryAgain}>
            Wanna Try again?
          </button>
        </div>
        &nbsp;
      </div  >
    </div>
  );
};

export default EndGame;
