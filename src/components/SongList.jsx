import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, MenuItem } from '@mui/material';

const SongList = ({ songs, onPlay, favourites, toggleFavourite }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleMenuClick = (event, song) => {
    setAnchorEl(event.currentTarget);
    setSelectedSong(song);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSong(null);
  };

  const handleFavouriteToggle = () => {
    toggleFavourite(selectedSong);
    handleMenuClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="song-list"
    >
      <h2>For You</h2>
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="song-item"
        >
          <div className="song-details">
            <img src={song.cover} alt={song.title} className="song-thumbnail" />
            <div>
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          </div>
          <button onClick={() => onPlay(song)}>Play</button>
          <button onClick={(e) => handleMenuClick(e, song)}>⋮</button>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
            <MenuItem onClick={handleFavouriteToggle}>
              {favourites.some((s) => s.id === selectedSong?.id)
                ? 'Unfavourite'
                : 'Favourite'}
            </MenuItem>
          </Menu>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SongList;
