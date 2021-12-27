import "./components.css";
import React, { useState } from "react";

const Login = ({
  playerChangeHandler1,
  playerChangeHandler2,
  addNewPlayerHandler,
}) => {
  const [disabled, setDisabled] = useState(false);

  const checkLenghtHandler = (e) => {
    if (e.target.value !== "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  return (
    <div className="Login">
     &nbsp; &nbsp;
        <div className="Login-screen">
        <form >
        <h2>Player 1 </h2>
          <input onInput={playerChangeHandler1} type="text" />
          <h2>Player 2 </h2>
          <input
            onChange={(e) => {
              checkLenghtHandler(e);
            }}
            onInput={playerChangeHandler2}
            type="text"
          />
          &nbsp; &nbsp;
          <div className="span1">
          &nbsp; &nbsp;
          <button
            type="submit"
            className="button1"
            onClick={addNewPlayerHandler}
            disabled={!disabled}
          >
            S T A R T
          </button>
          </div>
        </form>
     </div>
    </div>
  );
};

export default Login;
