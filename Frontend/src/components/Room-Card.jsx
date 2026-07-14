import { BASE_URL } from "../utils/httpClient";
import { useContext,useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function RoomCard({ room, defaultArrival, defaultDeparture }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleBooking = async () => {
        if (user) {
            navigate(`/booking?arrival=${defaultArrival}&departure=${defaultDeparture}&user_id=${user.id}`, {
                state: { room }
              });
        } else {
            alert("At First Login to your Account.");
        }
    }
    return (
        
            <div className="flex flex-row overflow-hidden rounded-xl bg-white border border-gray-300 hover:shadow-xl transition-shadow mb-5 p-5">
                <div className=" h-56 w-80">
                    <img
                        src={`${BASE_URL}${room.image}`}
                        alt={room.name}
                        className="h-full w-full object-cover rounded-md" />
                </div>

                <div className="flex flex-col pr-6 text-right mb-3 pl-6">
                    <h2 className="text-xl text-gray-700">{room.roomName}</h2>
                    <ul className="mt-10">
                        <li>{room.roomType}</li>
                        <li className="mt-4"> ظرفیت اتاق : {room.capacity} نفر</li>
                    </ul>
                </div>

                <div className="flex flex-col w-1/3 mr-auto border-r">
                    <span className="flex flex-row m-auto mt-18 text-2xl">
                        <span className="ml-2"> {room.price} </span>
                        تومان
                        <span className="text-gray-300 text-sm mr-2 mt-3">/ یک شب </span>
                    </span>

                    <button onClick={handleBooking} className="block w-2/3 m-auto mt-15 rounded-lg bg-sky-500 px-5 py-2 text-center text-white hover:bg-sky-600">
                        View Details
                    </button>
                </div>
            </div>
  );
}

export default RoomCard;

// استفاده از AuthContext و useContext با کمک هوش مصنوعی انجام شده.