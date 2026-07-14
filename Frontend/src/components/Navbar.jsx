import BlueLogo from "../assets/Blue.png";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

function Navbar({ openLogin }) {
  const { user } = useContext(AuthContext);
  return (
    <nav className="bg-neutral-primary shadow-md">
      <div className="flex flex-wrap items-center justify-between w-6xl mx-auto p-4">
        <div className="flex items-center space-x-3">
          <img src={BlueLogo} className="size-16" alt="Logo" />

          <span className="self-center text-2xl text-gray-300">
            <span className="font-semibold text-sky-800">H</span>otel
            <span className="font-semibold ml-2 text-sky-800">R</span>eservation
          </span>
        </div>

        {user ? (
          user.role ? (
            <Link to={`/UserProfile`}
            ><i className="fa-regular fa-circle-user text-[30px] text-gray-400  hover:text-sky-700"></i></Link>

          ) : (
            <Link to={`/AdminProfile`}
            ><i className="fa-regular fa-circle-user text-[30px] text-gray-400  hover:text-sky-700"></i></Link>
          )
        ) : (
          <button
            onClick={openLogin}
            className="text-sky-500 bg-neutral-primary border border-sky-500 hover:bg-sky-500 hover:text-white font-medium text-sm px-3 py-2 rounded-md"
          >
            Login / Sign up
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
