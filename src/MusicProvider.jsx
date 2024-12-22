import React, { createContext, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <MusicContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </MusicContext.Provider>    
  );
};
