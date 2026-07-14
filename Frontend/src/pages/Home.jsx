import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import LoginModal from "../components/Login-SignUp-Modal";
import tomb from "../assets/Tomb.jpg";

function Home() {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
        <Navbar openLogin={() => setShowModal(true)} />
  
        <SearchBox image={tomb} marginTop={"-mt-50"} defaultArrival="" defaultDeparture="" defaultCity="" />
  

        {showModal && (
          <LoginModal closeModal={() => setShowModal(false)} />
        )}
      </>
    );
}

export default Home;

// در این فایل قسمت های مربوط به مودال با هوش مصنوعی نوشته شده است.