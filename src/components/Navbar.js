import React from "react";
import "./components.css";

const Navbar = ({ players, count1, count2, ties }) => {
  

  return (
    <div className="Navbar-items">
    <span >
      {players[players.length - 2]} : {count1} | {players[players.length - 1]} :
      {count2}  | Ties : {ties}
    </span>
  </div>
  );
};

export default Navbar;
