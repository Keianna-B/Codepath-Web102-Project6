import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Amiibo from './components/Amiibo.jsx'
//import NotFound from './components/NotFound.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path="/" element={<App />} />
        <Route index={false} path="/amiibo/:id" element={<Amiibo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
