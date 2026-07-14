import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { get, put } from "../utils/httpClient";
function AdminReserves() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const loadBookings = async () => {
    if (!user) return;
    const bookings = await get(`/Bookings`);
    setBookings(bookings);
  };

  useEffect(() => {
    loadBookings();
  }, [user]);
    
    const handleConfirm = async(id) => {
        await put(`/Bookings/${id}/confirm`);
        loadBookings();
    }
      
    const handleCancel =async(id) => {
        await put(`/Bookings/${id}/cancel`);
        loadBookings();
    }
  return (
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mx-10 my-20">
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-[16px] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">
              نام کاربر
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              نام اتاق
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              نام هتل
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              شهر
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              تاریخ ورود
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              تاریخ خروج
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              هزینه
            </th>
            <th scope="col" class="px-3 py-3 font-medium">
              وضعیت رزرو
                      </th>
                      <th scope="col" class="px-6 py-3 font-medium">
              وضعیت زمانی رزرو
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr class="text-[14px] bg-neutral-primary border-b border-default">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {booking.user_name}
              </th>
              <td class="px-6 py-4">{booking.roomName}</td>
              <td class="px-6 py-4">{booking.hotel_name}</td>
                  <td class="px-6 py-4">{booking.city}</td>
                  <td class="px-6 py-4">{booking.checkIn.split("T")[0]}</td>
                  <td class="px-6 py-4">{booking.checkOut.split("T")[0]}</td>
                  <td class="px-6 py-4">{booking.total_price.split(".")[0]} تومان</td>
                  <td class="px-6 py-4">{booking.booking_status}</td>
                  <td class="px-6 py-4">{booking.time_status}</td>
              {booking.booking_status === "Pending" && (
                <>
                  <button onClick={() =>handleConfirm(booking.id)} className={`px-3 py-1 rounded-md mt-3 ml-2 bg-green-300 text-gray-500 `}>Confirm</button>
                  <button onClick={() =>handleCancel(booking.id)} className={`px-3 py-1 rounded-md mt-3 bg-red-300 text-gray-500 `}>Cancel</button>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReserves;
