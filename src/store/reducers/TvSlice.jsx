import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
    info:null,
}

const TvSlice = createSlice({
    name:'Tv',
    initialState,
    reducers:{
        loadTv:(state,action)=>{
            state.info=action.payload;
        },
        removetv:(state,action)=>{
            state.info=null;
        },
    }
})

export default TvSlice.reducer;
export const {loadTv,removetv}=TvSlice.actions;