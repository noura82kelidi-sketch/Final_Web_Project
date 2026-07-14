import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { post } from "../utils/httpClient";
import { useNavigate } from "react-router-dom";
function Booking() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const arrival = searchParams.get("arrival") || "";
  const departure = searchParams.get("departure") || "";
  const user_id = searchParams.get("user_id");

  const room = state?.room;
  const diffDays = Math.floor(
    (new Date(departure) - new Date(arrival)) / (1000 * 60 * 60 * 24)
  );
  const price = Number(room.price.replaceAll(",", ""));
  const finalPrice = diffDays * price;
  const roomId = room.id;
  const status = "Pending";
  const handleUpdate = async () => {
    const booking= await post(`/Bookings`, {
      user_id,
      roomId,
      arrival,
      departure,
      finalPrice,
      status
    });
    alert("Room Reserved");
    navigate("/Hotels");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    if (result) {
      navigate("/Hotels");
    }
  };

  return (
    <>
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mx-15 my-20">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-[18px] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">
                نوع اتاق
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                ظرفیت
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
            </tr>
          </thead>
          <tbody>
            <tr class="text-[14px] bg-neutral-primary border-b border-default">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {room?.roomName}
              </th>
              <td class="px-6 py-4">{room?.capacity} نفر</td>
              <td class="px-6 py-4">{arrival}</td>
              <td class="px-6 py-4">{departure}</td>
              <td class="px-6 py-4">{finalPrice} تومان</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row-reverse justify-evenly mt-30">
        <button
          onClick={handleUpdate}
          className="bg-green-700 text-white px-3 py-1 rounded-md"
        >
          نهایی کردن رزرو
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-3 py-1 rounded-md"
        >
          لغو
        </button>
      </div>
    </>
  );
}

export default Booking;
