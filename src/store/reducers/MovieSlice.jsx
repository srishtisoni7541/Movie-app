import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
    info:null,
}

const movieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        loadmovie:(state,action)=>{
            state.info=action.payload;
        },
        removemovie:(state,action)=>{
            state.info=null;
        },
    }
})

export default movieSlice.reducer;
export const {loadmovie,removemovie}=movieSlice.actions;