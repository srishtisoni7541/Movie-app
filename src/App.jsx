import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Loader from "./partials/Loader";
import Trending from "./components/Trending";
import Popular from "./partials/Popular";
import Movie from "./partials/Movie";
import Tv from "./partials/Tv";
import People from "./partials/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PeopleDetails from "./components/PeopleDetails";
import Trailer from './partials/Trailer';
import NotFound from "./partials/NotFound";


function App() {
  return (
    <div className="h-screen  w-full bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/l" element={<Loader />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>

        <Route path="/movie/details/:id/trailer" element={<Trailer/>} />

        </Route>

        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetails />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer/>} />

        </Route>

        <Route path="/person" element={<People />} >
        
        </Route>
        <Route path="/person/details/:id" element={<PeopleDetails />} />
        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </div>
  );
}

export default App;
