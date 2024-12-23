import React, { useContext, useRef, useState } from "react";
import { MusicContext } from "../MusicProvider";

const Player = () => {
  const { currentSong } = useContext(MusicContext);
  const audioRef = useRef(null); 
  const [isPlaying, setIsPlaying] = useState(false); 


  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause(); 
    } else {
      audioRef.current.play(); 
    }
    setIsPlaying(!isPlaying); 
  };
  
  if (!currentSong) return <div className="player">Select a song to play</div>;

  return (
    <div className="player">
      <div className="player-info1">
        <div className="player-info">
          <div className="player-info2">
            <h3 className="playerHeader">{currentSong.title}</h3>
            <p className="playerTitle">{currentSong.artist}</p>
          </div>
          <div>
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="songimage"
            />
          </div>

          <div className="player-controls">
            <button>⏮️</button>
          
            <button onClick={togglePlay}>
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button>⏭️</button>
          </div>
        </div>
      </div>

     
      <audio ref={audioRef} src={currentSong.filesong} />
    </div>
  );
};

export default Player;
