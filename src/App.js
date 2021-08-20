import React, { useState, useRef, useEffect } from "react";
import "./styles/app.scss";
//Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import data
import chillhop from "./data";
//Util
import { playAudio } from "./util";

function App() {
  //Ref
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(chillhop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [bodyBg, setBodyBg] = useState("#11052c");

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    playAudio(isPlaying, audioRef);
    return;
  };

  const bg = {
    backgroundImage: `url(${currentSong.cover})`,
    clipPath: `circle(${(isPlaying ? 100 : 0) + "%"} at 50% 50%)`,
  };

  const getColor = () => {
    const colors = [
      "#11052C",
      "#1B2021",
      "#261C2C",
      "#003638",
      "#171010",
      "#171717",
      "#0A1D37",
      "#0A1931",
    ];

    return colors[(Math.random() * colors.length) | 0];
  };

  // Use Effect
  useEffect(() => {
    setBodyBg(getColor);
  }, [currentSong]);

  return (
    <div
      style={{ backgroundColor: bodyBg }}
      className={`App ${libraryStatus ? "library-active" : ""}`}
    >
      <div style={bg} className="overlay"></div>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song isPlaying={isPlaying} currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
