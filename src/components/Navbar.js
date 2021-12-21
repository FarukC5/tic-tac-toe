import React from "react";

const Navbar = ({ players, count1, count2, ties }) => {
  const styles = {
    fontWeight: "lighter",
    fontSize: "14px",
    margin: "0",
    paddingBottom: "5px",
    display: "flex",
    justifyContent: "center",
    borderBottom: "1px solid grey",
    position: "inherit",
  };

  return (
    <h3 style={styles}>
      {" "}
      {players[players.length - 2]} : {count1} | {players[players.length - 1]} :{" "}
      {count2} | Ties : {ties}{" "}
    </h3>
  );
};

export default Navbar;
