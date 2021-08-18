import React from "react";
// Import Components
import LibrarySong from "./LibrarySong";

const Library = ({
  currentSong,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            currentSong={currentSong}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
