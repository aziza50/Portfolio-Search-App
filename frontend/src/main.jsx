import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Commented out StrictMode to avoid WebGL re-renders in dev
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
