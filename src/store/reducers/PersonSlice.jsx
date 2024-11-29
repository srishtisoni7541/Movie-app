import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
    info:null,
}

const PersonSlice = createSlice({
    name:'Person',
    initialState,
    reducers:{
        loadperson:(state,action)=>{
            state.info=action.payload;
        },
        removeperson:(state,action)=>{
            state.info=null;
        },
    }
})

export default PersonSlice.reducer;
export const {loadperson,removeperson}=PersonSlice.actions;