import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import asyncloadperson, { removeperson } from "../store/actions/PersonActions";
import Loader from "../partials/Loader";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";

const PeopleDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie");
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
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
  return info ? (
    <div className="flex flex-col px-[8%] p-4 min-h-screen  overflow-y-auto  w-screen">
      <nav className="w-full flex gap-10 p-2 items-center">
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

      <div className="w-full mt-4  gap-10 flex ">
        {/* parrt 2 left poster and details */}
        <div className="w-[23%] ">
          <img
            className="h-[45vh] w-[40vw] object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/original/${detail.profile_path}`}
            alt={`${detail.title} poster`}
          />

          <hr className="mt-4" />
          {/* part3 social media links*/}
          <div className="w-[20%] flex gap-2 text-2xl mt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalID.wikidata_id}`}
              className="hover:text-[#6556CD]"
            >
              <i className="ri-external-link-fill"></i>
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/${info.externalID.facebook_id}`}
              className="hover:text-[#6556CD]"
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.instagram.com/${info.externalID.instagram_id}`}
              className="hover:text-[#6556CD]"
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.twitter.com/${info.externalID.twitter_id}`}
              className="hover:text-[#6556CD]"
            >
              <i className="ri-twitter-fill"></i>
            </a>
          </div>
          {/* personal information */}

          <h1 className="font-semibold text-2xl">Personal info</h1>
          <h1 className="text-xl font-semibold">Known for</h1>
          <h1>{info.detail.known_for_department}</h1>

          <h1 className="text-xl font-semibold  mt-3">Gender</h1>
          <h1>{info.detail.gender === 1 ? "female" : "male"}</h1>
          <h1 className="text-xl font-semibold  mt-3">Birthday</h1>
          <h1>{info.detail.birthday}</h1>

          <h1 className="text-xl font-semibold   mt-2">Birthplace</h1>
          <h1 className="pb-2">{info.detail.place_of_birth}</h1>
        </div>
        <div className="w-[80%]">
          <h1 className="font-bold text-5xl">{info.detail.name}</h1>

          <h1 className="text-xl font-semibold  mt-3">Biography</h1>
          <p className="mt-3">{info.detail.biography}</p>
          <h1 className="font-semibold text-lg mt-2">Famous for</h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="flex justify-between w-full">
            <h1 className="font-semibold text-lg mt-2">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="  list-disc w-full h-[50vh] mt-5 p-5  text-zinc-300 shadow-2xl overflow-y-auto overflow-x-hidden">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i}>
                <Link to={`/${category}/details/${c.id}`} className="flex flex-col items-start justify-start">
                  <span className=" ml-5 text-zinc-500 hover:text-white cusor-pointer duration-300">
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="text-zinc-500 hover:text-white ml-5 cusor-pointer duration-300">

                    
                    { c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default PeopleDetails;
