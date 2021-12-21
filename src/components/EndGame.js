import React from "react";
import "./components.css";
                                   
const EndGame = ({ win, wannaTryAgain }) => {
 
  return (
    <div className="Login">
      <div className="Login-screen">
        <h4 style={{ display: "flex", justifyContent: "center" }}> {win} </h4>
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
