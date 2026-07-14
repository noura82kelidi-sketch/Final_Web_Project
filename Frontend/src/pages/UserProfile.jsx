import { useState } from "react";
import Profile from "../components/Profile";
import UserBookings from "../components/UserBookings";
import Favorites from "../components/Favorites";
function UserProfile() {
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
          onClick={() => setTab("Reserves")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
        >
          رزروها
        </button>
        <button
          onClick={() => setTab("Favorites")}
          className="w-6/7 rounded-lg text-gray-500  p-3 mt-2 mb-2 m-auto text-right hover:bg-gray-200 "
        >
          هتل های مورد علاقه
        </button>
      </div>
      {tab == "Profile" ? <Profile /> : tab == "Reserves" ? <UserBookings /> : <Favorites />}
    </div>
  );
}

export default UserProfile;
