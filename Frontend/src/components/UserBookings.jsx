import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { get ,del} from "../utils/httpClient";
function UserBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    if (!user) return;
    const bookings = await get(`/Bookings/${user.id}`);
    setBookings(bookings);
  };

  useEffect(() => {
    loadBookings();
  }, [user]);

  const handleDelete = async (booking_id) => {
    await del(`/Bookings/${booking_id}`);
    loadBookings();
  };
  return (
    <div className="flex flex-col w-full">
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mx-15 my-20">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-[18px] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">
                نام هتل
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                نام اتاق
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                تاریخ ورود
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                تاریخ خروج
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                قیمت نهایی
              </th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr class="text-[14px] bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {booking.hotel_name}
                </th>
                <td class="px-6 py-4">{booking.roomName}</td>
                <td class="px-6 py-4">{booking.checkIn.split("T")[0]}</td>
                <td class="px-6 py-4">{booking.checkOut.split("T")[0]}</td>
                <td class="px-6 py-4">
                  {booking.total_price.split(".")[0]} تومان
                </td>
                <td>{booking.status}</td>
                <button
                  disabled={booking.status !== "Upcoming"}
                  onClick={() => handleDelete(booking.id)}
                  className={`px-3 py-1 rounded-md mt-3 ${
                    booking.status === "Upcoming"
                      ? "bg-red-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  لغو رزرو
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserBookings;
