import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, MenuItem } from '@mui/material';

const SongList = ({ songs, onPlay, favourites, toggleFavourite }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleMenuClick = (event, song) => {
    event.stopPropagation(); 
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
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="song-item"
        >
          <div
            className="song-details"
            onClick={() => onPlay(song)}
            style={{cursor:"pointer"}}
          >
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}
            >
              <img src={song.cover} alt={song.title} className="song-thumbnail" />
              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>
            <div>
              {song.duration} &nbsp;&nbsp;&nbsp;
              <button onClick={(e) => handleMenuClick(e, song)}>:</button> 
              <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
                <MenuItem onClick={handleFavouriteToggle}>
                  {favourites.some((s) => s.id === selectedSong?.id)
                    ? 'Unfavourite'
                    : 'Favourite'}
                </MenuItem>
              </Menu>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SongList;
