import { useState } from "react";
function DateSearchBox({defaultArrival,defaultDeparture}) {

    const [arrival, setArrival] = useState(defaultArrival);
    const [departure, setDeparture] = useState(defaultDeparture);

    const handleSearch = () => {
    }
    return (
        <div className='flex flex-row mt-15 m-auto border p-5 rounded-lg w-6xl'>
                    
            <p className='font-semibold mt-4 ml-2 mr-2'>Arrival</p>
            <input type="date " value={arrival} onChange={(e) => setArrival(e.target.value)} className="border border-gray-500 rounded-lg w-70 px-10 py-2" />    
            <p className='font-semibold mt-4 ml-2 mr-5'>Departure</p>
            <input type="date " value={departure} onChange={(e) => setDeparture(e.target.value)} className="border border-gray-500 rounded-lg w-70 px-10 py-2" />
            <button onClick={handleSearch} className="text-sky-500 bg-neutral-primary border border-sky-500 hover:bg-sky-500 hover:text-white font-semibold rounded-xl text-m w-65 h-14 m-auto">Search</button>      
        </div>
    );
}

export default DateSearchBox;