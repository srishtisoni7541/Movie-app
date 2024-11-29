import React, { useEffect, useState } from "react";

import axios from "../utils/axios";
import SideNav from "../partials/SideNav";
import TopNav from "../partials/TopNav";
import Header from "../partials/Header";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";
import Loader from "../partials/Loader";


const Home = () => {
  document.title = "Movie App | Home Page";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending,setTrending]=useState(null);
  const [category,setCategory]=useState('all');
  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomWallpaper =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomWallpaper);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results)
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);
  console.log(trending)
  return wallpaper && trending ? (
    <>
      <div className="sidebar h-full w-[20%] overflow-auto  overflow-x-hidden ">
        <SideNav />
      </div>
      <div className="sidebar h-full w-[80%] ">
        <TopNav />
        <Header  data={wallpaper} />
        <div className="flex text-white items-center justify-between p-2">
        <h1 className="text-2xl  font-semibold">Trending!</h1>
        <Dropdown func={(e)=>setCategory(e.target.value)} title="filter" options={["tv","movie","all"]} />
      </div>
        <HorizontalCards data={trending}/>
      </div>
    </>
  ) : (
   <Loader/>
  )
};

export default Home;
