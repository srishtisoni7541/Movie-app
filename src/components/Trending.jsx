import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopNav from "../partials/TopNav";
import Dropdown from "../partials/Dropdown";
import axios from "../utils/axios";
import Cards from "../partials/Cards";
import Loader from "../partials/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title="SCSDB|Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      
      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prevPage) => prevPage + 1); // Increment page for next load
      } else {
        setHasMore(false); // No more data to load
      }

      console.log("Data loaded:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setTrending([]);
    setPage(1);
    setHasMore(true); // Reset to allow more data loading
    getTrending(); // Load data for the new filter
  };

  useEffect(() => {
    refreshHandler(); // Reload when category or duration changes
  }, [category, duration]);

  return trending && trending.length > 0 ? (
    <div className="px-10 py-4 w-screen h-screen overflow-auto">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 text-2xl font-semibold">
          <Link
            className="hover:text-[#6556CD] mr-2 text-xl"
            onClick={() => navigate(-1)}
          >
            <i className="ri-arrow-left-line"></i>
          </Link>
          Trending
        </h1>
        <div className="flex items-center justify-center w-[70%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore} // Controls when to stop loading more
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
