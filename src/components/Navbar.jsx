import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="bg-base-100 fixed backdrop-blur-md container  py-4 px-2 ">
      <div>
        <div className="flex justify-between w-full  ">
          <div className="">
            <Link to="/" className="font-bold text-2xl md:text-3xl">
              Shop <span className="text-yellow-500">Ease</span>
            </Link>
          </div>
          <div>
            {user ? (
              <button
                onClick={() => logOut()}
                className="btn rounded-full px-4 py-1 md:px-5 md:py-2 border-none bg-yellow-500 text-white text-sm md:text-base"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="btn rounded-full px-4 py-1 md:px-5 md:py-2 border-none bg-yellow-500 text-white text-sm md:text-base"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

{
  /* <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-5 w-5 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
      </svg>
    </button>
  </div>
</div> */
}
