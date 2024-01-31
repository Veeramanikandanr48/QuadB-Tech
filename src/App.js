// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import ShowDetails from './components/ShowDetails';
import BookedShows from './components/BookedShows';
import Navbar from './components/Header';
import Footer from './components/Footer';
import { BookingProvider } from './context/BookingContext/BookingContext';

const App = () => {
  return (
    <BookingProvider>
        <Navbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/booked-shows" element={<BookedShows />} />
          </Routes>
        </div>
        <Footer />
    </BookingProvider>
  );
};

export default App;
