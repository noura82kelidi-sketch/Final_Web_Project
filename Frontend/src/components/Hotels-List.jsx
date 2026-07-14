import HotelCard from "./Hotel-Card";

function HotelsList({ hotels }) {

    if (hotels.length === 0) {
        return (
            <div className="mt-10 text-center text-xl">
                No hotels found.
            </div>
        );
    }

    return (

        <div className="mx-auto mt-10 flex w-6xl flex-col gap-8">

            {hotels.map((hotel) => (

                <HotelCard
                    hotel={hotel}
                />

            ))}

        </div>

    );
}

export default HotelsList;