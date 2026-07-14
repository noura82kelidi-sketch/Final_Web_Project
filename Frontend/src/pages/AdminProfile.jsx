import { useState } from "react";
import Profile from "../components/Profile";
import TotalNumber from "../components/TotalNumber";
import AdminHotels from "../components/AdminHotels";
import AdminRooms from "../components/AdminRooms";
import AdminReserves from "../components/AdminReserves";
function AdminProfile() {
  const [tab, setTab] = useState("Profile");
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex flex-col flex-wrap w-1/5 border-l-2 text-gray-200">
        <button
          onClick={() => setTab("Profile")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
        >
          پروفایل
        </button>
        <button
          onClick={() => setTab("totalNumber")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
        >
          تعداد کاربران، هتل ها، رزرو ها
        </button>
        <button
          onClick={() => setTab("Hotels")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
        >
           هتل ها
        </button>
        <button
          onClick={() => setTab("Rooms")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
              >
                  اتاق ها
              </button>
              <button
          onClick={() => setTab("Reserves")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
              >
                 رزرو
        </button>
      </div>
      {tab == "Profile" ? (
        <Profile />
      ) : tab == "totalNumber" ? (
        <TotalNumber />
      ) : tab == "Hotels" ? (
        <AdminHotels />
      ): tab == "Rooms" ? (
        <AdminRooms />
      ): (
        <AdminReserves />
      )}
    </div>
  );
}

export default AdminProfile;
