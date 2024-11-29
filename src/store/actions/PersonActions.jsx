export { removeperson } from '../reducers/personSlice';
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    // Fetching person details
    const [detail,externalID,combinedCredits,tvCredits,movieCredits] = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
      axios.get(`/person/${id}/tv_credits`),
      axios.get(`/person/${id}/movie_credits`),
    ]);

   


    // Consolidate all data
    const allData = {
      detail: detail.data,
      externalID: externalID.data,
      combinedCredits:combinedCredits.data,
      tvCredits:tvCredits.data,
      movieCredits:movieCredits.data,

    };

    // Dispatch the data to the Redux store
    dispatch(loadperson(allData));
    console.log(allData);
  } catch (error) {
    console.error('Error fetching person data:', error);
    alert('Error fetching person details. Please try again later.');
  }
};

export default asyncloadperson;
