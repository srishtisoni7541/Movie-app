import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ data }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[50vh] gap-2 flex items-start p-12 justify-end flex-col text-white"
    >
      <h1 className=' w-[50%] font-black text-4xl'>{data.name || data.title ||data.original_name || data.original_title}</h1>
      <p className='text-white w-[50%]'>{data.overview.slice(0,200)}... <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link></p>
      <p className='mt-4'>
      <i className="text-pink-400 ri-megaphone-fill"></i> {data.release_date || "No Information!"}
      <i className="text-pink-400  ml-5  ri-movie-2-fill"></i>{data.media_type}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='p-2  rounded-lg bg-[#6556CD]'>Watch Trailer</Link>
    </div>
  );
};

export default Header;
