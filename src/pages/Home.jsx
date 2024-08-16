import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  const pages = [...Array(totalPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `${
        import.meta.env.VITE_SERVER
      }/products?search=${search}&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [search, currentPage]);

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

      <div className="pagination">
        <div className="flex justify-center mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-yellow-500 hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="mx-1">previous</span>
            </div>
          </button>
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-yellow-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-yellow-500 hover:text-white`}
            >
              {btnNum}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-yellow-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
