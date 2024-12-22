import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MusicProvider } from './MusicProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <MusicProvider>
     <App />
     </MusicProvider>
  </StrictMode>,
)
