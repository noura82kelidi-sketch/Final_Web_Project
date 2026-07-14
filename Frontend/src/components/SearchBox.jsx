import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SearchBox({image, marginTop, defaultCity,defaultArrival,defaultDeparture}) {
    const [city, setCity] = useState(defaultCity);
    const [arrival, setArrival] = useState(defaultArrival);
    const [departure, setDeparture] = useState(defaultDeparture);

    const navigate = useNavigate();
    
    const handleSearch = () => {

        if (!arrival || !departure || !city) {
            alert("Please fill in all fields.");
            return;
        }
    
        if (new Date(arrival) >= new Date(departure)) {
            alert("Departure date must be after arrival date.");
            return;
        }
    
        navigate(
            `/hotels?city=${city}&arrival=${arrival}&departure=${departure}`
        );
    };

    return (
        <nav className='relative h-[30rem] w-full '>
            <img className='relative z-0' src={image} alt="" />
            <div className={`flex flex-col relative w-6xl h-50 m-auto border-0 border-solid border-white bg-white/80 rounded-xl p-7 shadow-md z-10 ${marginTop}`}>
                <div className='flex flex-row justify-around'>
                    <div>
                        <p className='font-semibold'>Arrival</p>
                        <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className="border border-gray-500 rounded-lg w-70 px-10 py-2" />
                    </div>
                    <div className='relative '>
                        <p className='font-semibold'>Departure</p>
                        <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className="border border-gray-500 rounded-lg w-70 px-10 py-2" />
                    </div>
                    <div >
                        <p className='font-semibold'>City</p>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className='border border-gray-500 rounded-lg w-70 px-10 py-2' type="Text" />
                    </div>
                </div>
                <button onClick={handleSearch} className="text-sky-500 bg-neutral-primary border border-sky-500 hover:bg-sky-500 hover:text-white font-semibold rounded-xl text-m w-60 h-14 mt-10 m-auto">Search</button>
            </div>
        </nav>
    )
}

export default SearchBox;

//Navigate ->  AI