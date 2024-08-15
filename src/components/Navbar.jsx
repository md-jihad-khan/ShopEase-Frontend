import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar sm:w-10/12 mx-auto ">
      <div className="flex-1">
        <Link to={"/"} className="font-bold text-3xl">
          Shop <span className="text-yellow-500">Ease</span>
        </Link>
      </div>
      <div className="flex-none">
        <button className="btn  bg-yellow-500 text-white font-bold">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
