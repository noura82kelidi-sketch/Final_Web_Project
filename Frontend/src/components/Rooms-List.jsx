import RoomCard from "./Room-Card";

function RoomsList({ rooms ,arrival,departure }) {
    

    if (rooms.length === 0) {
        return (
            <div className="mt-10 text-center text-xl">
                No room found.
            </div>
        );
    }

    return (
        <div className="mx-auto mt-10 flex w-6xl flex-col gap-8">

                {rooms.map((room) => (

                    <RoomCard
                        room={room}
                        defaultArrival={arrival}
                        defaultDeparture={departure} />

                ))}

            </div>

    );
}

export default RoomsList;