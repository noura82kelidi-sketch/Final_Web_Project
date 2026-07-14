import { useState, useEffect } from "react";
import { get } from "../utils/httpClient";
function TotalNumber() {
    const [users, setUsers] = useState("0");
    const [hotels, setHotels] = useState("0");
    const [bookings, setBookings] = useState("0");

    const loadNumbers = async () => {
        const users = await get(`/UsersNumber`);
        setUsers(users);
        const hotels = await get(`/HotelsNumber`);
        setHotels(hotels);
        const bookings = await get(`/BookingsNumber`);
        setBookings(bookings);
    }

    useEffect(() => {
        loadNumbers();
      });
    

    return (
        <div className="flex flex-col w-[200px] p-5 m-auto bg-yellow-200 justify-items-center">
            <div className="flex flex-col p-5 border-2 border-white mb-2">
                <p className="m-auto text-xl mb-2">Users</p>
                <p className="m-auto">{ users}</p>
            </div>
            <div className="flex flex-col p-5 border-2 border-white mb-2">
                <p className="m-auto text-xl mb-2">Hotels</p>
                <p className="m-auto">{ hotels}</p>
            </div>
            <div className="flex flex-col p-5 border-2 border-white">
                <p className="m-auto text-xl mb-2">Reserves</p>
                <p className="m-auto">{bookings }</p>
            </div>
        </div>
        );
}

export default TotalNumber;