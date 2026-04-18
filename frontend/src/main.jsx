import React, { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import ScrollToTop from './utils/ScrollToTop.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ScrollToTop/>
    <App />
  </BrowserRouter>,
)
