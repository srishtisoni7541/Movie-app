export { removemovie } from '../reducers/MovieSlice';
import axios from "../../utils/axios";
import { loadmovie } from "../reducers/MovieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    // Fetching movie details
    const [detail, externalID, recommendations, similar, videos, watchProviders] = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`),
    ]);

    // Filter out duplicates in recommendations and similar movies
    const uniqueRecommendations = recommendations.data.results.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    const uniqueSimilar = similar.data.results.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

    // Extract the first trailer (if available)
    const trailer = videos.data.results.find((video) => video.type === "Trailer");

    // Consolidate all data
    const allData = {
      detail: detail.data,
      externalID: externalID.data,
      recommendations: uniqueRecommendations,
      similar: uniqueSimilar,
      videos: trailer,
      watchProviders: watchProviders.data.results,
    };

    // Dispatch the data to the Redux store
    dispatch(loadmovie(allData));
    console.log(allData);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    alert('Error fetching movie details. Please try again later.');
  }
};

export default asyncloadmovie;
