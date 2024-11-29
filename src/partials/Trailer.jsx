import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideos = useSelector((state) => state[category].info.videos);
  console.log(ytVideos);
  return (
    <div className=" p-10 h-full w-screen absolute z-[100] bg-[rgb(0,0,0,.9)] flex items-center justify-center top-0 left-0">
      <Link
        className=" left-[86%] top-[5%] absolute hover:text-[#6556CD] mr-2 text-xl"
        onClick={() => navigate(-1)}
      >
        <i className="ri-close-line"></i>
      </Link>
      {ytVideos ? (
        <ReactPlayer
          controls
          height={600}
          width={1080}
          url={`https://www.youtube.com/watch?v=${ytVideos.key}`}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
}; 

export default Trailer;
