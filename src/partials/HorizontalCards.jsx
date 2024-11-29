import React from "react";
import { Link } from "react-router-dom";


const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full  overflow-y-auto  mt-3 text-zinc-300  ">
      <div className="cards   pb-7 w-full overflow-x-auto  overflow-y-hidden flex  gap-4 rounded-md">
        { data.length>0 ? data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className=" pb-2 rounded-lg overflow-y-auto min-w-[25%] h-[40vh]">
         <img
                className="w-full h-[30vh] rounded-md shadow-md object-cover"
                src={
                  d.backdrop_path || d.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        d.backdrop_path || d.profile_path
                      }`
                    : "https://as1.ftcdn.net/v2/jpg/02/77/74/42/1000_F_277744275_7wKvGP1vDtpKrdxVOYvq5JQv0meuME3J.jpg"
                }
                alt={d.name ||d.title || "Image"}
              />
            <div className="p-2">
              <h1 className="text-xl font-bold ">
                {d.title || d.original_title || d.name || d.original_name}
              </h1>
              <p className="text-white text-sm">
                {d.overview.slice(0, 40)}...{" "}
                <Link className="text-blue-400">more</Link>
              </p>
            </div>
          </Link>
        )):<h1>Nothing to show</h1>}
      </div>
    </div>
  );
};

export default HorizontalCards;
