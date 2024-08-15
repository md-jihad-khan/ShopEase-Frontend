import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="navbar sm:w-10/12 mx-auto ">
      <div className="flex-1">
        <Link to={"/"} className="font-bold text-3xl">
          Shop <span className="text-yellow-500">Ease</span>
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
          <button
            onClick={() => logOut()}
            className="btn rounded-3xl px-5 border-none bg-yellow-500 text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to={"/login"}
              className="btn rounded-3xl px-5 border-none bg-yellow-500 text-white"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
