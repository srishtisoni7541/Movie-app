import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="h-full w-[100%] border-r-2 border-zinc-300  p-10">
      <h1 className="text-white text-2xl">
        {" "}
        <i className=" text-[#6556CD] ri-tv-fill"></i> Shows
      </h1>
      <nav className="flex flex-col mt-6 mb-5 text-zinc-400 gap-2 text-xl">
        <h1 className="mb-4">New Feeds</h1>
        <Link
          to="/trending"
          className="hover:bg-[#6556CD] p-4 text-white rounded-lg  duration-300"
        >
          {" "}
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556CD] p-4 text-white rounded-lg  duration-300"
        >
          {" "}
          <i className="ri-bard-fill"></i> Popular
        </Link>
        <Link
          to="/movie
        "
          className="hover:bg-[#6556CD] p-4 text-white rounded-lg duration-300"
        >
          {" "}
          <i className="ri-movie-2-fill"></i> Movies
        </Link>
        <Link to='/tv' className="hover:bg-[#6556CD] p-4 text-white rounded-lg durartion-300">
          {" "}
          <i className="ri-tv-2-fill"></i> Tv Shows
        </Link>
        <Link to='/person' className="hover:bg-[#6556CD] p-4 text-white rounded-lg duration-300">
          {" "}
          <i className="ri-team-fill"></i> People
        </Link>
      </nav>
      <hr />
      <nav className="flex flex-col mt-4 mb-5 text-zinc-400 gap-1 text-xl">
        <h1 className="mb-4">Website's Info!</h1>
        <Link className="hover:bg-[#6556CD] p-4 text-white rounded-lg  duration-300">
          {" "}
          <i className="ri-information-2-fill"></i> About
        </Link>
        <Link className="hover:bg-[#6556CD] p-4 text-white rounded-lg  duration-300">
          {" "}
          <i className="ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
