import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookingContext } from '../../context/BookingContext/BookingContext';

const Navbar = () => {
  const { bookedShows } = useBookingContext();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex flex-row">
        <Link className="navbar-brand" to="/">
          TV Shows
        </Link>

        <button
          className={`navbar-toggler ${isNavCollapsed ? 'collapsed' : ''}`}
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${isNavCollapsed ? 'collapse' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsNavCollapsed(true)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booked-shows" onClick={() => setIsNavCollapsed(true)}>
                Booked Shows ({bookedShows.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
