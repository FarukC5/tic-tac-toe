import "./App.css";
import React from "react";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ color: "#282c34", margin:"15px" }}>Tic-Tac-Toe</h2>
       <Game />
      </header>
    </div>
  );
}

export default App;

/*  

- Game komponenta je Parent za komponente Board i Login
a Board komponenta je Parent za Navbar i EndGame komponente kao i lista historije igre u formi pop-up,
medjutim nakon refresha se pojavi i nestaje na klik ili 5 sec regulranim tokom

Game 
    Login
    Board
        Navbar
        EndGame
        List

- iz Game komponente sam preko props-a prebacio pointere na funkciju u Login komponentu

- Navbar komponentu sam stavio unutar Borad komponente ukoliko ne treba biti uvijek pristurna na ekranu?
Aplikacija smjesta u localStorage imena igraca i historiju igre a imam i kopiju ukoliko treba izmjena 
da spasi i broj pobjeda igraca nakon refresha.

- Prvobitna ideja je bila da sve nove igrace smjestam u array i da uzimam samo zadnja 2 tako da sam kroz citav kod
koristio .length -2 i -1 za zadnja 2 igraca iako su uvijek i prisutna samo 2 igraca jer New Game brise array i ubacuje nove,
brisem postojeci array posto mi je array.length trebao za pocetak igre i zatvaranje Login komponente i prikaz Board komponente

- provjeru pobjednika sam preuzeo sa react-ove stranice i dodao jos koda 

*/