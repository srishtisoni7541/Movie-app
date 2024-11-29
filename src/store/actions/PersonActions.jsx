import axios from "../../utils/axios";
import { loadperson, removeperson } from "../reducers/personSlice"; // Ensure correct path to personSlice

// Async action to fetch person details
export const asyncloadperson = (id) => async (dispatch) => {
  try {
    // Fetch all required person data using Promise.all for parallel API requests
    const [
      detailResponse,
      externalIDResponse,
      combinedCreditsResponse,
      tvCreditsResponse,
      movieCreditsResponse,
    ] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
      axios.get(`/person/${id}/tv_credits`),
      axios.get(`/person/${id}/movie_credits`),
    ]);

    // Consolidate data into one object
    const allData = {
      detail: detailResponse.data,
      externalID: externalIDResponse.data,
      combinedCredits: combinedCreditsResponse.data,
      tvCredits: tvCreditsResponse.data,
      movieCredits: movieCreditsResponse.data,
    };

    // Dispatch the data to the Redux store
    dispatch(loadperson(allData));
    console.log("Fetched person data:", allData);
  } catch (error) {
    // Log and alert errors for better debugging
    console.error("Error fetching person data:", error);
    const errorMessage =
      error.response?.data?.message || "An error occurred. Please try again.";
    alert(errorMessage);
  }
};

// Re-export removeperson for use in other parts of the application
export { removeperson };

export default asyncloadperson;
