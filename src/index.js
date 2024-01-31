// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { BookingProvider } from './context/BookingContext/BookingContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <BookingProvider>
      <App />
    </BookingProvider>
  </Router>
);
