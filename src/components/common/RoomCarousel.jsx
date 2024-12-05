import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { getAllRooms } from "../../api/ApiFunctions";
import { FaBed, FaArrowRight } from "react-icons/fa";
import "../../styles/RoomCarousel.css";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading amazing rooms for you...</p>
      </div>
    );
  }

  if (errorMessage) {
    return <div className="error-message">Error: {errorMessage}</div>;
  }

  return (
    <section className="room-carousel-section">
      <div className="section-header">
        <h2 className="section-title">Our Luxurious Rooms</h2>
        <Link to="/browse-all-rooms" className="view-all-link">
          View All Rooms <FaArrowRight className="arrow-icon" />
        </Link>
      </div>

      <Container>
        <Carousel 
          indicators={false} 
          className="custom-carousel"
          interval={5000}
        >
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card className="room-card">
                      <div className="card-image-wrapper">
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt={room.roomType}
                          className="room-image"
                        />
                        <div className="card-overlay">
                          <Link to={`/book-room/${room.id}`} className="view-details-btn">
                            View Details
                          </Link>
                        </div>
                      </div>
                      <Card.Body>
                        <div className="room-type">
                          <FaBed className="bed-icon" />
                          <Card.Title>{room.roomType}</Card.Title>
                        </div>
                        <Card.Text className="room-price">
                          ${room.roomPrice}
                          <span className="per-night">/night</span>
                        </Card.Text>
                        <Link
                          to={`/book-room/${room.id}`}
                          className="book-now-btn"
                        >
                          Book Now
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
