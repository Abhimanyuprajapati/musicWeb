import React, { useState, useEffect, useContext } from 'react';
import Player from './components/Player';
import dummySongs from './components/DummySongs';
import './styles/App.scss';
import { MusicContext } from './MusicProvider';
import SongList from './components/SongList';

function App() {
  const { setCurrentSong } = useContext(MusicContext);
  const [songs, setSongs] = useState([]);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourites')) || []
  );
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    JSON.parse(sessionStorage.getItem('recentlyPlayed')) || []
  );
  const [currentTab, setCurrentTab] = useState('forYou');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSongs(dummySongs); 
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
    setRecentlyPlayed((prev) => {
      const updated = [song, ...prev.filter((s) => s.id !== song.id)].slice(0, 10);
      sessionStorage.setItem('recentlyPlayed', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavourite = (song) => {
    const updated = favourites.some((s) => s.id === song.id)
      ? favourites.filter((s) => s.id !== song.id)
      : [...favourites, song];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const getDisplayedSongs = () => {
    const filteredSongs = songs.filter((song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (currentTab === 'recentlyPlayed') return recentlyPlayed;
    if (currentTab === 'favourites') return favourites;
    return filteredSongs;
  };

  return (
    <div className="music-player">
      <aside className="sidebar">
        <h2>Spotify</h2>
        <ul>
          <li onClick={() => setCurrentTab('forYou')}>For You</li>
          <li onClick={() => setCurrentTab('recentlyPlayed')}>Recently Played</li>
          <li onClick={() => setCurrentTab('favourites')}>Favourites</li>
        </ul>
      </aside>
      <main>
        <input
          type="text"
          placeholder="Search songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SongList
          songs={getDisplayedSongs()}
          onPlay={playSong}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      </main>
      <Player />
    </div>
  );
}

export default App;
