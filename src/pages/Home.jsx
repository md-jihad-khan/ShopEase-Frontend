import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER}/products?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [search]);

  return (
    <div className="container mx-auto">
      <div className="h-20 relative z-50 w-full">
        <Navbar></Navbar>
      </div>

      <form onSubmit={handleSearch} className="w-full md:w-1/2 mx-auto px-2">
        <label className="flex items-center border-r-0 pr-0">
          <input
            type="text"
            name="search"
            className="w-full input focus:outline-none border border-gray-300 rounded-full rounded-r-none"
            placeholder="Search"
          />
          <button
            type="submit"
            className="btn-square rounded-r-full px-10 bg-yellow-500 text-white"
          >
            <FaSearch />
          </button>
        </label>
      </form>

      {loading && (
        <div className="min-h-screen flex justify-center">
          <TbFidgetSpinner className="text-3xl text-yellow-500  animate-spin m-auto" />
        </div>
      )}

      <div className="container mx-auto p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
