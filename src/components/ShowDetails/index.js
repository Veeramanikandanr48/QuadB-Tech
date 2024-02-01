import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";
import { useBookingContext } from "../../context/BookingContext/BookingContext";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const { bookShow } = useBookingContext();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  const handleBookTicket = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookTicketConfirm = () => {
    const bookedTime = new Date().toLocaleString();
    const showData = {
      ...userData,
      genre: show.genres.join(", "), // Assuming genres is an array
      language: show.language,
      image: show.image && show.image.original,
      bookedTime,
    };

    bookShow(showData);
    setShowModal(false);
  };

  // Default image URL
  const defaultImageUrl =
    "https://imgs.search.brave.com/9rvd2lfCs_iHrQfs-SzRCqbWsjV7yhDYjZw7Q12_M_8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5EWXdPV1V5/TURJdFpUbGtaaTAw/WXpZeExUaGxNbU10/TXpNNVl6azJOalZr/WkRsaVhrRXlYa0Zx/Y0dkZVFYVnlOak13/TXpjM01qRUAuanBn";

  return (
    <div className="container">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <Spinner animation="border" variant="primary" role="status">
          </Spinner>
        </div>
      ) : show ? (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="poster-section">
              <img
                src={show.image?.original || defaultImageUrl}
                alt={show.name}
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="show-details border rounded-lg p-4">
              <h2 className="show-name font-semibold text-xl mb-3">
                {show.name}
              </h2>
              <div className="rating mb-3">
                ⭐️{show.rating?.average || "N/A"}
              </div>
              <p className="summary text-justify mb-3">
                {show.summary
                  ? show.summary.replace(/<[^>]*>/g, "")
                  : "No summary available"}
              </p>
              <div className="genres flex flex-wrap gap-2 mb-3">
                {show.genres && show.genres.length ? (
                  show.genres.map((genre, index) => (
                    <div
                      key={index}
                      className="genre bg-white text-black px-3 py-1 m-2 font-semibold rounded"
                    >
                      {genre}
                    </div>
                  ))
                ) : (
                  <p>No genres available</p>
                )}
              </div>
              <p className="mb-3">
                <strong>Language:</strong> {show.language || "N/A"}
              </p>
              <p className="mb-3">
                <strong>Genres:</strong>{" "}
                {show.genres ? show.genres.join(", ") : "N/A"}
              </p>
              <p className="mb-3">
                <strong>Status:</strong> {show.status || "N/A"}
              </p>
              <p className="mb-3">
                <strong>Runtime:</strong>{" "}
                {show.runtime ? `${show.runtime} minutes per episode` : "N/A"}
              </p>
              <p className="mb-3">
                <strong>Premiered:</strong> {show.premiered || "N/A"}
              </p>
              {show.officialSite ? (
                <Button
                  variant="primary"
                  className="mb-3"
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Site
                </Button>
              ) : null}
              {show.schedule ? (
                <p className="mb-3">
                  <strong>Schedule:</strong> {show.schedule.days.join(", ")} at{" "}
                  {show.schedule.time}
                </p>
              ) : null}
              <button
                className="btn btn-success rounded p-3 w-100 font-semibold"
                onClick={handleBookTicket}
              >
                Book now
              </button>
              
            </div>
          </div>

          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            className="text-black"
          >
            <Modal.Header closeButton>
              <Modal.Title>Book Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleBookTicketConfirm}>
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetails;
