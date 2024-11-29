import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Dropdown from "./Dropdown";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./Cards";

const Popular = () => {
    document.title="SCSDB|Popular";
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie"); // Default category is 'movie'
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch popular data
  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1); // Increment page for the next load
      } else {
        setHasMore(false); // No more data to load
      }

      console.log("Data loaded:", data);
    } catch (error) {
      console.error("Error fetching popular data:", error);
    }
  };

  // Refresh data when category changes
  const refreshHandler = () => {
    setPopular([]); // Clear previous data
    setPage(1); // Reset to the first page
    setHasMore(true); // Allow fetching more data
    getPopular(); // Fetch data for the new category
  };

  useEffect(() => {
    refreshHandler(); // Fetch data whenever the category changes
  }, [category]);

  return popular && popular.length > 0 ? (
    <div className="px-10 py-4 w-screen h-screen overflow-auto">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 text-2xl font-semibold">
          <Link
            className="hover:text-[#6556CD] mr-2 text-xl"
            onClick={() => navigate(-1)}
          >
            <i className="ri-arrow-left-line"></i>
          </Link>
          Popular
        </h1>
        <div className="flex items-center justify-center w-[70%]">
          <TopNav />
          {/* Updated prop name to 'onChange' */}
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setCategory(e.target.value)} // Update category state
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore} // Controls when to stop loading more
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;
