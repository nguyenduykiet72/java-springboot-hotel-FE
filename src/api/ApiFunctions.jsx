import axios from "axios";

const local = import.meta.env.VITE_LOCAL_HOST;

export const api = axios.create({
  baseURL: `${local}`,
});

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    console.log(error.response.message);
    throw new Error("Error fetching room types");
  }
}

export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return  result.data;
  } catch (error) {
    console.log(error.response.message);
    throw new Error("Error fetching rooms");
  }
}
