import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './Cards';
import Loader from './Loader';
import Dropdown from './Dropdown';

const Tv = () => {
   // Set page title
   useEffect(() => {
    document.title = "SCSDB | Tv Shows";
  }, []);
  
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today"); // Default category is 'now_playing'
  const [page, setPage] = useState(1);
  const [Tv, setTv] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Fetch movie data
  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]); // Append new results
        setPage((prevPage) => prevPage + 1); // Increment page for the next load
      } else {
        setHasMore(false); // No more data to load
      }

      console.log("Data loaded:", data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  // Refresh data when category changes
  const refreshHandler = () => {
    setTv([]); // Clear existing data
    setPage(1); // Reset page to 1
    setHasMore(true); // Reset 'hasMore' to true
    getTv(); // Fetch new data based on the updated category
  };

  // Effect for handling category changes
  useEffect(() => {
    refreshHandler(); // Trigger data fetch when category changes
  }, [category]);

  return Tv && Tv.length > 0 ? (
    <div className="px-10 py-4 w-screen h-screen overflow-auto">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-zinc-400 text-2xl font-semibold">
          <Link
            className="hover:text-[#6556CD] mr-2 text-xl"
            onClick={() => navigate(-1)}
          >
            <i className="ri-arrow-left-line"></i>
          </Link>
          Tv <small className="text-xs ml-2 text-zinc-500">({category})</small>
        </h1>
        <div className="flex items-center justify-center w-[70%]">
          <TopNav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)} // Update category state
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={Tv.length}
        next={getTv}
        hasMore={hasMore} // Controls when to stop loading more
        loader={<h1 className="text-white">Loading...</h1>}
      >
        <Cards data={Tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Tv
