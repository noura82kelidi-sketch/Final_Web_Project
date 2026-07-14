import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { put, del } from "../utils/httpClient";
import { useNavigate } from "react-router-dom";
function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const updatedUser = {
      name,
      phone,
    };

    const response = await put(`/Users/${user.id}`, updatedUser);

    setUser({
      ...user,
      name,
      phone,
    });

    alert("Profile updated successfully");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    const result = await del(`/Users/${user.id}`);
    if (result) {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col w-4/5 m-5 pt-15 pr-5 pl-5 border-dashed border-3 text-blue-200">
      <div className="flex flex-row-reverse w-1/2 m-auto mt-0 mb-5 p-2  shadow-lg rounded-xl">
        <i className="fa-regular fa-circle-user text-[50px] text-gray-200 ml-10"></i>
        <p className="m-auto ml-10 text-gray-600 text-xl ">{user.name}</p>
      </div>
      <div className="flex flex-col mt-10">
        <div className="flex flex-row-reverse justify-center w-full mt-8 p-2">
          <p className="mr-5 mt-2 text-gray-400">: Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-left p-2 mr-5 w-1/3 border text-blue-300 rounded-xl"
          ></input>
          <p className="mr-5 mt-2 text-gray-400">: Phone</p>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-left p-2 border text-blue-300 w-1/3 rounded-xl"
          />
        </div>
        <div className="flex flex-row-reverse justify-center w-full mt-8 p-2">
          <p className="mr-5 mt-2 text-gray-400">: Email</p>
          <input
            type="text"
            disabled
            value={user.email}
            className="text-left p-2 mr-5 w-1/3 border text-blue-300 rounded-xl"
          ></input>
        </div>
      </div>

      <div className="flex flex-row-reverse justify-evenly mt-30">
        <button
          onClick={handleUpdate}
          className="bg-green-700 text-white px-3 py-1 rounded-md"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-3 py-1 rounded-md"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
