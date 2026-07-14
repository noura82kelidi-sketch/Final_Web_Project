import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { get, del, put, post } from "../utils/httpClient";
function AdminRooms() {
  const [openHotel, setOpenHotel] = useState(null);
  const { user } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [roomData, setRoomData] = useState({
    hotel_id: "",
    roomName: "",
    roomType: "",
    capacity: "",
    price: "",
    image: "",
  });
  const loadHotels = async () => {
    if (!user) return;
    const hotels = await get(`/HotelsAndRooms`);
    setHotels(hotels);
  };

  const handleUpdate = async (room) => {
    setIsEditing(true);
    setRoomData({
      ...room,
    });

    setShowModal(true);
  };
  const handleDelete = async (room_id) => {
    await del(`/Rooms/${room_id}`);
    loadHotels();
  };
  const handleAdd = (hotel) => {
    setIsEditing(false);
    setRoomData({
      hotel_id: hotel.id,
      roomName: "",
      roomType: "",
      capacity: "",
      price: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const createRoom = async () => {
    await post(`/Rooms`, roomData);
    setShowModal(false);

    loadHotels();
  };
  const saveChanges = async () => {
    await put(`/Rooms/${roomData.id}`, roomData);

    setShowModal(false);

    loadHotels();
  };
  useEffect(() => {
    loadHotels();
  }, [user]);
  return (
    <>
      <div className="space-y-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="border rounded-xl overflow-hidden shadow"
          >
            <button
              onClick={() =>
                setOpenHotel(openHotel === hotel.id ? null : hotel.id)
              }
              className="flex justify-between items-center w-full p-5 bg-white hover:bg-gray-100"
            >
              <span className="font-semibold text-lg">
                {hotel.name} {hotel.city}
              </span>

              <div className="flex items-center gap-3">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAdd(hotel)}
                >
                  Add Room
                </button>

                <span>{openHotel === hotel.id ? "▲" : "▼"}</span>
              </div>
            </button>

            {openHotel === hotel.id && (
              <div className="p-5 bg-gray-50">
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex justify-between items-center border rounded-lg p-4 mb-3 bg-white"
                  >
                    <div>
                      <h3 className="font-semibold">Room {room.roomName}</h3>

                      <p>{room.roomType}</p>

                      <p>{room.price}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(room)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      <button onClick={() => handleDelete(room.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="flex flex-col bg-white rounded-xl p-8 w-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "ویرایش اتاق" : "اضافه کردن اتاق"}
              </h2>

              <div className="flex flex-row">
                <div className="flex flex-col ml-5">
                  <input
                    name="hotel_id"
                    value={roomData.hotel_id}
                    onChange={handleChange}
                    className="border w-[180px] p-2 rounded mb-4 "
                    disabled
                  />
                  <input
                    name="roomName"
                    value={roomData.roomName}
                    onChange={handleChange}
                    placeholder="نام اتاق"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="roomType"
                    value={roomData.roomType}
                    onChange={handleChange}
                    placeholder="نوع اتاق"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="capacity"
                    value={roomData.capacity}
                    onChange={handleChange}
                    placeholder="ظرفیت اتاق"
                    className="border w-[180px] p-2 rounded mb-4"
                  />

                  <input
                    name="price"
                    value={roomData.price}
                    onChange={handleChange}
                    placeholder="قیمت هر شب"
                    className="border w-[180px] p-2 rounded mb-6"
                  />
                  <input
                    name="image"
                    value={roomData.image}
                    onChange={handleChange}
                    placeholder="عکس"
                    className="text-[16px] border w-full p-2 rounded mb-4"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  انصراف
                </button>

                <button
                  onClick={isEditing ? saveChanges : createRoom}
                  className="bg-sky-600 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "ذخیره تغییرات" : "اضافه کردن"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminRooms;
