// BookingContext.js
import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

export const useBookingContext = () => {
  return useContext(BookingContext);
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'BOOK_SHOW':
      return {
        bookedShows: [...state.bookedShows, action.payload],
      };
    case 'REMOVE_BOOKED_SHOW':
      return {
        bookedShows: state.bookedShows.filter((show, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, { bookedShows: [] });

  const bookShow = (showDetails) => {
    const bookedTime = new Date().toLocaleString();
    const showData = { ...showDetails, bookedTime };
    dispatch({ type: 'BOOK_SHOW', payload: showData });
  };

  const removeBookedShow = (index) => {
    dispatch({ type: 'REMOVE_BOOKED_SHOW', payload: index });
  };

  return (
    <BookingContext.Provider value={{ bookedShows: state.bookedShows, bookShow, removeBookedShow }}>
      {children}
    </BookingContext.Provider>
  );
};
