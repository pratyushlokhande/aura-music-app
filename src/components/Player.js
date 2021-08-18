import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faPlay,
  faPause,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  const activeSongHandler = (nextPrev) => {
    // Add Active State
    const newSongs = songs.map((s) => {
      if (s.id === nextPrev.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipSongHandler = async (direction) => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeSongHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length < 0) {
        currentIndex = songs.length;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeSongHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  // Style
  const trackAnimate = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const linearGradient = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{songInfo.duration ? getTime(songInfo.currentTime) : "0:00"}</p>
        <div style={linearGradient} className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnimate} className="animate-track"></div>
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-controls">
        <FontAwesomeIcon
          onClick={() => skipSongHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipSongHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
