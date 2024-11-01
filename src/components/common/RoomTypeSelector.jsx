import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../../api/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomTypes, setNewRoomTypes] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomTypes(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomTypes !== "") {
      setNewRoomTypes([...roomTypes, newRoomTypes]);
      setNewRoomTypes("");
      setShowNewRoomTypeInput(false);
    }
  };

  const handleUserClick = (e) => {
    if (e.target.value === "Add New") {
      setShowNewRoomTypeInput(true);
    } else {
      handleRoomInputChange(e);
    }
  };

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            value={newRoom.roomType}
            onChange={handleUserClick}
            name="roomType"
            id="roomType"
          >
            <option value={""}>Select a room type </option>
            <option value={"Add New"}>Add New</option>
            {roomTypes.map((t, i) => (
              <option value={t} key={i}>
                {t}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div>
              <input
                onChange={handleNewRoomTypeInputChange}
                className="form-control"
                type="text"
                placeholder="Enter a new room type"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
