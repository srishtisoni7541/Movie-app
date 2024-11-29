import { Link } from "react-router-dom";
import axios from "../utils/axios";
import React, { useEffect, useState } from "react";

const TopNav = () => {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);

  // Search data fetch karne ke liye function
  const getSearches = async () => {
    if (!query) return; // Agar query blank hai toh call na karein

    try {
      const response = await axios.get(`/search/multi?query=${query}`);
      setSearchData(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Debounce logic: API calls ke liye delay
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearches();
    }, 500); // 500ms delay after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Function to clear query and search results
  const clearSearch = () => {
    setQuery("");
    setSearchData(null); // Clear search results when query is cleared
  };

  return (
    <div className="relative w-full h-[8vh] py-6 flex items-center justify-start p-4 gap-2">
      <i className="text-zinc-300 text-2xl ri-search-2-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="p-2 text-xl w-[50%] outline-none rounded-lg bg-transparent text-white"
        type="text"
        placeholder="Search anything..."
      />
      {query.length > 0 && (
        <i
          onClick={clearSearch}
          className="text-zinc-300 text-2xl ri-close-line cursor-pointer"
        ></i>
      )}

      {/* Search Results Dropdown */}
      {query && searchData && searchData.results?.length > 0 && (
        <div className="absolute z-[99] w-[50%] max-h-[50vh] rounded-md bg-gray-100 overflow-auto top-[10vh] left-4 shadow-md">
          {searchData.results.map((item, index) => (
            <Link
              to={`/${item.media_type}/details/${item.id}`}
              key={index}
              className="p-2 flex items-center gap-4 hover:text-black text-zinc-500 font-semibold border-b border-zinc-200"
            >
              <img
                className="w-[8vh] h-[8vh] rounded-md shadow-md object-cover"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        item.backdrop_path || item.profile_path
                      }`
                    : "https://as1.ftcdn.net/v2/jpg/02/77/74/42/1000_F_277744275_7wKvGP1vDtpKrdxVOYvq5JQv0meuME3J.jpg"
                }
                alt={item.name || item.title || "Image"}
              />
              <span>{item.name || item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;
