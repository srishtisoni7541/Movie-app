import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../partials/Loader";
import HorizontalCards from "../partials/HorizontalCards";
import asyncloadmovie, { removemovie } from "../store/actions/MovieActions";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  if (!info || !info.detail) return <Loader />;

  const { detail, watchProviders } = info;

  // Extract and filter unique watch providers
  const getUniqueProviders = (providerList) => {
    const unique = new Map();
    providerList.forEach((provider) => {
      if (!unique.has(provider.provider_id)) {
        unique.set(provider.provider_id, provider);
      }
    });
    return Array.from(unique.values());
  };

  const flatrateProviders = getUniqueProviders(
    Object.values(watchProviders || {}).flatMap(
      (provider) => provider.flatrate || []
    )
  );

  const rentProviders = getUniqueProviders(
    Object.values(watchProviders || {}).flatMap(
      (provider) => provider.rent || []
    )
  );

  const buyProviders = getUniqueProviders(
    Object.values(watchProviders || {}).flatMap(
      (provider) => provider.buy || []
    )
  );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${
          detail.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${detail.backdrop_path}`
            : "default-image-url"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className=" relative  h-screen text-zinc-200 w-full px-[10%] overflow-y-auto"
    >
      <nav className="w-full flex gap-10 p-2 h-[10vh] items-center">
        <Link
          className="hover:text-[#6556CD] mr-2 text-xl"
          onClick={() => navigate(-1)}
        >
          <i className="ri-arrow-left-line"></i>
        </Link>
        {detail.homepage && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={detail.homepage}
            className="hover:text-[#6556CD]"
          >
            <i className="ri-external-link-fill"></i>
          </a>
        )}
      </nav>

      <div className="flex gap-10">
        <img
          className="h-[45vh] w-[40vw] object-cover rounded-md"
          src={`https://image.tmdb.org/t/p/original/${detail.poster_path}`}
          alt={`${detail.title} poster`}
        />
        <div className="content  ml-10">
          <h1 className="text-4xl font-bold">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl text-zinc-400 font-bold">
              {" "}
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>
          <div className="mt-4 w-full flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <span className="w-[5vh] h-[5vh] rounded-full bg-yellow-600 flex items-center justify-center">
                {(info.detail.vote_average * 10).toFixed()}
                <sup>%</sup>
              </span>
              <h1 className="text-2xl w-[50px] leading-6 font-bold">
                User Score
              </h1>
              <h1>{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
              <h1>{info.detail.runtime}min</h1>
            </div>
            <h1 className="text-2xl italic font-bold">{info.detail.tagline}</h1>

            <div>
              <h1 className="text-3xl font-bold">Overview</h1>
              <p className="w-[70%]">{info.detail.overview}</p>
              <button className="py-1 px-5 bg-[#6556CD] mt-4 rounded-md">
                <Link to={`${pathname}/trailer`}>
                  {" "}
                  <i className="ri-play-fill"></i> Watch Trailer
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[60%] flex-col mt-6 p-4  gap-4">
        <div className="flex  gap-3">
          <h1 className="text-white">Available on plateform</h1>
          {flatrateProviders.map((provider) => (
            <img
              key={provider.provider_id}
              src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
              alt={provider.provider_name}
              className="w-12 h-12"
            />
          ))}
        </div>
        <div className="flex items-center   gap-7">
          <h1 className="text-white">Available on rent</h1>
          <div className="flex items-center gap-2">
            {rentProviders.map((provider) => (
              <img
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-12 h-12"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-7">
          <h1 className="text-white">Available to buy</h1>
          <div className="flex gap-2">
            {buyProviders.map((provider) => (
              <img
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-12 h-12"
              />
            ))}
          </div>
        </div>
      </div>

      {/* recommendations and similar stuff */}
      <hr  className="mt-2" />
      <div className="w-full overflow-y-hidden h-[45vh] mt-2 p-4">
        <h1 className="text-3xl font-bold">Recommendations & Similar Stuff</h1>
        <HorizontalCards
          data={info.recommendations ? info.recommendations : info.similar}
          className="overflow-x-auto"
        />
      
      </div>
      <Outlet/>
    </div>
  );
};

export default MovieDetails;
