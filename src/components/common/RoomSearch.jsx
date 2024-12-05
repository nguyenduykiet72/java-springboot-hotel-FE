import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";
import moment from "moment";
import RoomSearchResult from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";
import { getAvailableRooms } from "../../api/ApiFunctions";
import "../../styles/RoomSearch.css";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkInMoment = moment(searchQuery.checkInDate);
    const checkOutMoment = moment(searchQuery.checkOutDate);
    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setErrorMessage("Please enter valid dates");
      return;
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }
    setIsLoading(true);
    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);
        setTimeout(() => setIsLoading(false), 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErrorMessage("");
    }
  };
  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([]);
  };

  return (
    <Container className="room-search-container">
      <Form onSubmit={handleSearch} className="room-search-form">
        <Row className="justify-content-center">
          <Col xs={12} md={3} className="mb-3">
            <Form.Group controlId="checkInDate">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={searchQuery.checkInDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Group controlId="checkOutDate">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={searchQuery.checkOutDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={3} className="mb-3">
            <Form.Group controlId="roomType">
              <Form.Label>Room Type</Form.Label>
              <div className="d-flex">
                <RoomTypeSelector
                  handleRoomInputChange={handleInputChange}
                  newRoom={searchQuery}
                />
                <Button variant="primary" type="submit" className="ml-2">
                  Search
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {isLoading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Finding available rooms...</p>
        </div>
      ) : availableRooms.length > 0 ? (
        <RoomSearchResult results={availableRooms} onClearSearch={handleClearSearch} />
      ) : (
        <Alert variant="warning" className="mt-4">
          No rooms available for the selected dates and room type.
        </Alert>
      )}
      {errorMessage && <Alert variant="danger" className="mt-4">{errorMessage}</Alert>}
    </Container>
  );
};

export default RoomSearch;
