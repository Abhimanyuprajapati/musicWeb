import React, { useContext } from 'react';
import { MusicContext } from '../MusicProvider';


const Player = () => {
  const { currentSong } = useContext(MusicContext);

  if (!currentSong) return <div className="player">Select a song to play</div>;

  return (
    <div className="player">
      <div className="player-info">
        <img src={currentSong.cover} alt={currentSong.title} className="songimage" />
        <div>
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>
      <div className="player-controls">
        <button>⏮️</button>
        <button>▶️</button>
        <button>⏭️</button>
      </div>
    </div>
  );
};

export default Player;
