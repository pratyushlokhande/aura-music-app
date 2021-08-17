import React, { useState } from "react";

// Importing Styles
import "./styles/app.scss";

// Importing Components
import Song from "./components/Song";
import Player from "./components/Player";

// Import util
import data from "./util";

function App() {
  // State
  const [songs, setSong] = useState(data());
  const [currentSong, setCurrentSong] = useState(data()[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
