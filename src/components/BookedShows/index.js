import React from 'react';
import { useBookingContext } from '../../context/BookingContext/BookingContext';

const BookedShows = () => {
  const { bookedShows, removeBookedShow } = useBookingContext();

  const handleRemove = (index) => {
    removeBookedShow(index);
  };

  return (
    <div className="container p-5" style={{ height: '100vh' }}>
      <h2 className="mb-4">Booked Shows</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Language</th>
              <th scope="col">Booked Time</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookedShows.map((show, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={show.image} width='100px' className="img-thumbnail" alt={show.name} />
                </td>
                <td>{show.name}</td>
                <td>{show.genre}</td>
                <td>{show.language}</td>
                <td>{show.bookedTime}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookedShows.length === 0 && <p>No booked shows available</p>}
    </div>
  );
};

export default BookedShows;
