export { removetv } from '../reducers/TvSlice';
import axios from "../../utils/axios";
import { loadTv } from "../reducers/TvSlice";


export const asyncloadTV = (id) => async (dispatch, getState) => {
  try {
    // Fetching tv details
    const [detail, externalID, recommendations, similar, videos, watchProviders] = await Promise.all([
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/external_ids`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`),
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
    dispatch(loadTv(allData));
    console.log(allData);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    alert('Error fetching movie details. Please try again later.');
  }
};

export default asyncloadTV;
