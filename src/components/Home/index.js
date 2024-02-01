import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import './index.css';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [defaultQueryCompleted, setDefaultQueryCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption] = useState('name');
  const [showsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    axios.get(`https://api.tvmaze.com/search/shows?q=all&_sort=${sortOption}`)
      .then(response => {
        setShows(response.data);
        setDefaultQueryCompleted(true);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [sortOption]);

  const defaultImageUrl = 'https://imgs.search.brave.com/9rvd2lfCs_iHrQfs-SzRCqbWsjV7yhDYjZw7Q12_M_8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5EWXdPV1V5/TURJdFpUbGtaaTAw/WXpZeExUaGxNbU10/TXpNNVl6azJOalZr/WkRsaVhrRXlYa0Zx/Y0dkZVFYVnlOak13/TXpjM01qRUAuanBn';

  const handleSearch = () => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}&_sort=${sortOption}`)
      .then(response => {
        setShows(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
      <h1 className="mb-4 text-center">Explore TV Shows</h1>
      <Form.Group controlId="formSearch" className='d-flex flex-row justify-content-center align-items-center m-4'>
        <Form.Control
          type="text"
          placeholder="Search for shows..."
          className='m-2'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary p-2" onClick={handleSearch}>
          Search
        </Button>
      </Form.Group>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="row justify-content-center">
          {defaultQueryCompleted && currentShows.map(show => (
            <div key={show.show.id} className="col-md-3 mb-4">
              <Card className="card-theme">
                <div className="poster-section">
                  <Card.Img variant="top" src={show.show.image && show.show.image.medium ? show.show.image.medium : defaultImageUrl} />
                </div>
                <Card.Body>
                  <Card.Title className="text-center">{show.show.name}</Card.Title>
                  <Link to={`/show/${show.show.id}`} style={{ textDecoration: 'none' }}>
                    <Button variant="primary">Show Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[...Array(Math.ceil(shows.length / showsPerPage))].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Home;
