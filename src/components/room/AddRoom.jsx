import React, { useState } from "react";
import { addRoom } from "../../api/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";
import { FaUpload, FaHotel, FaArrowLeft, FaSave } from "react-icons/fa";
import "../../styles/Addroom.css"

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(
        newRoom.photo,
        newRoom.roomType,
        newRoom.roomPrice
      );
      if (success !== undefined) {
        setSuccessMessage("A new room was  added successfully !");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding new room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div className="container-fluid px-4 py-5 bg-light">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">
                <FaHotel className="me-2" />
                Add New Room
              </h3>
            </div>
            
            <div className="card-body p-4">
              {successMessage && (
                <div className="alert alert-success fade show">
                  <i className="fas fa-check-circle me-2"></i>
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger fade show">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="mb-4">
                  <label htmlFor="roomType" className="form-label fw-bold">
                    Room Type
                  </label>
                  <RoomTypeSelector
                    handleRoomInputChange={handleRoomInputChange}
                    newRoom={newRoom}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="roomPrice" className="form-label fw-bold">
                    Room Price (per night)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      required
                      type="number"
                      min="1"
                      className="form-control"
                      id="roomPrice"
                      step="0.01"
                      name="roomPrice"
                      value={newRoom.roomPrice}
                      onChange={handleRoomInputChange}
                      placeholder="Enter room price"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="photo" className="form-label fw-bold">
                    Room Photo
                  </label>
                  <div className="input-group">
                    <input
                      required
                      name="photo"
                      id="photo"
                      type="file"
                      className="form-control"
                      onChange={handleImageChange}
                    />
                    <label className="input-group-text" htmlFor="photo">
                      <FaUpload className="me-2" /> Upload
                    </label>
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-3 text-center">
                      <img
                        src={imagePreview}
                        alt="Room preview"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <Link
                    to="/existing-rooms"
                    className="btn btn-outline-secondary"
                  >
                    <FaArrowLeft className="me-2" />
                    Back to Rooms
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <FaSave className="me-2" />
                    Save Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
