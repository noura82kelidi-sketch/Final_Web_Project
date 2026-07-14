import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginModal from "../components/Login-SignUp-Modal";
import Hotel_Detail_Part from "../components/Hotel_Detail_Part";
import ReviewSection from "../components/ReviewSection";
import RoomsList from "../components/Rooms-List";
import { get } from "../utils/httpClient";

function Hotel_Details() {
    const [showModal, setShowModal] = useState(false);

    const [searchParams] = useSearchParams();

    const [arrival, setArrival] = useState(searchParams.get("arrival")|| "");
    const [departure, setDeparture] = useState(searchParams.get("departure")|| "");
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);
  const loadRooms = async () => {
    const rooms = await get(
      `/AvailableRooms?id=${id}&arrival=${arrival}&departure=${departure}`
    );
    setRooms(rooms);
  };
  

  useEffect(() => {
    loadRooms();
  }, [id]);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />

      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}

      <Hotel_Detail_Part id={id} />
      <div className="flex flex-row mt-15 m-auto border p-5 rounded-lg w-6xl">
        <p className="font-semibold mt-4 ml-2 mr-2">Arrival</p>
        <input
          type="date"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          className="border border-gray-500 rounded-lg w-70 px-10 py-2"
        />
        <p className="font-semibold mt-4 ml-2 mr-5">Departure</p>
        <input
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="border border-gray-500 rounded-lg w-70 px-10 py-2"
        />
        <button onClick={loadRooms} className="text-sky-500 bg-neutral-primary border border-sky-500 hover:bg-sky-500 hover:text-white font-semibold rounded-xl text-m w-65 h-14 m-auto">
          Search
        </button>
      </div>

      <RoomsList
              rooms={rooms || []}
              arrival={arrival}
              departure={departure}
      />
      <ReviewSection hotel_id={id} />
    </>
  );
}

export default Hotel_Details;
