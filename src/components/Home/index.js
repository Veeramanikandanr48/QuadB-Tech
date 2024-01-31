// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './index.css';

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setShows(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Default image URL for shows without an image
  const defaultImageUrl = 'https://imgs.search.brave.com/9rvd2lfCs_iHrQfs-SzRCqbWsjV7yhDYjZw7Q12_M_8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5EWXdPV1V5/TURJdFpUbGtaaTAw/WXpZeExUaGxNbU10/TXpNNVl6azJOalZr/WkRsaVhrRXlYa0Zx/Y0dkZVFYVnlOak13/TXpjM01qRUAuanBn';

  return (
    <div className="container mt-3">
      <h1 className="mb-4">TV Shows</h1>
      <div className="row">
        {shows.map(show => (
          <div key={show.show.id} className="col-md-4 mb-4">
            <Card>
              <div className="poster-section">
                <Card.Img variant="top" src={show.show.image && show.show.image.medium ? show.show.image.medium : defaultImageUrl} />
              </div>
              <Card.Body>
                <Card.Title>{show.show.name}</Card.Title>
                <Link to={`/show/${show.show.id}`}>
                  <Button variant="primary">Show Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
