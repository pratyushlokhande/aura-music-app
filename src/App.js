import React, { useState, useRef } from "react";

// Importing Styles
import "./styles/app.scss";

// Importing Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

// Import data
import data from "./data";

function App() {
  // Ref
  const audioRef = useRef(null);

  const setTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // animation Percentage
    const roundCurrent = Math.round(current);
    const roundDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundCurrent / roundDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage,
    });
  };

  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(data()[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        currentSong={currentSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={setTimeHandler}
        onLoadedMetadata={setTimeHandler}
        onEnded={songEndedHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
