import React from "react";

const LibrarySong = ({
  song,
  currentSong,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const currentSongHandler = async () => {
    await setCurrentSong({ ...song, active: true });

    // Add Active State
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
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

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      onClick={currentSongHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-discription">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
