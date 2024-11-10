import React, { useEffect, useState } from "react";
import { getAllRooms } from "../../api/ApiFunctions";
import { Col } from "react-bootstrap";
import RoomFilter from "./../common/RoomFilter";
import RoomPagination from "./../common/RoomPagination";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsperPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filterRooms, setFilterRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessae, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilterRooms(rooms);
    } else {
      const filteredRooms = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilterRooms(filteredRooms);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filterRooms.slice(indexOFirstRoom, indexOfLastRoom);

  return (
    <>
      {isLoading ? (
        <p>Loading existing rooms</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-center mb-3 mt-5">
              <h2>Existing Rooms</h2>
            </div>
            <Col md={6} className="mb-3 mb-md-0">
              <RoomFilter data={rooms} setFilteredData={setFilterRooms} />
            </Col>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Id</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room, i) => (
                  <tr key={i} className="text-center">
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td>
                      <button>View / Edit</button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPagination
              currentPage={currentPage}
              totalPages={calculateTotalPages(filterRooms, roomsPerPage, rooms)}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingRooms;
