import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data,title }) => {
  return (
    <div className="  w-full flex items-center justify-center  gap-7 flex-wrap">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`}
          className=" relative shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[40vh] mt-4 rounded-md "
          key={i}
        >
          <img
            className="h-[35vh] w-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.profile_path || c.poster_path
            }`}
            alt=""
          />
          <h1 className="text-zinc-400 font-semibold text-2xl pt-1 pl-2 pb-2">
            {" "}
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
             <div className="text-white absolute right-[-5%] bottom-[20%] h-[5vh] w-[5vh] rounded-full bg-yellow-500 flex justify-center items-center">
             {(c.vote_average * 10).toFixed()} <sup>%</sup>
           </div>
          ) }
         
        </Link>
      ))}
    </div>
  );
};

export default Cards;
