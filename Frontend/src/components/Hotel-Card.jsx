import { BASE_URL } from "../utils/httpClient";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function HotelCard({ hotel }) {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city") || "";
    const arrival = searchParams.get("arrival") || "";
    const departure = searchParams.get("departure") || "";
    return (
        <div className="flex flex-row overflow-hidden rounded-xl bg-white border border-gray-300 hover:shadow-xl transition-shadow mb-5 p-5">

            <div className=" h-56 w-80">
                <img
                    src={`${BASE_URL}${hotel.image}`}
                    alt={hotel.name}
                    className="h-full w-full object-cover rounded-md"
                />
            </div>

          
            <div className="flex flex-col pr-6 text-right mb-3 pl-6">
                
                <h2 className="text-2xl font-bold text-gray-700">
                هتل  {hotel.name} 
                </h2>

                <p className="mt-10 text-gray-500">
                    {hotel.address}
                </p>

                <p className="mt-20 flex flex-row">
                    {Array.from({ length:  hotel.stars }).map((_, index) => (
                        <i className="fa-solid fa-star text-yellow-500"></i>
                    ))} 
                </p>
            

        </div>

        <div  className="flex flex-col w-1/3 mr-auto border-r">

                <span className="flex flex-row m-auto mt-18 text-2xl">
                    
                    <span className="ml-2"> {hotel.price} </span>
                    تومان 
                    <span className="text-gray-300 text-sm mr-2 mt-3">/ یک شب </span>
                    
                </span>

                <Link
                    to={`/hotel/${hotel.id}?city=${city}&arrival=${arrival}&departure=${departure}`}
                    className="block w-2/3 m-auto mt-15 rounded-lg bg-sky-500 px-5 py-2 text-center text-white hover:bg-sky-600"
                >
                    View Details
                </Link>

        </div>
            

        </div>
    );
}

export default HotelCard;

// بخش نمایش ستاره ها با هوش مصنوعی نوشته شده است
// برای نمایش عکس ها از هوش مصنوعی استفاده شده است.