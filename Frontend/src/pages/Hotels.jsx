import { useSearchParams } from "react-router-dom";
import {useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/Login-SignUp-Modal";
import SearchBox from "../components/SearchBox";
import Bell from "../assets/Bell.jpg";
import { get } from '../utils/httpClient';
import HotelsList from "../components/Hotels-List";


function Hotels() {
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);

  const city = searchParams.get("city") || "";
  const arrival = searchParams.get("arrival") || "";
  const departure = searchParams.get("departure") || "";
  
  
  const loadHotels = async () => {
    const data = await get(`/Hotels?city=${city}`)
    setHotels(data);
  }

  useEffect(() => {
    loadHotels()
  }, [city])


    return (
      <>
        <Navbar openLogin={() => setShowModal(true)} />
  
        {showModal && (
          <LoginModal closeModal={() => setShowModal(false)} />
        )}
            
        <SearchBox image={Bell} marginTop={"-mt-75"} defaultCity={city} defaultArrival={arrival} defaultDeparture={departure}/>

        <HotelsList hotels={hotels|| []}/>
      </>
    );
}

export default Hotels;